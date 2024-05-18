import {Component} from "@angular/core";
import {StructureDreService} from "../../service/structure-dre.service";

@Component({
    selector: 'c-single-dre',
    templateUrl: './single-dre.components.html',
})
export class SingleDreComponents{


    compareValues?: string;
    constructor(public service: StructureDreService) {
        this.service.buildTree()
    }

}
