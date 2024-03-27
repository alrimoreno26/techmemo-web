import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormResponsiveDirective} from './form-responsive.directive';
import {FocusDirective} from "./app-focus.directive";
import {DialogFooterDirective} from "./dialog-footer.directive";
import {DialogHeaderDirective} from "./dialog-header.directive";
import {FormFieldValidationDirective} from "./form-field-validation.directive";
import {ConfirmTranslateDirective} from "./confirm-translate.directive";
import {ToastTranslateDirective} from "./toast-translate.directive";
import {BaseComponentDirective} from "./base.component.directive";
import {BaseModalStoreComponentDirective} from "./base.modal.store.component.directive";


@NgModule({
    declarations: [
        BaseComponentDirective,
        BaseModalStoreComponentDirective,
        FormResponsiveDirective,
        FormFieldValidationDirective,
        FocusDirective,
        DialogFooterDirective,
        DialogHeaderDirective,
        ConfirmTranslateDirective,
        ToastTranslateDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormResponsiveDirective,
        FormFieldValidationDirective,
        FocusDirective,
        DialogFooterDirective,
        DialogHeaderDirective,
        ConfirmTranslateDirective,
        ToastTranslateDirective,
    ]
})
export class DirectivesModule {
}
