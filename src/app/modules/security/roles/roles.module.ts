import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/role.reducers';
import {EffectsModule} from '@ngrx/effects';
import {RoleEffects} from './store/role.effects';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {RoleService} from './services/role.service';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {RoleModalComponent} from './components/role-modal/role-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {DataTableModule} from '../../../standalone/data-table/data-table.module';
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    RolesComponent,
    RoleModalComponent
  ],
    imports: [
        CommonModule,
        RolesRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        ButtonModule,
        DynamicDialogModule,
        InputTextModule,
        DropdownModule,
        StoreModule.forFeature('role', reducer),
        EffectsModule.forFeature([RoleEffects]),
        TableModule,
        TooltipModule,
        DataTableModule,
        RippleModule
    ],
  providers: [
    RoleService, DialogService
  ]
})
export class RolesModule {
}
