import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/user.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';
import {DialogService} from 'primeng/dynamicdialog';
import {UserService} from './services/user.service';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {UserModalComponent} from './components/user-modal/user-modal.component';
import {InputMaskModule} from 'primeng/inputmask';
import {GeneratePasswordModalComponent} from './components/generate-password-modal/generate-password-modal.component';
import {PasswordModule} from 'primeng/password';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {RippleModule} from "primeng/ripple";
import {RoleService} from "../roles/services/role.service";
import {RoleEffects} from "../roles/store/role.effects";

@NgModule({
  declarations: [
    UserComponent,
    UserModalComponent,
    GeneratePasswordModalComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        InputSwitchModule,
        StoreModule.forFeature('user', reducer),
        StoreModule.forFeature('role', reducer),
        StoreDevtoolsModule.instrument({}),
        EffectsModule.forFeature([UserEffects,RoleEffects]),

        TooltipModule,
        InputMaskModule,
        PasswordModule,
        DataTableModule,
        RippleModule
    ],
  providers: [
    UserService, DialogService, RoleService
  ]
})
export class UserModule {
}
