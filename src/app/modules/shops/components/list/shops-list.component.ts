import {Component, effect, OnInit} from "@angular/core";
import {BaseComponentDirective} from "../../../../standalone/data-table/directives/base.component.directive";
import {TranslateService} from "@ngx-translate/core";
import {CommercesService} from "../../service/commerces.service";
import {MAddCommerceComponent} from "./components/m-add-commerce/m-add-commerce.component";

@Component({
    selector: 'c-shops-list',
    templateUrl: './shops-list.component.html',
    styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent extends BaseComponentDirective implements OnInit {

    collapseCompaniesListData: boolean = true;
    optionsTabsVisible: boolean = false;
    isMobile: boolean = false;
    displayCompaniesListData: boolean = false;

    override modalContent = MAddCommerceComponent;

    constructor(public commerceService: CommercesService,
                private translateService: TranslateService) {
        super();
        this.commerceService.loadAll({lazy: {pageNumber: 0, pageSize: 15}})

    }

    ngOnInit() {
        this.optionsTabsVisible = true;
    }

    openModalAddCommerce(event: any):void{
        if(event){
            this.commerceService.openModalAddOrEdit()
            this.dialogService.open(MAddCommerceComponent,{
                draggable: true,
                width:'25vw',
                height:'550px',
                resizable: false,
                closeOnEscape: true,
                closable: true,
                style:{ 'overflow': 'hidden' }
            });
        }
    }

    protected readonly event = event;
}
