import {Component, Input, ViewChildren} from '@angular/core';
import {ConfirmationService, MenuItem, TreeNode} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {StructureDataService} from "../../../service/structure.data.service";
import {TreeNodeContextMenuSelectEvent, TreeNodeSelectEvent} from "primeng/tree";
import {typeAccount} from "../../utils";

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

    constructor(public service: StructureDataService,) {
        console.log(service.nodesList$())
    }


    nodeSelect($event: TreeNodeSelectEvent): void {
        const {node} = $event;
        const {data} = node;
        this.node = node;
    }

    protected readonly typeAccount = typeAccount;
}
