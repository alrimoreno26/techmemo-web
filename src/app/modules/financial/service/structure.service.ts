import {Injectable} from '@angular/core';
import {map, takeUntil, tap} from 'rxjs';
import {BaseStoreServices} from "../../../standalone/data-table/class/base.store.services";
import {BalanceStructureLightTO} from "../../../core/models/bills";
import {BalanceStructureHttpServices} from "../../../core/services/balance.structure.http.services";
import {LazyLoadData} from "../../../standalone/data-table/models";

@Injectable({providedIn: 'platform'})
export class StructureService extends BaseStoreServices<BalanceStructureLightTO> {
  override serverSide = true;
  override lazyLoadOnInit = true;
  private organizationId: string;

  constructor(private balanceStructureHttpServices: BalanceStructureHttpServices) {
    super();
  }

  override loadAll(data: LazyLoadData): void {

    this.balanceStructureHttpServices.findAllPaginate(data).pipe(
      takeUntil(this.ngUnsubscribe),
      map(result => {
        const {content, page} = result;
        this.listEntities.set(content);
        this.total.set(page.totalElements);
        this.loaded.set(true);
      })
    ).subscribe();
  }

  override create(item: any): void {
    this.balanceStructureHttpServices.create({...item, organizationId: this.organizationId}).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((data) => {
        this.listEntities.set([...this.listEntities(), data]);
        this.dialog.set(false);
      })
    ).subscribe();
  }

  override delete(id: number | string): void {
    this.balanceStructureHttpServices.delete(id).pipe(
      takeUntil(this.ngUnsubscribe),
      tap(() => {
        this.listEntities.update((data) =>
          data.filter(m => m.id !== id)
        );
        this.total.update(total => total - 1);
      })
    ).subscribe();
  }

  override openModalAddOrEdit(dialog: boolean = true): void {
    this.dialog.set(dialog);
  }

  changeState(id: string, checked: boolean): void {
    this.balanceStructureHttpServices.changeState(id).pipe(
      takeUntil(this.ngUnsubscribe),
      tap(() => {
        this.listEntities.update((data) =>
          data.map(m => m.id === id ? {...m, enabled: checked} : {...m, enabled: false})
        );
      })
    ).subscribe();
  }

  override update({id, ...data}: Partial<BalanceStructureLightTO>): void {
    this.balanceStructureHttpServices.patchStructure(<string>id, data).pipe(
      takeUntil(this.ngUnsubscribe),
      tap(() => {
        this.listEntities.update((update) =>
          update.map(m => m.id === id ? {...m, ...data} : m)
        );
        this.dialog.set(false);
      })
    ).subscribe();
  }
}
