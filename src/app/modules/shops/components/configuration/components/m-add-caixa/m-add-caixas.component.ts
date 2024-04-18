import {Component, effect, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CashRegisterService} from "../../../../service/cash-register.service";

@Component({
    selector: 'm-add-caixas',
    templateUrl: './m-add-caixas.component.html',
})
export class MAddCaixasComponent implements OnInit {

    form: FormGroup

    constructor(public service: CashRegisterService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

        effect(() => {
            if (!this.service.dialog$()) {
                this.ref.close();
            }
        });
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.config.data?.name, Validators.required),
            enable: new FormControl<boolean>(this.config.data?.enable),
        });
    }

    filterEmptyStringControls(formGroup: FormGroup): any {
        const filteredValues: { [key: string]: any } = {};
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key];
            if (control.value !== '') {
                filteredValues[key] = control.value;
            }
        });

        return filteredValues;
    }

    save() {
        if (this.form.valid) {
            const values = this.filterEmptyStringControls(this.form);
            !this.config.data ?
                this.service.create({data: values}) :
                this.service.update({data: {id: this.config.data.id, ...values}});
        }

    }

}
