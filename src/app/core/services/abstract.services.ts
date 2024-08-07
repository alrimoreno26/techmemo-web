import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Options} from '../models';
import {silentIt} from '../interceptors/spinner.interceptor';
import {LazyLoadData, LazyResultData} from '../../standalone/data-table/models';

export class AbstractService<T> {
    form: string;
    client: HttpClient;
    basePath: string;

    /**
     * @param client HttpClient angular client
     * @param path string endpoint url from base CRUD request
     * @param form string default value 'file'
     */
    constructor(client: HttpClient, path: string, form = 'files') {
        this.form = form;
        this.client = client;
        this.basePath = path;
    }

    /**
     * Fetch all elements without paging
     * @param data can by undefined or {@link LazyLoadData} has all property for Pagination
     * @return An Observable T[]
     */
    findAll(): Observable<T[]> {
        return this.client.get<T[]>(this.basePath);
    }

    /**
     * @Deprecate in favor of findAll method
     * Fetch all elements with paging
     * @param queryParams any
     * @return An Observable T[]
     */
    findAllPaginate(queryParams: any): Observable<LazyResultData<T>> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return this.client.get<LazyResultData<T>>(this.basePath, {params});
    }

    /**
     * Fetch element by Id
     * @param id number | string
     * @param query object
     * @param hidden boolean
     * @return An Observable<T>
     */
    findOneById(id: number | string, query?: any, hidden?: boolean): Observable<T> {
        return hidden ?
            this.client.get<T>(this.basePath + '/' + id, {context: silentIt()}) :
            this.client.get<T>(this.basePath + '/' + id);
    }

    /**
     * Fetch elements by dynamic path
     * @param paths string[]
     * @param queryParams  name: string; value: any []
     * @return An Observable<T>
     */
    findByCriteria(paths: string[], queryParams: any): Observable<any> {
        const params: HttpParams = new HttpParams({fromObject: queryParams});
        return paths?.length ?
            this.client.get(`${this.basePath}/${paths.join('/')}`, {params}) :
            this.client.get(this.basePath, {params});
    }

    /**
     * Create element T
     * @param params T
     * @param queryParams any
     * @return An Observable<T>
     */
    create(params: any, queryParams?: any): Observable<T> {
        return this.client.post<T>(this.basePath, params);
    }

    /**
     * Update element T
     * @param params T
     * @param idProp string
     * @param queryParams any
     * @return An Observable<T>
     */
    update(params: any, idProp?: string, queryParams?: any): Observable<T> {
        return this.client.patch<T>(this.basePath + '/' + params['id'], params)
    }

    /**
     * Delete element by Id
     * @param id number | string
     * @return An Observable<T>
     */
    delete(id: any): Observable<T> {
        return this.client.delete<T>(this.basePath + '/' + id);
    }

    /**
     * Upload Attachment
     * @param files File[]
     * @param otherParams optional Array<{ name: string; value: any; }> default value []
     * @param path string default '/upload'
     * @param form string optional
     * @return An Observable T | T[]
     */
    uploadAttachment(files: any, otherParams: Array<Options> = [], path: string = '/upload', form?: string): Observable<any> {
        const formData = new FormData();
        const formKey = form ? form : this.form;
        files instanceof FileList ?
            Array.from(files).forEach((f: any) => formData.append(formKey, f)) :
            files.forEach((f: any) => formData.append(formKey, f));
        if (otherParams.length) {
            // @ts-ignore
            otherParams.forEach(p => formData.append(p.name, p.value.toString()));
        }
        const response = this.client.post(this.basePath + path, formData);
        return response.pipe(map((data: any) => data));
    }

    /**
     * Delete Attachment by Id
     * @param id number | string
     * @return An Observable<T>
     */
    deleteAttachment(id: any): Observable<any> {
        return this.client.delete(`${this.basePath}/upload/${id}`);
    }

    /**
     * Post Attachment after created object
     * @param data any
     * @return An Observable<T>
     */
    postAttachment(data: any): Observable<any> {
        if (data.attachments.length !== 0) {
            const formData = new FormData();
            const id = data.id;
            data.attachments instanceof FileList ?
                Array.from(data.attachments).forEach((f: any) => formData.append(this.form, f)) :
                data.attachments.forEach((f: any) => formData.append(this.form, f));
            return this.client.post(`${this.basePath}/upload/${id}`, formData);
        } else {
            return of(data);
        }
    }
}
