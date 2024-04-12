import {Component} from "@angular/core";
import {StoreCategoryService} from "../../inventory/category/services/store.category.service";

@Component({
    selector: 'c-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.scss']
})
export class MarketComponent  {

    constructor(public storeCategoryService: StoreCategoryService) {
        this.storeCategoryService.loadAll({
            lazy: {
                pageNumber: 0,
                pageSize: 10,
                type: 'PARENT'
            }
        })

    }

}
