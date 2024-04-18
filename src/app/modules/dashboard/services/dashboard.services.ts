import {Injectable, Signal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {CategoryServices} from "../../../core/services/category-services.service";
import {CategoryDto} from "../../../core/models";
import {ReportsService} from "../../../core/services/reports.service";
import {LazyLoadData, LazyResultData} from "../../../standalone/data-table/models";
import {StockProductReportTO} from "../../../core/models/products";
import {productType} from "../../../core/enums/product";
import {ReportsDTO} from "../../../core/models/reports";

@Injectable({providedIn: 'platform'})
export class StoreDashboardServices extends StoreComponentService<any> {

    override serverSide = false;
    stat$: Signal<any | null> = this.selectSignal(state => state.raw);

    constructor(private reportService: ReportsService) {
        const defaultEntity: EntityState<CategoryDto> & { raw?: ReportsDTO } =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(reportService, defaultEntity);
    }

    loadLowStock() {
        this.reportService.stockAlert({
            pageSize: 10,
            pageNumber: 0,
            type: productType.SIMPLE
        }).subscribe((response: LazyResultData<StockProductReportTO>) => {
            this.patchState({entities: response.content, total: response.totalElements})
        })
    }

    loadOrdersStats(params: any) {
        this.reportService.ordersStats(params).subscribe((response: ReportsDTO) => {
            this.patchState({raw: response})
        })
    }
}
