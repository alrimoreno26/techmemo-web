import {BaseServices} from './base.services';
import {LazyLoadData, LoadAllRequestI} from '../models';


export class BaseStoreServices<T> extends BaseServices<T> implements LoadAllRequestI {
  /**
   * Server side pagination and filter default value false
   */
  serverSide: boolean;
  /**
   * Server side pagination start on Init default value true
   */
  lazyLoadOnInit = true;

  loadAll(data?: LazyLoadData | Partial<LazyLoadData>): void {
    if (data) {
      const {count, first} = data;
      this.pageSize = count ? count : 25;
      this.pageRecord = first ? first : 0;
    }
  }
}
