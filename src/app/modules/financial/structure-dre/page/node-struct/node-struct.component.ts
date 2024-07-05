import {Component, DestroyRef, effect, EventEmitter, inject, Input, Output} from '@angular/core';
import {Message, TreeNode} from 'primeng/api';
import {FormControl, FormGroup} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Options} from "../../../../../core/models";
import {StructureDataService} from "../../../service/structure.data.service";
import {BalanceAccountType, calculationTypeAccountStructure} from "../../../../../core/enums/commerce";
import {CreateAccountStructureTO, operatorConditionalTO, StructNode} from "../../../../../core/models/bills";
import {typeAccount} from "../../utils";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {FinancialClasificationService} from "../../../service/financial-clasification.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'c-node-struct',
    templateUrl: './node-struct.component.html',
    styleUrls: ['./node-struct.component.scss']
})
export class NodeStructComponent {
    // @Input() set node(value: TreeNode) {
    //     if (value) {
    //         console.log(value)
    //         const {data} = value;
    //         this.nodeAll = value;
    //         this.data = data;
    //         this.buildForm(data);
    //     }
    // };

    @Output() onUpdateNode: EventEmitter<TreeNode> = new EventEmitter<TreeNode>()
    routeId: string = '';
    suggestions: any[] = [];

    messages: Message[] = [];
    data: StructNode;
    nodeAll: any;
    form: FormGroup;
    typeOptions: Options[] = [
        {name: 'balance.structure.labels.noCalculations', value: calculationTypeAccountStructure.NO_CALCULATIONS},
        {name: 'balance.structure.labels.sumOfAccounts', value: calculationTypeAccountStructure.SUM_OF_ALL_SUBACCOUNTS},
        {
            name: 'balance.structure.labels.mappersAccount',
            value: calculationTypeAccountStructure.SUM_OF_RELATED_ACCOUNTS
        },
        {name: 'balance.structure.labels.customFormula', value: calculationTypeAccountStructure.EQUATIONS}
    ];

    private destroyRef = inject(DestroyRef);


    constructor(private structureDataService: StructureDataService, private financeService: FinancialClasificationService, private route: ActivatedRoute) {
        this.financeService.autocompleteSearch({
            pageNumber: 0,
            pageSize: 50,
        })
        this.routeId = this.route.snapshot.paramMap.get('id') || '';

        this.route.paramMap.subscribe(params => {
            this.routeId = params.get('id') || '';
        });
        this.messages = [
            {severity: 'info', summary: 'A conta adicionada será adicionada como uma subconta da conta selecionada'},
        ];
        effect(()=>{
            const {data} = this.structureDataService.selectedNode$();
            this.nodeAll = this.structureDataService.selectedNode$();
            this.data = data;
            this.buildForm(data);
            console.log( this.structureDataService.selectedNode$())
        })

    }

    save(): void {
        const {value} = this.form;
        const {equations, formulaType, conditionalEquations, ...data} = value
        console.log(equations)
        console.log(formulaType)
        console.log(conditionalEquations)
        debugger
        this.structureDataService.updateNode({...this.data, ...value});
        // console.log(data)
        // this.onUpdateNode.emit(data);
    }

    private buildForm(data: StructNode): void {
        const {
            id, calculationType, baseForVA,
            prefix, suffix, visualize, equations,
            conditionalEquations,
            nullableIfNotHavePreviousYear
        } = data;
        this.form = new FormGroup<any>({
            id: new FormControl(id),
            prefix: new FormControl(prefix),
            suffix: new FormControl(suffix),
            classifierId: new FormControl(),
            visualize: new FormControl(visualize),
            baseForVA: new FormControl(baseForVA),
            equations: new FormControl(equations),
            calculationType: new FormControl(calculationType),
            conditionalEquations: new FormControl(conditionalEquations),
            nullableIfNotHavePreviousYear: new FormControl<boolean>(nullableIfNotHavePreviousYear)
        });
        this.form.get('calculationType')?.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(value => {
            switch (value) {
                case calculationTypeAccountStructure.NO_CALCULATIONS:
                case calculationTypeAccountStructure.SUM_OF_ALL_SUBACCOUNTS:
                case calculationTypeAccountStructure.SUM_OF_RELATED_ACCOUNTS:
                    this.form.patchValue({equations: null, conditionalEquations: null});
                    break;
                case calculationTypeAccountStructure.EQUATIONS:
                    this.form.patchValue({
                        equations: [{calculations: [null], operator: null}],
                        conditionalEquations: null
                    });
                    break;
                case calculationTypeAccountStructure.CONDITIONAL:
                    this.form.patchValue({
                        conditionalEquations: {
                            firstCondition: [{calculations: [null], operator: null}],
                            secondCondition: [{calculations: [null], operator: null}],
                            resultCaseCondition: [{calculations: [null], operator: null}],
                            anotherResultCaseCondition: [{calculations: [null], operator: null}],
                            operator: operatorConditionalTO.EQUAL
                        },
                        equations: null
                    });
                    break;
            }
        });
    }

    updateStatus($event: any, key: string): void {
        this.form.get(key)?.setErrors($event);
    }

    search(event: AutoCompleteCompleteEvent) {
        if (this.financeService.autocomplete$()) {
            this.suggestions = this.financeService.autocomplete$()?.map((item: any) => item) ?? [];
        }
    }

    searchClassifiers(event: { target: { value: string; } } | any) {
        this.financeService.autocompleteSearch({
            filter: event.target.value,
        });
    }

    addConta() {
        const accounts = [{
            calculationType: this.form.get('calculationType')?.value,
            classifierId: this.form.get('classifierId')?.value.id,
            parentAccountStructureId: !this.data.sheet ? this.data.accountsId : null,
            position: 0,
            sheet: !this.data.sheet,
        }];
        this.structureDataService.createAccounts(this.routeId, this.nodeAll, false, false, accounts);
    }

    protected readonly typeAccount = typeAccount;
}
