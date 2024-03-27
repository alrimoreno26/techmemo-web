import {SocketClientState, WebSocketServices} from "./injects/webSocket.services";
import {MessageService} from "primeng/api";
import {BlockUIModule} from "primeng/blockui";
import {CommonModule, registerLocaleData} from "@angular/common";
import {APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from "@angular/core";
import {tap, timer} from "rxjs";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import localePt from '@angular/common/locales/pt';
import {TablesService} from "./services/tables.service";
import {SpinnerInterceptor} from "./interceptors/spinner.interceptor";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {windowProvider, WindowToken} from "./util/windows";
import {SessionServices} from "./injects/session.services";
import {initializeAppFactory} from "./util/app.function";
import {TokenInterceptor} from "./interceptors/token.interceptor";

registerLocaleData(localePt, 'pt');

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        BlockUIModule
    ],
    exports: [
        SpinnerComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
        {provide: WindowToken, useFactory: windowProvider},
        {provide: APP_INITIALIZER, useFactory: initializeAppFactory, deps: [HttpClient, SessionServices], multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        MessageService,
        TablesService,
        WebSocketServices
    ]
})
export class CoreModule {
    constructor(ws: WebSocketServices) {
        // timer(2000).pipe(
        //     tap(() => {
        //         const state = ws.state.getValue();
        //         const tok = 'aaaa';
        //         if (tok === null && state !== SocketClientState.DISCONNECTED) {
        //             ws.socketDisconnect();
        //         } else if (state === SocketClientState.CONNECTED) {
        //             ws.socketDisconnect();
        //             ws.onConnection(tok);
        //         } else if (tok) {
        //             ws.onConnection(tok);
        //         }
        //     })
        // ).subscribe();
    }
}
