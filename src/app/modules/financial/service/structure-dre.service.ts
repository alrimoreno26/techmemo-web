import {Injectable, signal, WritableSignal} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {StructureBalancesServices} from "../../../core/services/structure-dre.service";
import {TreeNode} from "primeng/api";
import {keys, orderBy, sumBy} from "lodash";
import {Observable} from "rxjs";
import {BalanceStructureHttpServices} from "../../../core/services/balance.structure.http.services";
import {AccountStructureTO} from "../../../core/models/bills";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";

@Injectable({providedIn: 'platform'})
export class StructureDreService extends StoreComponentService<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 25;

    accountList$: WritableSignal<AccountStructureTO[]> = signal([]);

    columns: HeadersTable[] = [];
    columnsSec: HeadersTable[] = [];
    columnsIndex: HeadersTable[] = [];
    columnsIndexSec: HeadersTable[] = [];

    actPasDem: TreeNode[] = [];

    seeBalance$: Observable<any> = this.select(state => state.seeBalance);

    constructor(private services: StructureBalancesServices, private classifiersHttpServices: FinancialClassifiersService,) {
        const defaultEntity: EntityState<any> & { seeBalance: boolean } =
            {entities: [], total: 0, dialog: false, loaded: false, seeBalance: false};
        super(services, defaultEntity);

        this.services.getBalances({startDate: '2024-01-01', endDate: '2024-12-31'}).subscribe((result: any) => {
            const {content, page} = result;
            this.setAll(content);
            this.patchState({total: page.totalElements});
        })
    }

    newBalance(params: any){
        this.services.generarBalance(params).subscribe(()=>{
            this.services.getBalances({startDate: '2024-01-01', endDate: '2024-12-31'}).subscribe((result: any) => {
                const {content, page} = result;
                this.setAll(content);
                this.patchState({total: page.totalElements});
            })
        })
    }

    getById(id: string) {
        this.classifiersHttpServices.findAllPaginate(
            {pageNumber: 0, pageSize: 5000}).subscribe((response: any) => {
            this.accountList$.set(response.content);
            this.services.getById(id).subscribe((data: any) => {
                if (data) {
                    const balance = [data]
                    this.buildTable(balance, true);
                }
            })
        })
    }

    changeState(){
        this.patchState({seeBalance: !this.state().seeBalance})
    }

    buildTable(balances: any[], notCompare: boolean = true, structure?: boolean) {
        this.columns = [];
        this.columnsSec = [];
        this.columnsIndexSec = [];
        const activesList: any[] = [];
        const passiveList: any[] = [];
        const demonstrationsList: any[] = [];
        let partial: boolean = false;
        let project: boolean = false;
        balances.forEach((b, r) => {

            const date = new Date(b.endDate + 'T00:00');
            const year = date.getFullYear();
            const month = date.getMonth();
            let ext = '';

            if (notCompare) {
                if (month <= 10) {
                    partial = true;
                    ext = 'Pa';
                } else if (partial && b.traceabilityId === null) {
                    project = true;
                    ext = 'Pj';
                }
            } else if (!notCompare) {
                ext = 'cmp' + r;
            }
            const base = `${year}${month}${ext}`;
            const value = base + 'Value';
            const va = base + 'VA';
            const ha = base + 'HA';
            const trace = base + 'Trace';
            this.columns.push({
                header: b.endDate,
                field: value,
                pipe: 'number',
                width: 140,
                source: b.source,
                traceabilityId: b.traceabilityId ?? undefined,
                related: b.relatedTraceabilities && b.relatedTraceabilities.length > 0 ? b.relatedTraceabilities : undefined
            });

            b.actives.forEach((p: any, i: number) => {
                if (r === 0) {
                    // @ts-ignore
                    activesList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: p.accountStructure.visualize,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                } else if (r !== 0 && i >= activesList.length) {
                    activesList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: true,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                }

                activesList[i][value] = p.value;
                activesList[i][va] = p.percentVA;
                activesList[i][ha] = p.percentHA;
                activesList[i][trace] = b.traceabilityId;
            });
            b.passives.forEach((p: any, i: number) => {
                if (r === 0) {
                    passiveList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: p.accountStructure.visualize,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                } else if (r !== 0 && i >= passiveList.length) {
                    passiveList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: true,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                }

                passiveList[i][value] = p.value;
                passiveList[i][va] = p.percentVA;
                passiveList[i][ha] = p.percentHA;
                passiveList[i][trace] = b.traceabilityId;
            });
            b?.demonstrations?.forEach((p: any, i: number) => {
                if (r === 0) {
                    demonstrationsList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: p.accountStructure.visualize,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                } else if (r !== 0 && i >= demonstrationsList.length) {
                    demonstrationsList.push({
                        name: p.accountStructure.classifier.name,
                        leaf: p.accountStructure.sheet,
                        sheet: p.accountStructure.sheet,
                        visualize: true,
                        prefix: p.accountStructure.prefix,
                        suffix: p.accountStructure.suffix,
                        position: p.accountStructure.position,
                        // @ts-ignore
                        code: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).code,
                        // @ts-ignore
                        rootCode: p.accountStructure.parentAccountStructureId ? this.accountList$().find((c: any) => c.id === p.accountStructure.parentAccountStructureId)?.code : null,
                        id: p.accountStructure.id,
                        // @ts-ignore
                        parent: this.accountList$().find((c: any) => c.id === p.accountStructure.classifier.id).visibleOnlyForStructures
                    });
                }

                demonstrationsList[i][value] = p.value;
                demonstrationsList[i][va] = p.percentVA;
                demonstrationsList[i][ha] = p.percentHA;
                demonstrationsList[i][trace] = b.traceabilityId;
            });
        });
        structure ?
            this.newView(activesList, passiveList, demonstrationsList) :
            this.currentView(activesList, passiveList, demonstrationsList);

        this.columnsIndex = this.columns.filter(f => f.header !== 'AV' && f.header !== 'AH');

        if (partial && project) {
            this.columnsSec = [
                {header: '', colSpan: (this.columnsIndex.length - 1) * 3 - 4, field: '', width: 0, pipe: ''},
                {header: 'methodK.balanceK.projected', colSpan: 3, field: '', width: 0, pipe: '', class: 'border-1'}
            ];
            this.columnsIndexSec = [
                {header: '', colSpan: this.columnsIndex.length - 2, field: '', width: 0, pipe: ''},
                {header: 'methodK.balanceK.projected', field: '', width: 0, pipe: ''}
            ];
        } else if (partial) {
            this.columnsSec = [
                {header: '', colSpan: (this.columnsIndex.length - 1) * 3 - 1, field: '', width: 0, pipe: ''},
            ];
            this.columnsIndexSec = [
                {header: '', colSpan: this.columnsIndex.length - 1, field: '', width: 0, pipe: ''},
            ];
        } else if (project) {
            this.columnsSec = [
                {header: '', colSpan: (this.columnsIndex.length - 1) * 3 - 1, field: '', width: 0, pipe: ''},
                {header: 'methodK.balanceK.projected', colSpan: 3, field: '', width: 0, pipe: '', class: 'border-1'}
            ];
            this.columnsIndexSec = [
                {header: '', colSpan: this.columnsIndex.length - 1, field: '', width: 0, pipe: ''},
                {header: 'methodK.balanceK.projected', field: '', width: 0, pipe: ''}
            ];
        }

        this.patchState({seeBalance: true})
    }

    private currentView(activesList: any[] = [], passiveList: any[] = [], demonstrationsList: any[] = []): void {

        const actives: TreeNode[] = this.buildTreeNode(activesList, activesList.filter(f => f.parent), 'active');
        const passives: TreeNode[] = this.buildTreeNode(passiveList, passiveList.filter(f => f.parent), 'passive');
        const demonstrations: TreeNode[] = this.buildTreeNode(demonstrationsList, demonstrationsList.filter(f => f.parent && f.code.split('.').length < 2), 'dre');
        this.actPasDem = [...actives, ...passives, ...demonstrations];
    }

    private newView(activesList: any[] = [], passiveList: any[] = [],
                    demonstrationsList: any[] = []): void {

        activesList = activesList.filter(f => f.visualize);
        passiveList = passiveList.filter(f => f.visualize);
        demonstrationsList = demonstrationsList.filter(f => f.visualize);

        const actives: TreeNode[] = this.buildTreeNodeNew(activesList, activesList.filter(f => !f.parent), 'active', 0);
        const passives: TreeNode[] = this.buildTreeNodeNew(passiveList, passiveList.filter(f => !f.parent), 'passive', 0);
        const demonstrations: TreeNode[] = this.buildTreeNodeNew(demonstrationsList, demonstrationsList.filter(f => !f.parent), 'dre', 0);
        this.actPasDem = [...actives, ...passives, ...demonstrations];
    }

    private buildTreeNodeNew(listRaw: any[] = [], base: any[] = [], color: string, lvl: number): TreeNode[] {
        return base.map(b => {
            const className = `${color}-${lvl}`;
            const child = orderBy(listRaw.filter(f => f.parent === b.id), 'position', 'asc');
            if (child.length === 0) {
                return {data: {...b, class: className, leaf: true}, leaf: true};
            }
            const children = this.buildTreeNodeNew(listRaw, child, color, lvl + 1);
            const hasSubChild = children.find(f => f.children?.length);
            const hasLeaf = children.find(f => f.leaf);
            const extraProps = this.sumOfChild(b, children);
            if (hasLeaf && hasSubChild) {
                children.map(m => {
                    const {data} = m;
                    data.keepColor = true;
                });
            }
            return {data: {...b, class: className, leaf: false, ...extraProps}, expanded: true, leaf: false, children};
        });
    }

    private buildTreeNode(listRaw: any[] = [], base: any[] = [], color: string): TreeNode[] {
        return base.map(b => {
            const pos = b.code.split('.').length;
            const className = `${color}-${pos - 1}`;
            const child = listRaw.filter(f => (f.code.startsWith(b.code + '.') && f.code.split('.').length === (pos + 1)));
            if (child.length === 0) {
                return {data: {...b, class: className, leaf: true}, leaf: true};
            }
            const children = this.buildTreeNode(listRaw, child, color);
            const extraProps = this.sumOfChild(b, children);
            return {data: {...b, class: className, leaf: false, ...extraProps}, expanded: true, leaf: false, children};
        });
    }

    private sumOfChild(row: any, children: TreeNode[]): object {
        const props: any = {};
        keys(row).filter(f => f.endsWith('Value')).forEach(m => {
            props[`${m}Total`] = sumBy(children, `data.${m}`)
        });
        return props;
    }
}
