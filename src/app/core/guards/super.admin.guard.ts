import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {SessionServices} from "../injects/session.services";
import {operationAreaRoleEnum} from "../enums/role";

@Injectable({
    providedIn: 'root'
})
export class SuperAdminGuard  {

    constructor(private session: SessionServices, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        debugger
        if (this.session.isLoggedIn && this.session.userLogged.role.operationArea === operationAreaRoleEnum.SUPER_ADMIN) {
            return true;
        } else {
            this.router.navigate(['/static/access-denied']).then();
            return false;
        }
    }
}
