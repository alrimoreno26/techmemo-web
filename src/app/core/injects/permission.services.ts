import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LightUserTO} from "../models/user";
import {AuthorityTO} from "../models";
import {domainEnum, permissionAuthorityTOEnum} from "../enums/role";

@Injectable({
  providedIn: 'root'
})
export class PermissionServices {

  private create: boolean;
  private update: boolean;
  private delete: boolean;
  private user: LightUserTO;
  private authority: Array<AuthorityTO> = [];

  constructor() {
  }

  /**
   * Check if user has permission to create on current domain
   * @return An boolean value
   */
  get hasCreate(): boolean {
    return this.create;
  }

  /**
   * Check if user has permission to update on current domain
   * @return An boolean value
   */
  get hasUpdate(): boolean {
    return this.update;
  }

  /**
   * Check if user has permission to delete on current domain
   * @return An boolean value
   */
  get hasDelete(): boolean {
    return this.delete;
  }

  /**
   * Check if user has permission to create, update or delete for specific domain
   * @param domain {@link domainEnum}
   * @param permission {@link permissionAuthorityTOEnum}
   * @return An boolean value
   */
  hasPermission(domain: domainEnum, permission: permissionAuthorityTOEnum): boolean {
    return !!this.authority.find(auth => auth.permission === permission && auth.domainDetail.domain === domain);
  }

  /**
   * Check if user has any domain permission
   * @param domain {@link domainEnum}
   * @return An boolean value
   */
  hasDomain(domain: domainEnum): boolean {
    return !!this.authority.find(auth => auth.domainDetail.domain === domain);
  }

  /**
   * Set list of authorities and check if user has permission to create, update or delete
   * @param authority {@link Array<AuthorityTO>}
   * @param domain {@link domainEnum}
   */
  setAuthorityList(authority: Array<AuthorityTO> = [], domain: domainEnum): void {
    this.authority = authority;

    /**
     * Parch for develop only
     */
    if (domain === domainEnum.ALL && !environment.production) {
      this.create = true;
      this.update = true;
      this.delete = true;
    } else {
      this.create = !!authority.find(f => f.permission === permissionAuthorityTOEnum.WRITE && f.domainDetail.domain === domain);
      this.update = !!authority.find(f => f.permission === permissionAuthorityTOEnum.MODIFY && f.domainDetail.domain === domain);
      this.delete = !!authority.find(f => f.permission === permissionAuthorityTOEnum.DELETE && f.domainDetail.domain === domain);
    }
    if (!environment.production) {
      console.log(domain, this.create, this.update, this.delete);
    }
  }

  /**
   * Set User Light
   * @param user {@link LightUserTO}
   */
  setUser(user: LightUserTO): void {
    this.user = user;
  }

  /**
   * Get light user from logged
   */
  getUser(): LightUserTO {
    return this.user;
  }
}
