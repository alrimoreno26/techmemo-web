import {Component, effect, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CaixaService} from "../../../services/caixa.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'm-transfer',
    templateUrl: './transfer.components.html'
})
export class MTransferComponents implements OnInit {

    auth: boolean = false;

    targetProducts: any[] = [];
    selectedOrder: any;
    orders: any[] = [];
    selectedProducts!: any;

    constructor(public ordersService: CaixaService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

        effect(async () => {
            if (!ordersService.loaded$()) {
                ordersService.getOrders();
            }
            if (ordersService.listEntities$()) {
                this.orders = this.ordersService.listEntities$()?.filter(od => (od.id !== this.config.data.id && od.state === 'ACTIVE')) || [];
            }
        }, {allowSignalWrites: true})
    }

    ngOnInit() {
        this.config.data.products.filter((x:any) => !x.paid).forEach((p: any) => {
            if (p.amount > 1) {
                this.targetProducts = Array.from({length: p.amount}, () => ({
                    ...p,
                    customId: Math.random(),
                    amount: 1
                }));
            } else {
                this.targetProducts.push({...p, customId: Math.random()})
            }
        })
    }

    close() {
    }

    transferProduct() {
        const params = {
            destinationOrderId: this.selectedOrder,
            products: this.selectedProducts.reduce((result: any, p: any) => {
                const existingProduct = result.find((product: any) => product.id === p.id);
                if (existingProduct) {
                    existingProduct.amount += p.amount;
                } else {
                    result.push({id: p.id, amount: p.amount});
                }
                return result;
            }, []),
            sourceOrderId: this.config.data.id
        }
        this.ordersService.transferOrders(params)
    }


}
