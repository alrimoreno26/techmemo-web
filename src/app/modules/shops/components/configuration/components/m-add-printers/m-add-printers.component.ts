import {Component, effect, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrintersService} from "../../../../service/printers.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogRegistryService} from "../../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-add-printers',
    templateUrl: './m-add-printers.component.html',
})
export class MAddPrintersComponent implements OnInit {

    form: FormGroup
    areaType: any[] = [
        {label: 'Cocina', value: 'KITCHEN'},
        {label: 'Caixa', value: 'POS'}
    ];

    constructor(private dialogRegistryService: DialogRegistryService, public service: PrintersService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

        effect(() => {
            if (!this.service.dialog$()) {
                this.dialogRegistryService.removeDialog(this.ref);
                this.ref.close();
            }
        });
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>(this.config.data?.name, Validators.required),
            area: new FormControl<string>(this.config.data?.area, Validators.required),
            connectionByIp: new FormControl<boolean>(this.config.data?.connectionByIp, Validators.required),
            ip: new FormControl<string>(this.config.data?.ip),
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
