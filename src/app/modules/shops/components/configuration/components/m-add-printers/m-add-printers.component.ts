import {Component, OnInit} from "@angular/core";
import {CommercesService} from "../../../../service/commerces.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'm-add-printers',
    templateUrl: './m-add-printers.component.html',
})
export class MAddPrintersComponent  implements OnInit{

    form: FormGroup
    areaType: any[] = [
        {label: 'Cocina', value: 'COCINA'},
        {label: 'Caixa', value: 'CAIXA'}
    ];
    constructor(public commercesService: CommercesService) {

    }
    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl<string>('', Validators.required),
            area: new FormControl<string>('', Validators.required),
            ip: new FormControl<boolean>(false, Validators.required),
            ipAddress: new FormControl<string>(''),
            enable: new FormControl<boolean>(false),
        });
    }

}
