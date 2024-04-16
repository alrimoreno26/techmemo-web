import {Component, OnInit} from "@angular/core";
import {CommercesService} from "../../../../service/commerces.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PrintersService} from "../../../../service/printers.service";

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

    constructor(public service: PrintersService) {

    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            area: new FormControl<string>('KITCHEN', Validators.required),
            connectionByIp: new FormControl<boolean>(false, Validators.required),
            ip: new FormControl<string>(''),
            enable: new FormControl<boolean>(false),
        });
    }

    filterEmptyStringControls(formGroup: FormGroup): any{
        // Objeto para almacenar los valores de los controles no vacíos
        const filteredValues: { [key: string]: any } = {};

        // Iterar sobre los controles del FormGroup
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key];

            // Verifica si el valor del control no es una cadena vacía
            if (control.value !== '') {
                // Si el valor no está vacío, lo añade al objeto de salida
                filteredValues[key] = control.value;
            }
        });

        return filteredValues;
    }

    save() {
        if (this.form.valid) {
            const values = this.filterEmptyStringControls(this.form);
            this.service.create({data: values});
        }

    }

}
