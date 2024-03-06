import {NgModule, isDevMode, APP_INITIALIZER, Injector, LOCALE_ID} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import {DirectivesModule} from "./core/directives/directives.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {CoreModule} from "./core/core.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {appInitializerFactory, HttpTranslateLoader} from "./core/util/app.translation";
import {ToastModule} from "primeng/toast";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        DirectivesModule,
        CoreModule,
        TranslateModule.forRoot({
            defaultLanguage: 'pt',
            loader: {
                provide: TranslateLoader,
                useClass: HttpTranslateLoader,
                deps: [HttpClient]
            },
            extend: true
        }),
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [
        ConfirmationService,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [TranslateService, Injector], multi: true},
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
