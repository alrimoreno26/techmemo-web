import {Component, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {StructureDreService} from "../service/structure-dre.service";
import {MenuItem, TreeNode} from "primeng/api";
import {TreeNodeContextMenuSelectEvent, TreeNodeSelectEvent} from "primeng/tree";

@Component({
    selector: 'c-structure-dre',
    templateUrl: './structure-dre.component.html',
})
export class StructureDreComponent extends BaseComponentDirective implements OnInit {

    files!: TreeNode[];
    selectedFile!: TreeNode | null;
    selectedNode: any;

    accountName: any;
    accountType: any | null;
    rootAccount: boolean;
    private node: TreeNode<any>;

    menuItems!: MenuItem[];
    constructor(public service: StructureDreService) {
        super();
    }

    ngOnInit() {
        this.files = [{
            key: '0',
            label: 'Receita Bruta',
            data: 'Receita Bruta',
            children: [
                {
                    key: '0-0',
                    label: '1.2 Vendas de Bebidas',
                    data: '1.2 Vendas de Bebidas',
                },
                {
                    key: '0-2',
                    label: '1.2 Vendas de Bebidas',
                    data: '1.2 Vendas de Bebidas',
                },
                {
                    key: '0-3',
                    label: '1.3 Vendas de Açaí',
                    data: '1.3 Vendas de Açaí',
                },
                {
                    key: '0-4',
                    label: '1.4 Vendas Bomboniere',
                    data: '1.4 Vendas Bomboniere',
                }
            ]
        }]

    }

    onNodeContextMenuSelect($event: TreeNodeContextMenuSelectEvent): void {
        const {node} = $event;
        const {parent} = node;
        this.menuItems = [
            {
                label: 'Tirar Conta',
                icon: 'mdi mdi-file-remove-outline mr-2',
            }
        ];
        this.menuItems = [
            ...(parent ? [{
                label: 'Adicionar Conta Antes',
                icon: 'mdi mdi-file-export-outline mr-2',
            }] : []),
            {
                label: 'Adicionar Conta',
                icon: 'mdi mdi-file-outline mr-2',
            },
            {separator: true},
            ...this.menuItems
        ];
        if (!parent ) {
            this.menuItems = [
                {
                    label: 'Adicionar Conta Pai Antes',
                    icon: 'mdi mdi-folder-arrow-up-outline mr-2',
                },
                {
                    label: 'Adicionar Conta Pai',
                    icon: 'mdi mdi-folder-outline mr-2',
                },
                {separator: true},
                ...this.menuItems
            ];
        }
        console.log($event)
    }

    nodeSelect($event: TreeNodeSelectEvent): void {
        const {node} = $event;
        const {data} = node;
        this.node = node;
        console.log($event)
    }
    nodeUnSelect(): void {
        this.selectedNode = undefined;
    }

    private addNodeChild(root: boolean, before: boolean): void {
        this.accountName = '';
        this.accountType = null;
        this.rootAccount = root;
        if (this.accountName !== '' || this.accountName !== null) {
            const type = this.node.data.type;
        }
    }
}
