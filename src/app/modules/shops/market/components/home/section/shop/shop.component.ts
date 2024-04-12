import {Component} from '@angular/core';
// import {OwlOptions} from 'ngx-owl-carousel-o';
// import {Options, LabelType} from '@angular-slider/ngx-slider';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.css'
})
export class ShopComponent {
    minValue: number = 100;
    maxValue: number = 400;
    // options: Options = {
    //     floor: 0,
    //     ceil: 500,
    //     translate: (value: number, label: LabelType): string => {
    //         switch (label) {
    //             case LabelType.Low:
    //                 return "<b>Min price:</b> $" + value;
    //             case LabelType.High:
    //                 return "<b>Max price:</b> $" + value;
    //             default:
    //                 return "$" + value;
    //         }
    //     }
    // };
    // customOptions: OwlOptions = {
    //     loop: true,
    //     mouseDrag: false,
    //     touchDrag: false,
    //     pullDrag: false,
    //     dots: false,
    //     lazyLoad: false,
    //     navSpeed: 700,
    //     navText: ['<span class="left_slides"><i class="mdi mdi-plus"></i></span>', '<span class="right_slides"><i class="mdi mdi-plus"></i></span>'],
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         400: {
    //             items: 2
    //         },
    //         740: {
    //             items: 3
    //         },
    //         940: {
    //             items: 4
    //         },
    //         1200: {
    //             items: 5
    //         },
    //     },
    //     nav: true
    // }
    active_expand: boolean = false;

    side_expand() {

        this.active_expand = !this.active_expand;
    }

    close_sideber() {
        this.active_expand = false;
    }
}
