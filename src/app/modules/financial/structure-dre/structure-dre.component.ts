import {Component, OnInit} from '@angular/core';
import {BaseComponentDirective} from "../../../standalone/data-table/directives/base.component.directive";
import {StructureDreService} from "../service/structure-dre.service";
import {MenuItem, TreeNode} from "primeng/api";
import {TreeNodeContextMenuSelectEvent, TreeNodeSelectEvent} from "primeng/tree";
import {InputSwitchChangeEvent} from "primeng/inputswitch";
import {StructureService} from "../service/structure.service";
import {HeadersTable} from "../../../standalone/data-table/models";
import {StructureModalComponent} from "../components/structure-modal/structure-modal.component";
import {formatDate} from "../../../core/util";

@Component({
    selector: 'c-structure-balances',
    templateUrl: './structure-dre.component.html',
})
export class StructureDreComponent extends BaseComponentDirective implements OnInit {

    override modalContent = StructureModalComponent;
    override headersTable: HeadersTable[] = [
        {
            header: 'balance.structure.labels.description',
            field: 'description',
            visible: true,
            export: true,
        },
        {header: 'balance.structure.labels.created', field: 'created', visible: true, export: true, pipe: 'date'},
        {
            header: 'balance.structure.labels.pattern',
            field: 'pattern',
            class: 'text-center',
            visible: true,
            export: true
        },
        {
            header: 'balance.structure.labels.enabled',
            field: 'enabled',
            class: 'text-center',
            visible: true,
            export: true
        },
        {header: 'common.action', field: 'action', visible: true, export: true}
    ];

    constructor(public service: StructureService) {
        super();
        this.service.loadAll({
            pageNumber: 0,
            pageSize: 25,
        })
    }

    ngOnInit() {

    }

    changeState($event: InputSwitchChangeEvent, data: any): void {
        const {checked} = $event;
        const {id} = data;
        this.service.changeState(id, checked);
    }

    patchStructure($event: InputSwitchChangeEvent, data: any): void {
        const {checked} = $event;
        const {id} = data;
        this.service.update({id, enabled: checked});
    }
}
