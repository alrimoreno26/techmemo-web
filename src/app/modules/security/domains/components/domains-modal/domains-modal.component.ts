import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {onlyDigits} from '../../../../../core/util';
import {cellPhone} from '../../../../../core/validators/cell.validator';
import {
    BaseModalComponentDirective
} from '../../../../../standalone/data-table/directives/base.modal.component.directive';
import {cpf} from "../../../../../core/validators/cpf.validator";
import {DomainsService} from "../../services/domains.service";
import {domainArray} from "../../../../../core/enums/role";

@Component({
    selector: 'm-domains-modal',
    templateUrl: './domains-modal.component.html',
    styleUrls: ['./domains-modal.component.scss']
})
export class DomainsModalComponent extends BaseModalComponentDirective implements OnInit {

    constructor(public domainsService: DomainsService) {
        super(domainsService);
    }

    ngOnInit(): void {
        const {data} = this.config;
        this.form = new FormGroup({
            description: new FormControl<string>(data?.description, Validators.required),
            type: new FormControl<number>(data?.type, Validators.required),
        });
    }

    override save(): void {
        const value = this.form.value;

        !this.config.data ?
            this.service.create(value) :
            this.service.update({id: this.config.data.id, ...value});
    }


    protected readonly domainArray = domainArray;
}
