import {Subject} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {DialogService} from "primeng/dynamicdialog";
import {DialogRegistryService} from "./dialog.registry.services";

@Injectable({
    providedIn: 'root'
})
export class InactivityService {
    private userActivity: Subject<any> = new Subject();
    private inactivityTimeout: any;
    private returnUrl: string = ''; // Almacena la URL de retorno
    private timerDuration = 10 * 60 * 1000;
    constructor(private router: Router, private dialogRegistryService: DialogRegistryService) {
    }

    setupInactivityTimer(): void {
        document.addEventListener('mousemove', () => this.userActivity.next(true));
        document.addEventListener('keydown', () => this.userActivity.next(true));

        this.storeReturnUrl();
        this.userActivity.subscribe(() => {
            clearTimeout(this.inactivityTimeout);
            this.startInactivityTimer();
        });

        this.startInactivityTimer();
    }

    startInactivityTimer(): void {
        if (this.returnUrl.includes('lockscreen') || this.returnUrl.includes('login') ) return;
        this.inactivityTimeout = setTimeout(() => {
            this.dialogRegistryService.closeAllDialogs()
            this.router.navigate(['/lockscreen'], {queryParams: {returnUrl: this.returnUrl}});
        }, this.timerDuration);
    }

    storeReturnUrl(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.returnUrl = event.url; // Almacena la URL actual cuando el usuario accede a la página
            }
        });
    }

    resetInactivityTimer(): void {
        clearTimeout(this.inactivityTimeout);
        this.startInactivityTimer();
    }

    getUserActivity(): Subject<any> {
        return this.userActivity;
    }
}
