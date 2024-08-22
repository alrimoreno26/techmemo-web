import {Component, OnInit} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogRegistryService} from "../../../../../core/injects/dialog.registry.services";

@Component({
    selector: 'm-descriptions-',
    templateUrl: './m-descriptions.component.html'
})
export class MDescriptionsComponent implements OnInit {

    selectedDescription: any;

    constructor(public service: CaixaService,
                public ref: DynamicDialogRef,
                public config: DynamicDialogConfig, private dialogRegistryService: DialogRegistryService) {
        this.dialogRegistryService.addDialog(this.ref);
    }

    ngOnInit() {
        this.selectedDescription = this.config.data.product.description
    }
}
