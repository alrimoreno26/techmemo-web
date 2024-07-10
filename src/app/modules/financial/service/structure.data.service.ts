import {Injectable, signal, WritableSignal} from '@angular/core';
import {forkJoin, map, Observable} from 'rxjs';
import {TreeNode} from 'primeng/api';
import {groupBy, orderBy} from 'lodash';
import {BalanceStructureHttpServices} from "../../../core/services/balance.structure.http.services";
import {
    AccountStructureTO,
    BalanceFormatAccount, CreateAccountStructureTO, StructNode,
} from "../../../core/models/bills";
import {buildTreeNodes} from "../structure-dre/utils";
import {FinancialClassifiersService} from "../../../core/services/financial-classifiers.service";
import {BalanceAccountType, calculationTypeAccountStructure} from "../../../core/enums/commerce";
import {find} from 'lodash';
import {removeNullProperties} from "../../../core/util";

@Injectable({providedIn: 'platform'})
export class StructureDataService {
    nodesList$: WritableSignal<TreeNode[]> = signal([]);
    accountList$: WritableSignal<AccountStructureTO[]> = signal([]);
    selectedNode$: WritableSignal<TreeNode> = signal({});
    selectedEquations$: WritableSignal<any> = signal({});
    private formatRaw$: WritableSignal<BalanceFormatAccount[]> = signal([]);

    private base: ({
        expanded: boolean;
        data: {
            organizationId: string;
            parentAccountId: null;
            created: string;
            name: string;
            sheet: boolean;
            id: string;
            type: string
        };
        children: any[];
        label: string;
        leaf: boolean;
        type: string;
        key: string
    })[] = [
        {
            "key": "64c26a1d11561a242cfeea98",
            "label": "ATIVO",
            "data": {
                "created": "2023-11-30T23:36:18.624",
                "id": "64c26a1d11561a242cfeea98",
                "name": "ATIVO",
                "organizationId": "00000000000",
                "parentAccountId": null,
                "sheet": false,
                "type": "ACTIVE"
            },
            "leaf": true,
            "expanded": false,
            "type": "root",
            "children": []
        },
        {
            "key": "64c26a1d11561a242cfeea99",
            "label": "PASSIVE",
            "data": {
                "created": "2023-11-30T23:36:18.624",
                "id": "64c26a1d11561a242cfeea99",
                "name": "PASSIVE",
                "organizationId": "00000000000",
                "parentAccountId": null,
                "sheet": false,
                "type": "PASSIVE"
            },
            "leaf": true,
            "expanded": false,
            "type": "root",
            "children": []
        },
        {
            "key": "64c26a1d11561a242cfeea97",
            "label": "DRE",
            "data": {
                "created": "2023-11-30T23:36:18.624",
                "id": "64c26a1d11561a242cfeea97",
                "name": "DRE",
                "organizationId": "00000000000",
                "parentAccountId": null,
                "sheet": false,
                "type": "DRE"
            },
            "leaf": true,
            "expanded": false,
            "type": "root",
            "children": []
        }
    ]

    constructor(private classifiersHttpServices: FinancialClassifiersService,
                private balanceStructureHttpServices: BalanceStructureHttpServices
    ) {
    }

    loadAllData(id: string): Observable<boolean> {
        return forkJoin([
            this.classifiersHttpServices.findAllPaginate({pageNumber: 0, pageSize: 5000}),
            this.balanceStructureHttpServices.getAccounts(id)
        ]).pipe(
            // @ts-ignore
            map(([format, structure]): void => {
                const {content} = format;
                this.formatRaw$.set(content);
                this.nodesList$.set([]);
                this.accountList$.set([]);
                const base = [
                    {
                        created: "2023-11-30T23:36:18.624",
                        id: "64c26a1d11561a242cfeea98",
                        name: "ATIVO",
                        organizationId: "00000000000",
                        parentAccountId: null,
                        sheet: false,
                        type: BalanceAccountType.ACTIVE
                    },
                    {
                        created: "2023-11-30T23:36:18.624",
                        id: "64c26a1d11561a242cfeea99",
                        name: "PASSIVE",
                        organizationId: "00000000000",
                        parentAccountId: null,
                        sheet: false,
                        type: BalanceAccountType.PASSIVE
                    },
                    {
                        created: "2023-11-30T23:36:18.624",
                        id: "64c26a1d11561a242cfeea97",
                        name: "DRE",
                        organizationId: "00000000000",
                        parentAccountId: null,
                        sheet: false,
                        type: BalanceAccountType.DRE
                    }
                ]
                // @ts-ignore
                structure.length ?
                    this.pickList(structure) :
                    this.nodesList$.set(
                        buildTreeNodes(
                            base,
                            content, 'parentAccountId', 'id')
                    );
            }),
            map(() => true)
        );
    }

