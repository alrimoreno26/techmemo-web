import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from './abstract.services';
import {buildURL} from "../util";
import {AccountEquationStructureTO, AccountStructureTO, BalanceStructureLightTO} from "../models/bills";


@Injectable({providedIn: 'root'})
export class BalanceStructureHttpServices extends AbstractService<BalanceStructureLightTO> {
    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/balance-structures'));
    }

    override update(params: any, idProp: string, queryParams?: any): Observable<BalanceStructureLightTO> {
        return this.client.patch<any>(buildURL('/v1/account-structures') + '/' + params[idProp], params)
    }
    deleteAccount(params: any): Observable<BalanceStructureLightTO> {
        return this.client.delete<any>(buildURL('/v1/account-structures') + '/' + params)
    }

    getFormulaByAccount(id: string | '') {
        return this.client.get(buildURL('/v1/account-structures') + `/${id}/formulas`)
    }

    updateAccounts({id, equations}: { equations?: AccountEquationStructureTO[]; id: string }): Observable<any> {
        const formulas = [
            {
                mathOperations: equations ? equations[0].calculations.map(c => {
                    return {
                        changeSignEndValue: c.changeSignEndValue,
                        classifierId: c?.accountId,
                        constant: c.constant,
                        operator: c.operator
                    }
                }) : [],
                operator: equations ? equations[0].operator : []
            }
        ]
        return this.httpClient.put<AccountStructureTO[]>(buildURL('/v1/account-structures') + `/${id}/formulas`, formulas);
    }

    patchStructure(id: string, body: Partial<BalanceStructureLightTO>): Observable<any> {
        return this.httpClient.patch(`${this.basePath}/${id}`, body);
    }

    changeState(id: string): Observable<any> {
        return this.httpClient.patch(`${this.basePath}/${id}/enable`, {});
    }

    /************Accounts***********/
    getAccounts(id: string): Observable<AccountStructureTO[]> {
        return this.httpClient.get<AccountStructureTO[]>(`${this.basePath}/${id}/accounts`);
    }

    createAccounts(id: string, body: any[]): Observable<any[]> {
        return this.httpClient.post<any[]>(`${this.basePath}/${id}/accounts`, body);
    }
}
