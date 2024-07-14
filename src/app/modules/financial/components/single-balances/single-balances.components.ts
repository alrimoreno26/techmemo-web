import {Component, Input} from "@angular/core";
import {StructureDreService} from "../../service/structure-dre.service";

@Component({
    selector: 'c-single-balances',
    styleUrls: ['./single-balances.components.scss'],
    templateUrl: './single-balances.components.html',
})
export class SingleBalancesComponents {
    @Input() cnpj!: string;

    compareValues?: string;
    constructor(public service: StructureDreService) {
        // this.service.buildTree()
        console.log(this.service.columns)
        console.log(this.service.columnsIndex)
        console.log(this.service.columnsIndex)
        console.log(service.actPasDem)
    }

}
