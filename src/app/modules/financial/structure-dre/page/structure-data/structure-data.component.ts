import {Component, DestroyRef, effect, inject, Input, ViewChildren} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {StructureDataService} from "../../../service/structure.data.service";
import {TreeNodeSelectEvent} from "primeng/tree";
import {typeAccount} from "../../utils";
import {AccountEquationStructureTO, StructNode} from "../../../../../core/models/bills";
import {calculationTypeAccountStructure} from "../../../../../core/enums/commerce";
import {BalanceStructureHttpServices} from "../../../../../core/services/balance.structure.http.services";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'p-structure-data',
    templateUrl: './structure-data.component.html',
    styleUrls: ['./structure-data.component.scss']
})
export class StructureDataComponent {
    @Input() id: string;
    @ViewChildren('contaDialog') confirmDialogs: any;
    files!: TreeNode[];
    selectedNode: any;

    accountName: any;
    accountType: any | null;
    rootAccount: boolean;
    private node: TreeNode<any>;

    menuItems!: MenuItem[];
    protected readonly window = window;
    private destroyRef = inject(DestroyRef);

    constructor(public service: StructureDataService, private balanceStructureHttpServices: BalanceStructureHttpServices) {
    }


    nodeSelect($event: TreeNodeSelectEvent): void {

        const {node} = $event;
        const {data} = node;
        this.node = node;
        const {accountsId, calculationType} = data as StructNode;
        if (calculationType === calculationTypeAccountStructure.EQUATIONS) {
            this.balanceStructureHttpServices.getFormulaByAccount(accountsId || '').pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(value => {
                    if (Array.isArray(value)) {
                        node.data.equations = value.map((item: any) => this.convertToAccountEquationStructureTO(item));
                        node.data.structureData = this.id;
                        this.selectedNode = {...node};
                    }
                });
        }
    }

    updateNode($event: any): void {
        console.log($event)
        console.log(this.node)
        // this.node.position = $event.position
        this.node.data = {...this.node.data, ...$event.data};
        console.log(this.node)
    }

    // Función para convertir el valor a la estructura deseada
    convertToAccountEquationStructureTO(input: any): AccountEquationStructureTO {
        return {
            accountStructureId: input.id,
            calculations: input.mathOperations.map((operation: any) => ({
                id: operation.id,
                constant: operation.constant,
                changeSignEndValue: operation.changeSignEndValue,
                operator: operation.operator,
                classifier: operation.classifier
            })),
            created: input.created,
            id: input.id,
            operator: input.operator
        };
    }

    protected readonly typeAccount = typeAccount;
}
