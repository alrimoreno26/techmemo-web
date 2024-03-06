import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import {silentIt} from "../interceptors/spinner.interceptor";

type CEPResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

@Injectable({
  providedIn: 'root',
})
export class CepValidateService {
  constructor(private http: HttpClient) {}

  findCEP(cep: string): Observable<CEPResponse> {
    const cepValue = cep.replace(/\D/g, '');
    if (cep != '') {
      const validacep = /^\d{8}$/;

      if (validacep.test(cepValue)) {
        const response = this.http.get(
          `https://viacep.com.br/ws/${cepValue}/json/`,{context: silentIt()}
        );
        return response.pipe(map((data: any) => data));
      }
    }
    return throwError(() => 'CEP invalido')
  }
}
