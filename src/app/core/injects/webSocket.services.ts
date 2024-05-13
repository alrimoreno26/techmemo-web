import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Client, CompatClient, IMessage, Stomp} from '@stomp/stompjs';
import {BehaviorSubject, first, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {StompSubscription} from '@stomp/stompjs/esm6/stomp-subscription';
import {Store} from '@ngrx/store';
import {WsMessage} from '../models';
import {targetNotifyEnum} from "../enums/notify";
import {fromNotifyActions} from "../../layout/store/notify.actions";

declare const SockJS: any;

export enum SocketClientState {
    ATTEMPTING, CONNECTED, ERROR, DISCONNECTED
}

export enum NotificationEndpoints {
    SCALE = '/topic/scale',
    PRINT = '/topic/print',
}

export const JsonFormat = (msg: IMessage): WsMessage => {
    const result = JSON.parse(msg.body) as WsMessage;
    return result;
};

@Injectable({
    providedIn: 'root'
})
export class WebSocketServices {

    state: BehaviorSubject<SocketClientState> = new BehaviorSubject<SocketClientState>(SocketClientState.DISCONNECTED);
    private wsUnsubscribe: StompSubscription[];
    private client: CompatClient;

    constructor(private store: Store) {
    }

    onConnection(accessToken: string): void {
        if (this.state.value !== SocketClientState.CONNECTED) {
            const websocketUrl = environment.websocket;
            this.client = Stomp.over(new WebSocket(websocketUrl));
            this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
            this.client.connect(
                {},
                () => {

                    this.state.next(SocketClientState.CONNECTED);
                    this.subscriptionList();
                },
                () => {
                    this.state.next(SocketClientState.ERROR);
                });
        }
    }

    subscriptionList(): void {
        this.wsUnsubscribe = [
            this.client.subscribe(NotificationEndpoints.SCALE, (msg: any) => {
                    this.handleWeightScale(targetNotifyEnum.SCALE, JsonFormat(msg))
                }
            ),
            this.client.subscribe(NotificationEndpoints.PRINT, (msg: any) => {
                    this.handlePrint(targetNotifyEnum.SCALE, JsonFormat(msg))
                }
            ),
        ];
    }

    getConnectionState$(): Observable<Client> {
        return new Observable<Client>(observer => {
            if (this.state) {
                this.state
                    .pipe(filter(state => state === SocketClientState.CONNECTED))
                    .subscribe(() => observer.next(this.client));
            } else {
                observer.next();
            }
        });
    }

    socketDisconnect(): void {
        this.getConnectionState$().pipe(first()).subscribe((client: Client) => client.deactivate());
        this.state.next(SocketClientState.DISCONNECTED);
        this.wsUnsubscribe.forEach(ws => ws.unsubscribe());
    }

    private addNotification(target: targetNotifyEnum, message: any): void {
        this.store.dispatch(fromNotifyActions.weightScale({weight: message}))
    }

    private handleWeightScale(target: targetNotifyEnum, message: WsMessage): void {
        this.addNotification(target, message);
    }
    private handlePrint(target: targetNotifyEnum, message: WsMessage): void {
        this.store.dispatch(fromNotifyActions.sentToKitchen({sent: true}))
    }
}
