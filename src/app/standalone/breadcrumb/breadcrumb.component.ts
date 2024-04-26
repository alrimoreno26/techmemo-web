import {Component} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {CommonModule, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {PipesModule} from "../../core/pipes/pipes.module";
import {CommercesService} from "../../modules/shops/service/commerces.service";

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    standalone: true,
    selector: 'app-breadcrumb',
    imports: [CommonModule, NgForOf, ButtonModule, PipesModule, RouterLink],
    templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    showBack = false;

    constructor(private router: Router, public commercesService: CommercesService) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            this.addBreadcrumb(root, [], breadcrumbs);
            this._breadcrumbs$.next(breadcrumbs);
        });
    }

    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent!.data ? route.parent.data['breadcrumb'] : null;
        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
            if (Object.keys(route.params).length > 0) {
                this.showBack = true;
                breadcrumbs.push({
                    label: '#' + route.params['identificador'],
                    url: '/' + routeUrl.join('/')
                });
            }
        }

        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }
}