    deleteNode(data: StructNode): void {
        const {accountsId} = data;

        const request = [
            this.balanceStructureHttpServices.deleteAccount(accountsId)
        ];

        forkJoin(request)
            .subscribe(() => {
                this.nodesList$.update((list) => list.filter(f => f.key !== data.id));

            });
    }

    updateNode(data: StructNode): void {
        const {accountsId, equations, conditionalEquations, ...params} = data;
        const {calculationType} = params;
        const novo = {
            calculationType: params.calculationType,
            parentAccountStructureId: params.parentAccountStructureId,
            position: params.position + 1
        };
        let a = removeNullProperties(novo)
        const request = [
            this.balanceStructureHttpServices.update({accountsId, ...a}, 'accountsId')
        ];
        if (equations && calculationType === calculationTypeAccountStructure.EQUATIONS) {
            request.push(this.balanceStructureHttpServices.updateAccounts({id: accountsId || '', equations}))
        }
        forkJoin(request)
            .subscribe(() => {
                this.accountList$.update(list =>
                    list.map(m => m.id === accountsId ? {...m, ...data} : m)
                );
            });
    }

    //
    createAccounts(idStructure: string, node: TreeNode<any>, root: boolean, before: boolean, createAccount: any): void {

        const {parent} = node;
        const {key, children, data} = <TreeNode>((!root && before) ? parent : node);
        const {position} = data;
        this.balanceStructureHttpServices.createAccounts(idStructure, createAccount)
            .subscribe(account => {
                if (this.nodesList$().length > 0) {
                    if (!root) {
                        if (children?.length === 0) {
                            children.push({
                                key: account[0].classifier.id,
                                label: account[0].classifier.name,
                                data: {
                                    ...account,
                                    type: account[0].classifier.balanceAccountType,
                                    accountsId: account[0].classifier.id,
                                    name: account[0].classifier.name,
                                },
                                leaf: true,
                                type: 'sheet',
                                children: []
                            });
                            node.leaf = false;
                            node.type = 'root';
                        } else {
                            children?.push({
                                key: account[0].classifier.id,
                                label: account[0].classifier.name,
                                data: {
                                    ...account,
                                    type: account[0].classifier.balanceAccountType,
                                    accountsId: account[0].classifier.id,
                                    name: account[0].classifier.name,
                                },
                                leaf: true,
                                type: 'sheet',
                                children: []
                            });
                        }
                        node.expanded = true;
                    } else {
                        this.nodesList$.update(list => {
                            list.splice(
                                position, 0,
                                {
                                    key: account[0].classifier.id, label: account[0].classifier.name, data: {
                                        ...account,
                                        type: account[0].classifier.balanceAccountType,
                                        accountsId: account[0].classifier.id,
                                        name: account[0].classifier.name,
                                    }, leaf: true, type: 'root', children: []
                                }
                            );
                            return list;
                        });
                    }
                } else {
                    this.pickList(account)
                }

            });
    }

