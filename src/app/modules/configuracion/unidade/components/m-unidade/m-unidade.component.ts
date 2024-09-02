import {Component, OnInit} from "@angular/core";
import {
    BaseModalComponentDirective
} from "../../../../../standalone/data-table/directives/base.modal.component.directive";
import {UnidadeService} from "../../services/unidade.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    templateUrl: './m-unidade.component.html',
    styleUrls: ['./m-unidade.component.scss']
})
export class MUnidadeComponent extends BaseModalComponentDirective implements OnInit{

    categoryOptions = ['Sneakers', 'Apparel', 'Socks'];
    constructor(private unidadeService: UnidadeService, private dialogRegistryService: DialogRegistryService,) {
        super(unidadeService);
        this.dialogRegistryService.addDialog(this.ref);
    }
    ngOnInit(): void {
        const {data} = this.config;
        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            code: new FormControl<number>(data?.code, Validators.required),
        });
    }

    override save(): void {
        const value = this.form.value;

        !this.config.data ?
            this.service.create(value) :
            this.service.update({id: this.config.data.id, ...value});
    }
}
