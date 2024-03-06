import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule, NgForOf} from "@angular/common";
import {PipesModule} from "../../core/pipes/pipes.module";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {NotifyService} from "../../layout/service/notify.service";

@Component({
    standalone: true,
    selector: 'app-products-card',
    imports: [CommonModule, NgForOf, PipesModule, DialogModule, ButtonModule],
    templateUrl: './products-card.components.html'
})
export class ProductsCards {

    @Input() product: any;
    @Output() confirmProduct = new EventEmitter();
    visible: boolean = false;
    weightScale = "--.--"

    constructor(public notify: NotifyService) {
        this.notify.weightScale$.subscribe(weight =>{
            if(weight !== ""){
                this.weightScale = weight
            }
        })
    }

    addProductOrder(item: any) {
        if (item.unit === 'KILO') {
            this.visible = true;
        } else {
            this.confirmProduct.emit({count: 1, ...item});
        }
    }

    confirmWeight(product: any) {
        this.visible = false;
        let item = {
            count: 1,
            ...product,
            peso_liquido: Number(this.weightScale),
        }
        this.confirmProduct.emit(item);
    }
}
