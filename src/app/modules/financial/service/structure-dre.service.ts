import {Injectable} from "@angular/core";
import {ClassifierDto, PaymentStructureTO} from "../../../core/models/financial";
import {EntityState, StoreComponentService} from "../../../standalone/data-table/store/store.component.service";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";
import {CommerceDto} from "../../../core/models/commerce";
import {HeadersTable, LazyLoadData} from "../../../standalone/data-table/models";
import {fromUserActions} from "../../security/user/store/user.actions";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {tapResponse} from "@ngrx/component-store";
import {HttpErrorResponse} from "@angular/common/http";
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
    responseAPI = [
        {
            "code": "10",
            "rootCode": "null",
            "name": "CAPITAL DE GIRO",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.1",
            "rootCode": "null",
            "name": "Ativo Circulante Cíclico",
            "value": 1252179870,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.2",
            "rootCode": "null",
            "name": "Passivo Circulante Cíclico",
            "value": 487701657,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.3",
            "rootCode": "null",
            "name": "Necessidade de Capital de Giro",
            "value": 764478213,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.4",
            "rootCode": "null",
            "name": "Saldo de Terouraria",
            "value": -292101605,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.5",
            "rootCode": "null",
            "name": "Relação Necessidade/Receita Op. Líquida",
            "value": -7650.294166947286,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "10.6",
            "rootCode": "null",
            "name": "Saldo em Tesouraria Sobre Vendas",
            "value": -5235.81480194891,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "11",
            "rootCode": "null",
            "name": "DEMAIS ÍNDICES",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "11.1",
            "rootCode": "null",
            "name": "Capital Circulante Líquido",
            "value": 472376608,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "11.2",
            "rootCode": "null",
            "name": "Dívida Líquida",
            "value": 466275809,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "11.3",
            "rootCode": "null",
            "name": "Dívida Líquida/EBITDA",
            "value": -1.797897988962385,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "6",
            "rootCode": "null",
            "name": "ÍNDICES DE LIQUIDEZ",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "6.1",
            "rootCode": "null",
            "name": "Liquidez Geral",
            "value": 1.3069,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "6.2",
            "rootCode": "null",
            "name": "Liquidez Corrente",
            "value": 1.5505001324021876,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "6.3",
            "rootCode": "null",
            "name": "Liquidez Seca",
            "value": 1.0422,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "6.4",
            "rootCode": "null",
            "name": "Solvência Geral",
            "value": 1.6518,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7",
            "rootCode": "null",
            "name": "ESTRUTURA DE CAPITAL",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.1",
            "rootCode": "null",
            "name": "Participação de Capital de Terceiros",
            "value": 552.5581,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.2",
            "rootCode": "null",
            "name": "Endividamento Geral",
            "value": 84.6757,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.3",
            "rootCode": "null",
            "name": "Endividamento Oneroso",
            "value": 246.2566,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.4",
            "rootCode": "null",
            "name": "Composição do Endividamento",
            "value": 76.3629,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.5",
            "rootCode": "null",
            "name": "Nível de Desconto de Duplicatas",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "7.6",
            "rootCode": "null",
            "name": "Imobilização do Patrimônio Líquido",
            "value": 190.56604280163023,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "8",
            "rootCode": "null",
            "name": "RENTABILIDADE",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "8.1",
            "rootCode": "null",
            "name": "Margem Bruta",
            "value": -4681.142835326014,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "8.2",
            "rootCode": "null",
            "name": "Margem Líquida",
            "value": 2613.452322398288,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "8.3",
            "rootCode": "null",
            "name": "Retorno Sobre Ativo",
            "value": -19.679407756384386,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "8.4",
            "rootCode": "null",
            "name": "Retorno Sobre PL",
            "value": -128.41957042824671,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9",
            "rootCode": "null",
            "name": "CICLO FINANCEIRO",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": false,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9.1",
            "rootCode": "null",
            "name": "Prazo Médio de Estoques",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9.2",
            "rootCode": "null",
            "name": "Prazo Médio de Recebimentos",
            "value": 51583.7625,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9.3",
            "rootCode": "null",
            "name": "Prazo Médio de Pagamentos",
            "value": 0,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9.4",
            "rootCode": "null",
            "name": "Ciclo Financeiro",
            "value": 51583.7625,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        },
        {
            "code": "9.5",
            "rootCode": "null",
            "name": "Ciclo do Ativo",
            "value": -0.005383706935626373,
            "percentVA": 0,
            "percentHA": 0,
            "sheet": true,
            "type": "INDEXES_AND_INDICATORS"
        }
    ]

    constructor(private services: StructureDreServices) {
        const defaultEntity: EntityState<any> =
            {entities: [], total: 0, dialog: false, loaded: false};
        super(services, defaultEntity);
    }

    buildTree() {
        this.columns = [];
        this.columnsSec = [];
        this.columnsIndexSec = [];
        let ext = '';

        const indexesAndIndicatorsList: any[] = [];
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const base = `${year}${month}${ext}`;
        const value = base + 'Value';
        const va = base + 'VA';
        const ha = base + 'HA';
        const trace = base + 'Trace';
        this.responseAPI?.forEach((p: any, i) => {
         if (i >= indexesAndIndicatorsList.length) {
                indexesAndIndicatorsList.push({
                    name: p.name, leaf: p.sheet, sheet: p.sheet, visualize: true,
                    prefix: p.prefix, suffix: p.suffix, position: p.position,
                    code: p.code, rootCode: p.rootCode, id: p.balanceFormatId, parent: p.balanceFormatParentId
                });
            }

            indexesAndIndicatorsList[i][value] = p.value;
            indexesAndIndicatorsList[i][va] = p.percentVA;
            indexesAndIndicatorsList[i][ha] = p.percentHA;
            indexesAndIndicatorsList[i][trace] = Math.random();
        });

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
