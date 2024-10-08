import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {silentIt} from "../interceptors/spinner.interceptor";


@Injectable({
    providedIn: 'root',
})
export class CNPJService {
    constructor(private http: HttpClient) {
    }

    findCNPJ(cnpj: string): Observable<any> {
        if (cnpj != '') {
            const response = this.http.get(
                `https://publica.cnpj.ws/cnpj/${cnpj}`,{context: silentIt()}
            );
            return response.pipe(map((data: any) => data));
        }
        return throwError(() => 'CNPJ invalido')
    }
}