    //
    // addNodeChild(idStructure: string, node: TreeNode<any>, root: boolean, before: boolean,
    //              {accountName, type}: { accountName: string; type: BalanceAccountType; }): void {
    //     const {parent} = node;
    //     const {key, children, data} = <TreeNode>((!root && before) ? parent : node);
    //
    //     const createFormat: Partial<BalanceFormatAccount> = {
    //         name: accountName, organizationId: '',
    //         parentAccountId: root ? null : <string>key, sheet: !root, type
    //     };
    //
    //     this.balanceFormatHttpServices.create(createFormat).subscribe((format: BalanceFormatAccount) => {
    //         const {id, parentAccountId, sheet} = format;
    //         const {position} = data;
    //         const place = ((root || before) ? position : <number>children?.length + 1) + (before ? -1 : 0);
    //         const createAccount: CreateAccountStructureTO = {
    //             accountId: id, parentAccountStructureId: parentAccountId, baseForVA: false,
    //             prefix: '', suffix: '', sheet, position: place, visualize: true,
    //             nullableIfNotHavePreviousYear: true,
    //             calculationType: calculationTypeAccountStructure.SUM_OF_ALL_SUBACCOUNTS
    //         };
    //         this.balanceStructureHttpServices.createAccounts(idStructure, [createAccount])
    //             .subscribe(([account]) => {
    //                 if (!root) {
    //                     if (children?.length === 0) {
    //                         children.push({
    //                             key: id,
    //                             label: accountName,
    //                             data: account,
    //                             leaf: true,
    //                             type: 'sheet',
    //                             children: []
    //                         });
    //                         node.leaf = false;
    //                         node.type = 'root';
    //                     } else {
    //                         children?.push({
    //                             key: id,
    //                             label: accountName,
    //                             data: account,
    //                             leaf: true,
    //                             type: 'sheet',
    //                             children: []
    //                         });
    //                     }
    //                     node.expanded = true;
    //                 } else {
    //                     this.nodesList$.update(list => {
    //                         list.splice(
    //                             position, 0,
    //                             {key: id, label: accountName, data: account, leaf: true, type: 'root', children: []}
    //                         );
    //                         return list;
    //                     });
    //                 }
    //             });
    //     });
    // }
    //
    // removeNodeChild(node: TreeNode<any>): void {
    //     const {parent, key} = node;
    //     if (!parent) {
    //         this.nodesList$.update((list) => list.filter(f => f.key !== key));
    //     } else {
    //         const {children} = parent;
    //         parent.children = children?.filter(f => f.key !== key);
    //         if (children?.length === 1) {
    //             parent.leaf = true;
    //             parent.expanded = undefined;
    //             parent.type = 'sheet';
    //         }
    //     }
    //     if (this.accountList$().length > 0) {
    //         this.balanceStructureAccountsHttpServices.delete(key).subscribe();
    //     }
    // }
    //
    private pickList(structure: AccountStructureTO[] = []): void {
        const transformedStructure = structure.map((item: any) => ({
            ...item,
            type: item.classifier.balanceAccountType,
            accountsId: item.id,
            name: item.classifier.name,
            ...item.classifier
        }));
        const structIndex: any = [];
        // @ts-ignore
        transformedStructure.forEach(({id, name}) => structIndex[id] = name)
        const {ACTIVE, PASSIVE, DRE, INDEXES_AND_INDICATORS} =
            groupBy(orderBy(transformedStructure, 'position'), 'balanceAccountType');
        this.base[0].children = buildTreeNodes(
            ACTIVE?.filter(f => !f.parentAccountStructureId),
            ACTIVE, 'parentAccountStructureId', 'accountsId'
        );
        this.base[0].children = this.base[0].children.sort((a, b) => a.position - b.position);

        this.base[1].children = buildTreeNodes(
            PASSIVE?.filter(f => !f.parentAccountStructureId),
            PASSIVE, 'parentAccountStructureId', 'accountsId'
        );
        this.base[1].children = this.base[1].children.sort((a, b) => a.position - b.position);

        this.base[2].children = buildTreeNodes(
            DRE?.filter(f => !f.parentAccountStructureId),
            DRE, 'parentAccountStructureId', 'accountsId'
        )
        this.base[2].children = this.base[2].children.sort((a, b) => a.position - b.position);
        const index = buildTreeNodes(
            INDEXES_AND_INDICATORS?.filter(f => !f.parentAccountStructureId),
            INDEXES_AND_INDICATORS, 'parentAccountStructureId', 'accountsId'
        );
        this.nodesList$.set([this.base[0], this.base[1], this.base[2], ...index]);
        // @ts-ignore
        this.accountList$.set(transformedStructure.map(m => ({
            ...m,
            classifierId: m.classifier.id,
            parent: structIndex[m.parentAccountStructureId]
        })));
    }

}
