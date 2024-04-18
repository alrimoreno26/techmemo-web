import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {DialogService} from 'primeng/dynamicdialog';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {RippleModule} from "primeng/ripple";
import {DomainsRoutingModule} from "./domains-routing.module";
import {reducer} from "./store/domains.reducers";
import {DomainsEffects} from "./store/domains.effects";
import {DomainsService} from "./services/domains.service";
import {DomainsComponent} from "./domains.component";
import {DomainsModalComponent} from "./components/domains-modal/domains-modal.component";
import {BadgeModule} from "primeng/badge";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
      DomainsComponent,
      DomainsModalComponent
  ],
    imports: [
        CommonModule,
        DomainsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        InputSwitchModule,
        StoreModule.forFeature('domains', reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([DomainsEffects]),
        TooltipModule,
        InputMaskModule,
        PasswordModule,
        DataTableModule,
        RippleModule,
        BadgeModule,
        ConfirmDialogModule
    ],
  providers: [
      DomainsService, DialogService
  ]
})
export class DomainsModule {
}
