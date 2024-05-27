import {Injectable} from "@angular/core";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {StructureDreServices} from "../../../core/services/structure-dre.service";
import {TreeNode} from "primeng/api";
import {keys, orderBy, sumBy} from "lodash";

@Injectable({providedIn: 'platform'})
export class StructureDreService extends StoreComponentService<any> {

    override serverSide = true;
    override lazyLoadOnInit = false;
    override pageSize = 25;

    columns: HeadersTable[] = [];
    columnsSec: HeadersTable[] = [];
    columnsIndex: HeadersTable[] = [];
    columnsIndexSec: HeadersTable[] = [];

    indexesAndIndicators: TreeNode[] = [];
    responseAPI: any[] = []

    constructor(private services: StructureDreServices) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
        this.services.getAll().subscribe((data: any) => {
            console.log(data)
            this.setAll(data);
            this.buildTable(data, true);
        })
    }

    buildTable(balances: any[], notCompare: boolean = true, structure?: boolean) {
        this.columns = [];
        this.columnsSec = [];
        this.columnsIndexSec = [];
        const indexesAndIndicatorsList: any[] = [];
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

            if ((r == 0 || (partial && !project)) || !notCompare) {
                this.columns.push({header: 'AV', field: va, pipe: 'percent', width: 70});
            } else {
                this.columns.push({header: 'AV', field: va, pipe: 'percent', width: 70});
                this.columns.push({header: 'AH', field: ha, pipe: 'percent', width: 70});
            }

            b?.indexesAndIndicators?.forEach((p: any, i:number) => {
                if (r === 0) {
                    indexesAndIndicatorsList.push({
                        name: p.name, leaf: p.sheet, sheet: p.sheet, visualize: p.visualize,
                        prefix: p.prefix, suffix: p.suffix, position: p.position,
                        code: p.code, rootCode: p.rootCode, id: p.balanceFormatId, parent: p.balanceFormatParentId
                    });
                } else if (r !== 0 && i >= indexesAndIndicatorsList.length) {
                    indexesAndIndicatorsList.push({
                        name: p.name, leaf: p.sheet, sheet: p.sheet, visualize: true,
                        prefix: p.prefix, suffix: p.suffix, position: p.position,
                        code: p.code, rootCode: p.rootCode, id: p.balanceFormatId, parent: p.balanceFormatParentId
                    });
                }

                indexesAndIndicatorsList[i][value] = p.value;
                indexesAndIndicatorsList[i][va] = p.percentVA;
                indexesAndIndicatorsList[i][ha] = p.percentHA;
                indexesAndIndicatorsList[i][trace] = b.traceabilityId;
            });
        });
        structure ?
            this.newView(indexesAndIndicatorsList) :
            this.currentView(indexesAndIndicatorsList);

        this.columnsIndex = this.columns.filter(f => f.header !== 'AV' && f.header !== 'AH');

        if (partial && project) {
            this.columnsSec = [
                {header: '', colSpan: (this.columnsIndex.length - 1) * 3 - 4, field: '', width: 0, pipe: ''},
                // {header: 'methodK.balanceK.partial', colSpan: 2, field: '', width: 0, pipe: '', class: 'border-1'},
                {header: 'methodK.balanceK.projected', colSpan: 3, field: '', width: 0, pipe: '', class: 'border-1'}
            ];
            this.columnsIndexSec = [
                {header: '', colSpan: this.columnsIndex.length - 2, field: '', width: 0, pipe: ''},
                // {header: 'methodK.balanceK.partial', field: '', width: 0, pipe: ''},
                {header: 'methodK.balanceK.projected', field: '', width: 0, pipe: ''}
            ];
        } else if (partial) {
            this.columnsSec = [
                {header: '', colSpan: (this.columnsIndex.length - 1) * 3 - 1, field: '', width: 0, pipe: ''},
                // {header: 'methodK.balanceK.partial', colSpan: 2, field: '', width: 0, pipe: '', class: 'border-1'}
            ];
            this.columnsIndexSec = [
                {header: '', colSpan: this.columnsIndex.length - 1, field: '', width: 0, pipe: ''},
                // {header: 'methodK.balanceK.partial', field: '', width: 0, pipe: ''}
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
    }

    private currentView(indexesAndIndicatorsList: any[] = []): void {

        this.indexesAndIndicators = this.buildTreeNode(indexesAndIndicatorsList, indexesAndIndicatorsList.filter(f => f.code.length <= 2), 'index');
    }

    private newView(activesList: any[] = [], passiveList: any[] = [],
                    demonstrationsList: any[] = [], indexesAndIndicatorsList: any[] = []): void {

        indexesAndIndicatorsList = indexesAndIndicatorsList.filter(f => f.visualize);

        this.indexesAndIndicators = this.buildTreeNodeNew(indexesAndIndicatorsList, indexesAndIndicatorsList.filter(f => !f.parent), 'index', 0);
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
