import {Component, Input} from "@angular/core";
import {StructureDreService} from "../../service/structure-dre.service";

@Component({
    selector: 'c-single-dre',
    styleUrls: ['./single-dre.components.scss'],
    templateUrl: './single-dre.components.html',
})
export class SingleDreComponents{
    @Input() cnpj!: string;

    compareValues?: string;
    constructor(public service: StructureDreService) {
        // this.service.buildTree()
        console.log(this.service.columns)
        console.log(service.indexesAndIndicators)
    }

}
