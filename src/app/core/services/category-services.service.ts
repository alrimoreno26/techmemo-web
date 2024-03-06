import {AbstractService} from "./abstract.services";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {LazyLoadData, LazyResultData} from "../../standalone/data-table/models";
import {Observable, of} from "rxjs";
import {map} from 'lodash';
import {buildURL} from "../util";
import {CategoryDto} from "../models";

@Injectable({
    providedIn: 'root'
})
export class CategoryServices extends AbstractService<CategoryDto> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/categories'));
    }
    override findAllPaginate(data: LazyLoadData): Observable<LazyResultData<CategoryDto>> {
        const params = map(data, (e, k) => (e !== undefined) ? k + '=' + e : null).filter(f => f).join('&');
        return this.httpClient.get<LazyResultData<CategoryDto>>(
            `${this.basePath}?${params}`
        );
    }

    addSubCategory(id: string,param:any){
        return this.httpClient.post<any>(`${this.basePath}/${id}/sub-categories`,param)
    }

    updateSubCategory(id: string, params?: any) {
        return this.httpClient.patch<any>(this.basePath + '/' + id, params)
    }
}
