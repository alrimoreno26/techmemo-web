import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {BannerComponent} from './section/banner/banner.component';
import {ShopComponent} from './section/shop/shop.component';
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";
// import {CarouselModule} from 'ngx-owl-carousel-o';
// import {NgxSliderModule} from '@angular-slider/ngx-slider';


@NgModule({
    declarations: [
        HomeComponent,
        BannerComponent,
        ShopComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        CarouselModule,
        ButtonModule,
        // NgxSliderModule,
    ]
})
export class HomeModule {
}
