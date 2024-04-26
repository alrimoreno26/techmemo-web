import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {buildURL} from "../../../../../core/util";
import {HttpClient} from "@angular/common/http";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-cpf-nota',
    templateUrl: './cpf-nota.components.html'
})
export class CpfNotaComponents implements OnInit {

    cpfNota = '';

    constructor(private dialogRegistryService: DialogRegistryService,private httpClient: HttpClient, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit(): void {
        this.cpfNota = this.config.data.clientDocument;
        console.log(this.config.data)
    }

    setCPF() {
        this.httpClient.patch<any>(`${buildURL('/v1/orders')}/${this.config.data.id}`, {clientDocument: this.cpfNota}).subscribe(res => {
            this.dialogRegistryService.removeDialog(this.ref);
            this.ref.close();
        });
    }
}
