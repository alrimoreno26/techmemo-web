import {AbstractService} from "./abstract.services";
import {HttpClient, HttpParams} from "@angular/common/http";
import {buildURL} from "../util";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {LazyResultData} from "../../standalone/data-table/models";
import {SupplierDTO} from "../models/supplier";
@Injectable({
    providedIn: 'root'
})
export class StructureDreServices extends AbstractService<any> {

    constructor(private httpClient: HttpClient) {
        super(httpClient, buildURL('/v1/classifiers'));
    }

    getAll():Observable<any>{
        let b= [
            {
                "id": "663b6295916a520b483237fa",
                "organizationId": "00000000000",
                "cnpj": "01106869000188",
                "traceabilityId": "663b6295916a520b483237f9",
                "endDate": "2020-12-31",
                "created": "2024-05-08T08:31:33.265",
                "source": "SPED",
                "analysisType": "INDIVIDUAL",
                "actives": [
                    {
                        "code": "1",
                        "rootCode": null,
                        "name": "ATIVO TOTAL",
                        "value": 2515040.7600000002,
                        "percentVA": 100,
                        "percentHA": -98,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1",
                        "rootCode": "1",
                        "name": "ATIVO CIRCULANTE",
                        "value": 2093558.16,
                        "percentVA": 83,
                        "percentHA": -98,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1",
                        "rootCode": "1.1",
                        "name": "Disponibilidades",
                        "value": 8886.17,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.1",
                        "rootCode": "1.1.1",
                        "name": "Caixa e Bancos",
                        "value": 8886.17,
                        "percentVA": 0,
                        "percentHA": -99,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.2",
                        "rootCode": "1.1.1",
                        "name": "Aplicações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2",
                        "rootCode": "1.1",
                        "name": "Clientes",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.1",
                        "rootCode": "1.1.2",
                        "name": "Clientes CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.2",
                        "rootCode": "1.1.2",
                        "name": "Provisão para Dev. Duvidosos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3",
                        "rootCode": "1.1",
                        "name": "Estoques",
                        "value": 2078349.24,
                        "percentVA": 83,
                        "percentHA": -58,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3.1",
                        "rootCode": "1.1.3",
                        "name": "Estoques",
                        "value": 2078349.24,
                        "percentVA": 83,
                        "percentHA": -58,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4",
                        "rootCode": "1.1",
                        "name": "Outros Créditos",
                        "value": 6322.75,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.1",
                        "rootCode": "1.1.4",
                        "name": "Impostos a Recuperar CP",
                        "value": 6322.75,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.2",
                        "rootCode": "1.1.4",
                        "name": "Adiantamentos a Fornecedores",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.3",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos Ativo Cíclico",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.4",
                        "rootCode": "1.1.4",
                        "name": "Valores Mobiliários",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.5",
                        "rootCode": "1.1.4",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.6",
                        "rootCode": "1.1.4",
                        "name": "IR Diferido de Curto Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.7",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2",
                        "rootCode": "1",
                        "name": "REALIZÁVEL LONGO PRAZO",
                        "value": 200391.9,
                        "percentVA": 8,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1",
                        "rootCode": "1.2",
                        "name": "Clientes LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1.1",
                        "rootCode": "1.2.1",
                        "name": "Clientes LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2",
                        "rootCode": "1.2",
                        "name": "Outros Créditos",
                        "value": 200391.9,
                        "percentVA": 8,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.1",
                        "rootCode": "1.2.2",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.2",
                        "rootCode": "1.2.2",
                        "name": "IR Diferido de Longo Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.3",
                        "rootCode": "1.2.2",
                        "name": "Impostos a Recuperar LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.4",
                        "rootCode": "1.2.2",
                        "name": "Outros Créditos LP",
                        "value": 200391.9,
                        "percentVA": 8,
                        "percentHA": -93,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3",
                        "rootCode": "1",
                        "name": "PERMANENTE",
                        "value": 221090.7,
                        "percentVA": 9,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1",
                        "rootCode": "1.3",
                        "name": "Investimentos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1.1",
                        "rootCode": "1.3.1",
                        "name": "Investimentos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2",
                        "rootCode": "1.3",
                        "name": "Imobilizado",
                        "value": 219340.7,
                        "percentVA": 9,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2.1",
                        "rootCode": "1.3.2",
                        "name": "Imobilizado",
                        "value": 219340.7,
                        "percentVA": 9,
                        "percentHA": -99,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3",
                        "rootCode": "1.3",
                        "name": "Intangível",
                        "value": 1750,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3.1",
                        "rootCode": "1.3.3",
                        "name": "Intangível",
                        "value": 1750,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    }
                ],
                "relatedTraceabilities": [],
                "passives": [
                    {
                        "code": "2",
                        "rootCode": null,
                        "name": "PASSIVO TOTAL",
                        "value": 2515040.76,
                        "percentVA": 100,
                        "percentHA": -98,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1",
                        "rootCode": "2",
                        "name": "PASSIVO CIRCULANTE",
                        "value": 1300479.98,
                        "percentVA": 52,
                        "percentHA": -97,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1",
                        "rootCode": "2.1",
                        "name": "Obrigações Financeiras CP",
                        "value": -11161.22,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.1",
                        "rootCode": "2.1.1",
                        "name": "Duplicatas Descontadas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.2",
                        "rootCode": "2.1.1",
                        "name": "Empréstimos e Financiamentos CP",
                        "value": -11161.22,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.3",
                        "rootCode": "2.1.1",
                        "name": "Outras Obrigações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2",
                        "rootCode": "2.1",
                        "name": "Obrigações Operacionais CP",
                        "value": 1311641.2,
                        "percentVA": 52,
                        "percentHA": -92,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.1",
                        "rootCode": "2.1.2",
                        "name": "Fornecedores CP",
                        "value": 1200000,
                        "percentVA": 48,
                        "percentHA": -89,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.2",
                        "rootCode": "2.1.2",
                        "name": "Adiantamentos de Clientes",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.3",
                        "rootCode": "2.1.2",
                        "name": "Salários e Encargos",
                        "value": 3319.67,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.4",
                        "rootCode": "2.1.2",
                        "name": "Tributos e Impostos CP",
                        "value": 108321.53,
                        "percentVA": 4,
                        "percentHA": -90,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.5",
                        "rootCode": "2.1.2",
                        "name": "Outras Obrigações Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.6",
                        "rootCode": "2.1.2",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.7",
                        "rootCode": "2.1.2",
                        "name": "Provisões CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2",
                        "rootCode": "2",
                        "name": "EXIGÍVEL LONGO PRAZO",
                        "value": 282590.25,
                        "percentVA": 11,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1",
                        "rootCode": "2.2",
                        "name": "Obrigações LP",
                        "value": 282590.25,
                        "percentVA": 11,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.1",
                        "rootCode": "2.2.1",
                        "name": "Empréstimos e Financiamentos LP",
                        "value": -24586.62,
                        "percentVA": -1,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.2",
                        "rootCode": "2.2.1",
                        "name": "Fornecedores LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.3",
                        "rootCode": "2.2.1",
                        "name": "Tributos e Impostos LP",
                        "value": 106784.97,
                        "percentVA": 4,
                        "percentHA": -97,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.4",
                        "rootCode": "2.2.1",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.5",
                        "rootCode": "2.2.1",
                        "name": "Provisões LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.6",
                        "rootCode": "2.2.1",
                        "name": "Outras Obrigações LP",
                        "value": 200391.9,
                        "percentVA": 8,
                        "percentHA": -94,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3",
                        "rootCode": "2",
                        "name": "RESULTADO DE EXERCÍCIO FUTURO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1",
                        "rootCode": "2.3",
                        "name": "Resultado Exercício Futuro",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1.1",
                        "rootCode": "2.3.1",
                        "name": "Receitas Diferidas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4",
                        "rootCode": "2",
                        "name": "PATRIMÔNIO LÍQUIDO",
                        "value": 931970.53,
                        "percentVA": 37,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1",
                        "rootCode": "2.4",
                        "name": "Patrimônio Líquido",
                        "value": 931970.53,
                        "percentVA": 37,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.1",
                        "rootCode": "2.4.1",
                        "name": "Capital Subscrito",
                        "value": 94000,
                        "percentVA": 4,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.2",
                        "rootCode": "2.4.1",
                        "name": "Capital a Integralizar",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.3",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Capital",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.4",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Lucros",
                        "value": 837970.53,
                        "percentVA": 33,
                        "percentHA": -95,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.5",
                        "rootCode": "2.4.1",
                        "name": "Prejuízos Acumulados",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.6",
                        "rootCode": "2.4.1",
                        "name": "(-) Ações em tesouraria",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.7",
                        "rootCode": "2.4.1",
                        "name": "Ajuste de Avaliação Patrimonial",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.8",
                        "rootCode": "2.4.1",
                        "name": "Resultado do Exercício",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.9",
                        "rootCode": "2.4.1",
                        "name": "Reserva de Reavaliação",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    }
                ],
                "demonstrations": [
                    {
                        "code": "3",
                        "rootCode": null,
                        "name": "DRE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL BRUTA",
                        "value": 16294189.26,
                        "percentVA": 100,
                        "percentHA": -95,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1.1",
                        "rootCode": null,
                        "name": "Deduções da Receita",
                        "value": -976165.33,
                        "percentVA": -6,
                        "percentHA": -99,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL LÍQUIDA",
                        "value": 15318023.93,
                        "percentVA": 94,
                        "percentHA": -93,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2.1",
                        "rootCode": null,
                        "name": "Custo Produtos Vendidos",
                        "value": -14682952.37,
                        "percentVA": -90,
                        "percentHA": -93,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL BRUTO",
                        "value": 635071.5600000005,
                        "percentVA": 4,
                        "percentHA": -97,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1",
                        "rootCode": null,
                        "name": "Despesas Operacionais",
                        "value": -652019.24,
                        "percentVA": -4,
                        "percentHA": -97,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.1",
                        "rootCode": null,
                        "name": "Despesas Comerciais e Administrativas",
                        "value": -584388.06,
                        "percentVA": -4,
                        "percentHA": -97,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.2",
                        "rootCode": null,
                        "name": "Despesas de Depreciação / Amortização",
                        "value": -67631.18,
                        "percentVA": 0,
                        "percentHA": -83,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4",
                        "rootCode": null,
                        "name": "EBITDA",
                        "value": 50683.500000000524,
                        "percentVA": 0,
                        "percentHA": -99,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1",
                        "rootCode": null,
                        "name": "Resultado Financeiro",
                        "value": -6399.87,
                        "percentVA": 0,
                        "percentHA": -101,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.1",
                        "rootCode": null,
                        "name": "Receitas Financeiras",
                        "value": 3710.05,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.2",
                        "rootCode": null,
                        "name": "Despesas Financeiras",
                        "value": -10109.92,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.3",
                        "rootCode": null,
                        "name": "Variações Monetárias e Cambiais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL",
                        "value": -23347.549999999468,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1",
                        "rootCode": null,
                        "name": "Resultado Não Operacional",
                        "value": -7752.23,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.1",
                        "rootCode": null,
                        "name": "Receitas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.2",
                        "rootCode": null,
                        "name": "Despesas Não Operacionais",
                        "value": -7752.23,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.3",
                        "rootCode": null,
                        "name": "Resultado de equivalência patrimonial",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3",
                        "rootCode": null,
                        "name": "LUCRO ANTES DO IR",
                        "value": -31099.779999999468,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1",
                        "rootCode": null,
                        "name": "Impostos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.1",
                        "rootCode": null,
                        "name": "Provisões para IR e CSLL",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.2",
                        "rootCode": null,
                        "name": "Provisão para IR e CSLL - diferido",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.3",
                        "rootCode": null,
                        "name": "Reversão JCP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.4",
                        "rootCode": null,
                        "name": "Participações nos Lucros",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "5",
                        "rootCode": null,
                        "name": "RESULTADO LÍQUIDO DO EXERCÍCIO",
                        "value": -31099.779999999468,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    }
                ],
                "indexesAndIndicators": [
                    {
                        "code": "10",
                        "rootCode": "null",
                        "name": "CAPITAL DE GIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico",
                        "value": 2084671.99,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1.1",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico1",
                        "value": 2084671.99,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1.2",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico1",
                        "value": 2084671.99,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.2",
                        "rootCode": "null",
                        "name": "Passivo Circulante Cíclico",
                        "value": 1311641.2,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.3",
                        "rootCode": "null",
                        "name": "Necessidade de Capital de Giro",
                        "value": 773030.79,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.4",
                        "rootCode": "null",
                        "name": "Saldo de Terouraria",
                        "value": 20047.389999999898,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.5",
                        "rootCode": "null",
                        "name": "Relação Necessidade/Receita Op. Líquida",
                        "value": 5.046543820094424,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.6",
                        "rootCode": "null",
                        "name": "Saldo em Tesouraria Sobre Vendas",
                        "value": 0.12303398272912841,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11",
                        "rootCode": "null",
                        "name": "DEMAIS ÍNDICES",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.1",
                        "rootCode": "null",
                        "name": "Capital Circulante Líquido",
                        "value": 793078.1799999999,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.2",
                        "rootCode": "null",
                        "name": "Dívida Líquida",
                        "value": -44634.009999999995,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.3",
                        "rootCode": "null",
                        "name": "Dívida Líquida/EBITDA",
                        "value": -0.8806418262353534,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6",
                        "rootCode": "null",
                        "name": "ÍNDICES DE LIQUIDEZ",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.1",
                        "rootCode": "null",
                        "name": "Liquidez Geral",
                        "value": 1.4491,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.2",
                        "rootCode": "null",
                        "name": "Liquidez Corrente",
                        "value": 1.6098349780055823,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.3",
                        "rootCode": "null",
                        "name": "Liquidez Seca",
                        "value": 0.0117,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.4",
                        "rootCode": "null",
                        "name": "Solvência Geral",
                        "value": 1.5887,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7",
                        "rootCode": "null",
                        "name": "ESTRUTURA DE CAPITAL",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.1",
                        "rootCode": "null",
                        "name": "Participação de Capital de Terceiros",
                        "value": 169.8627,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.2",
                        "rootCode": "null",
                        "name": "Endividamento Geral",
                        "value": 62.9441,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.3",
                        "rootCode": "null",
                        "name": "Endividamento Oneroso",
                        "value": -3.8357,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.4",
                        "rootCode": "null",
                        "name": "Composição do Endividamento",
                        "value": 82.1492,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.5",
                        "rootCode": "null",
                        "name": "Nível de Desconto de Duplicatas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.6",
                        "rootCode": "null",
                        "name": "Imobilização do Patrimônio Líquido",
                        "value": 23.72292823465137,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8",
                        "rootCode": "null",
                        "name": "RENTABILIDADE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.1",
                        "rootCode": "null",
                        "name": "Margem Bruta",
                        "value": -0.19086423696050445,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.2",
                        "rootCode": "null",
                        "name": "Margem Líquida",
                        "value": -0.20302736268149615,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.3",
                        "rootCode": "null",
                        "name": "Retorno Sobre Ativo",
                        "value": -1.2365517288872674,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.4",
                        "rootCode": "null",
                        "name": "Retorno Sobre PL",
                        "value": -3.3369917823473956,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9",
                        "rootCode": "null",
                        "name": "CICLO FINANCEIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.1",
                        "rootCode": "null",
                        "name": "Prazo Médio de Estoques",
                        "value": 50.9574,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.2",
                        "rootCode": "null",
                        "name": "Prazo Médio de Recebimentos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.3",
                        "rootCode": "null",
                        "name": "Prazo Médio de Pagamentos",
                        "value": 29.8305,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.4",
                        "rootCode": "null",
                        "name": "Ciclo Financeiro",
                        "value": 21.1269,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.5",
                        "rootCode": "null",
                        "name": "Ciclo do Ativo",
                        "value": 6.090566870176688,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    }
                ]
            },
            {
                "id": "663b62cd916a520b483237fe",
                "organizationId": "00000000000",
                "cnpj": "01106869000188",
                "traceabilityId": "663b62cd916a520b483237fb",
                "endDate": "2021-12-31",
                "created": "2024-05-08T08:32:29.866",
                "source": "OCR",
                "analysisType": "INDIVIDUAL",
                "actives": [
                    {
                        "code": "1",
                        "rootCode": null,
                        "name": "ATIVO TOTAL",
                        "value": 1856117935,
                        "percentVA": 100,
                        "percentHA": 73701,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1",
                        "rootCode": "1",
                        "name": "ATIVO CIRCULANTE",
                        "value": 1330462883,
                        "percentVA": 72,
                        "percentHA": 63450,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1",
                        "rootCode": "1.1",
                        "name": "Disponibilidades",
                        "value": 34517096,
                        "percentVA": 2,
                        "percentHA": 388336,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.1",
                        "rootCode": "1.1.1",
                        "name": "Caixa e Bancos",
                        "value": 34517096,
                        "percentVA": 2,
                        "percentHA": 388336,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.2",
                        "rootCode": "1.1.1",
                        "name": "Aplicações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2",
                        "rootCode": "1.1",
                        "name": "Clientes",
                        "value": 779489020,
                        "percentVA": 42,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.1",
                        "rootCode": "1.1.2",
                        "name": "Clientes CP",
                        "value": 779489020,
                        "percentVA": 42,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.2",
                        "rootCode": "1.1.2",
                        "name": "Provisão para Dev. Duvidosos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3",
                        "rootCode": "1.1",
                        "name": "Estoques",
                        "value": 436152596,
                        "percentVA": 23,
                        "percentHA": 20886,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3.1",
                        "rootCode": "1.1.3",
                        "name": "Estoques",
                        "value": 436152596,
                        "percentVA": 23,
                        "percentHA": 20886,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4",
                        "rootCode": "1.1",
                        "name": "Outros Créditos",
                        "value": 80304171,
                        "percentVA": 4,
                        "percentHA": 1269983,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.1",
                        "rootCode": "1.1.4",
                        "name": "Impostos a Recuperar CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.2",
                        "rootCode": "1.1.4",
                        "name": "Adiantamentos a Fornecedores",
                        "value": 35351115,
                        "percentVA": 2,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.3",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos Ativo Cíclico",
                        "value": 1187139,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.4",
                        "rootCode": "1.1.4",
                        "name": "Valores Mobiliários",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.5",
                        "rootCode": "1.1.4",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.6",
                        "rootCode": "1.1.4",
                        "name": "IR Diferido de Curto Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.7",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos CP",
                        "value": 43765917,
                        "percentVA": 2,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2",
                        "rootCode": "1",
                        "name": "REALIZÁVEL LONGO PRAZO",
                        "value": 138115652,
                        "percentVA": 7,
                        "percentHA": 68823,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1",
                        "rootCode": "1.2",
                        "name": "Clientes LP",
                        "value": 8953103,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1.1",
                        "rootCode": "1.2.1",
                        "name": "Clientes LP",
                        "value": 8953103,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2",
                        "rootCode": "1.2",
                        "name": "Outros Créditos",
                        "value": 129162549,
                        "percentVA": 7,
                        "percentHA": 64355,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.1",
                        "rootCode": "1.2.2",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.2",
                        "rootCode": "1.2.2",
                        "name": "IR Diferido de Longo Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.3",
                        "rootCode": "1.2.2",
                        "name": "Impostos a Recuperar LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.4",
                        "rootCode": "1.2.2",
                        "name": "Outros Créditos LP",
                        "value": 129162549,
                        "percentVA": 7,
                        "percentHA": 64355,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3",
                        "rootCode": "1",
                        "name": "PERMANENTE",
                        "value": 387539400,
                        "percentVA": 21,
                        "percentHA": 175185,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1",
                        "rootCode": "1.3",
                        "name": "Investimentos",
                        "value": 27485397,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1.1",
                        "rootCode": "1.3.1",
                        "name": "Investimentos",
                        "value": 27485397,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2",
                        "rootCode": "1.3",
                        "name": "Imobilizado",
                        "value": 357214217,
                        "percentVA": 19,
                        "percentHA": 162758,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2.1",
                        "rootCode": "1.3.2",
                        "name": "Imobilizado",
                        "value": 357214217,
                        "percentVA": 19,
                        "percentHA": 162758,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3",
                        "rootCode": "1.3",
                        "name": "Intangível",
                        "value": 2839786,
                        "percentVA": 0,
                        "percentHA": 162173,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3.1",
                        "rootCode": "1.3.3",
                        "name": "Intangível",
                        "value": 2839786,
                        "percentVA": 0,
                        "percentHA": 162173,
                        "sheet": true,
                        "type": "ACTIVE"
                    }
                ],
                "relatedTraceabilities": [],
                "passives": [
                    {
                        "code": "2",
                        "rootCode": null,
                        "name": "PASSIVO TOTAL",
                        "value": 1327056872,
                        "percentVA": 100,
                        "percentHA": 52665,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1",
                        "rootCode": "2",
                        "name": "PASSIVO CIRCULANTE",
                        "value": 858086275,
                        "percentVA": 65,
                        "percentHA": 65882,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1",
                        "rootCode": "2.1",
                        "name": "Obrigações Financeiras CP",
                        "value": 370384618,
                        "percentVA": 28,
                        "percentHA": -3318596,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.1",
                        "rootCode": "2.1.1",
                        "name": "Duplicatas Descontadas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.2",
                        "rootCode": "2.1.1",
                        "name": "Empréstimos e Financiamentos CP",
                        "value": 370384618,
                        "percentVA": 28,
                        "percentHA": -3318596,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.3",
                        "rootCode": "2.1.1",
                        "name": "Outras Obrigações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2",
                        "rootCode": "2.1",
                        "name": "Obrigações Operacionais CP",
                        "value": 487701657,
                        "percentVA": 37,
                        "percentHA": 37083,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.1",
                        "rootCode": "2.1.2",
                        "name": "Fornecedores CP",
                        "value": 189409934,
                        "percentVA": 14,
                        "percentHA": 15684,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.2",
                        "rootCode": "2.1.2",
                        "name": "Adiantamentos de Clientes",
                        "value": 78696414,
                        "percentVA": 6,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.3",
                        "rootCode": "2.1.2",
                        "name": "Salários e Encargos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.4",
                        "rootCode": "2.1.2",
                        "name": "Tributos e Impostos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.5",
                        "rootCode": "2.1.2",
                        "name": "Outras Obrigações Operacionais",
                        "value": 219595309,
                        "percentVA": 17,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.6",
                        "rootCode": "2.1.2",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.7",
                        "rootCode": "2.1.2",
                        "name": "Provisões CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2",
                        "rootCode": "2",
                        "name": "EXIGÍVEL LONGO PRAZO",
                        "value": 265608343,
                        "percentVA": 20,
                        "percentHA": 93891,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1",
                        "rootCode": "2.2",
                        "name": "Obrigações LP",
                        "value": 265608343,
                        "percentVA": 20,
                        "percentHA": 93891,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.1",
                        "rootCode": "2.2.1",
                        "name": "Empréstimos e Financiamentos LP",
                        "value": 130408287,
                        "percentVA": 10,
                        "percentHA": -530503,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.2",
                        "rootCode": "2.2.1",
                        "name": "Fornecedores LP",
                        "value": 2827795,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.3",
                        "rootCode": "2.2.1",
                        "name": "Tributos e Impostos LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.4",
                        "rootCode": "2.2.1",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.5",
                        "rootCode": "2.2.1",
                        "name": "Provisões LP",
                        "value": 123002289,
                        "percentVA": 9,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.6",
                        "rootCode": "2.2.1",
                        "name": "Outras Obrigações LP",
                        "value": 9369972,
                        "percentVA": 1,
                        "percentHA": 4576,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3",
                        "rootCode": "2",
                        "name": "RESULTADO DE EXERCÍCIO FUTURO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1",
                        "rootCode": "2.3",
                        "name": "Resultado Exercício Futuro",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1.1",
                        "rootCode": "2.3.1",
                        "name": "Receitas Diferidas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4",
                        "rootCode": "2",
                        "name": "PATRIMÔNIO LÍQUIDO",
                        "value": 203362254,
                        "percentVA": 15,
                        "percentHA": 21721,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1",
                        "rootCode": "2.4",
                        "name": "Patrimônio Líquido",
                        "value": 203362254,
                        "percentVA": 15,
                        "percentHA": 21721,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.1",
                        "rootCode": "2.4.1",
                        "name": "Capital Subscrito",
                        "value": 35379969,
                        "percentVA": 3,
                        "percentHA": 37538,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.2",
                        "rootCode": "2.4.1",
                        "name": "Capital a Integralizar",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.3",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Capital",
                        "value": 126568377,
                        "percentVA": 10,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.4",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Lucros",
                        "value": 10000000,
                        "percentVA": 1,
                        "percentHA": 1093,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.5",
                        "rootCode": "2.4.1",
                        "name": "Prejuízos Acumulados",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.6",
                        "rootCode": "2.4.1",
                        "name": "(-) Ações em tesouraria",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.7",
                        "rootCode": "2.4.1",
                        "name": "Ajuste de Avaliação Patrimonial",
                        "value": 31413908,
                        "percentVA": 2,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.8",
                        "rootCode": "2.4.1",
                        "name": "Resultado do Exercício",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.9",
                        "rootCode": "2.4.1",
                        "name": "Reserva de Reavaliação",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    }
                ],
                "demonstrations": [
                    {
                        "code": "3",
                        "rootCode": null,
                        "name": "DRE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL BRUTA",
                        "value": 5578914,
                        "percentVA": 100,
                        "percentHA": -66,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1.1",
                        "rootCode": null,
                        "name": "Deduções da Receita",
                        "value": -15571709,
                        "percentVA": -279,
                        "percentHA": 1495,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL LÍQUIDA",
                        "value": -9992795,
                        "percentVA": -179,
                        "percentHA": -165,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2.1",
                        "rootCode": null,
                        "name": "Custo Produtos Vendidos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL BRUTO",
                        "value": -9992795,
                        "percentVA": -179,
                        "percentHA": -1673,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1",
                        "rootCode": null,
                        "name": "Despesas Operacionais",
                        "value": -249352180,
                        "percentVA": -4470,
                        "percentHA": 38143,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.1",
                        "rootCode": null,
                        "name": "Despesas Comerciais e Administrativas",
                        "value": -249352180,
                        "percentVA": -4470,
                        "percentHA": 42569,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.2",
                        "rootCode": null,
                        "name": "Despesas de Depreciação / Amortização",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4",
                        "rootCode": null,
                        "name": "EBITDA",
                        "value": -259344975,
                        "percentVA": -4649,
                        "percentHA": -511795,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1",
                        "rootCode": null,
                        "name": "Resultado Financeiro",
                        "value": 9206548,
                        "percentVA": 165,
                        "percentHA": -143955,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.1",
                        "rootCode": null,
                        "name": "Receitas Financeiras",
                        "value": 54220000,
                        "percentVA": 972,
                        "percentHA": 1461336,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.2",
                        "rootCode": null,
                        "name": "Despesas Financeiras",
                        "value": -45013452,
                        "percentVA": -807,
                        "percentHA": 445140,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.3",
                        "rootCode": null,
                        "name": "Variações Monetárias e Cambiais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL",
                        "value": -250138427,
                        "percentVA": -4484,
                        "percentHA": 1071269,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1",
                        "rootCode": null,
                        "name": "Resultado Não Operacional",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.1",
                        "rootCode": null,
                        "name": "Receitas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.2",
                        "rootCode": null,
                        "name": "Despesas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.3",
                        "rootCode": null,
                        "name": "Resultado de equivalência patrimonial",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3",
                        "rootCode": null,
                        "name": "LUCRO ANTES DO IR",
                        "value": -250138427,
                        "percentVA": -4484,
                        "percentHA": 804209,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1",
                        "rootCode": null,
                        "name": "Impostos",
                        "value": -11018506,
                        "percentVA": -198,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.1",
                        "rootCode": null,
                        "name": "Provisões para IR e CSLL",
                        "value": -11018506,
                        "percentVA": -198,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.2",
                        "rootCode": null,
                        "name": "Provisão para IR e CSLL - diferido",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.3",
                        "rootCode": null,
                        "name": "Reversão JCP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.4",
                        "rootCode": null,
                        "name": "Participações nos Lucros",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "5",
                        "rootCode": null,
                        "name": "RESULTADO LÍQUIDO DO EXERCÍCIO",
                        "value": -261156933,
                        "percentVA": -4681,
                        "percentHA": 839639,
                        "sheet": false,
                        "type": "DRE"
                    }
                ],
                "indexesAndIndicators": [
                    {
                        "code": "10",
                        "rootCode": "null",
                        "name": "CAPITAL DE GIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico",
                        "value": 1252179870,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.2",
                        "rootCode": "null",
                        "name": "Passivo Circulante Cíclico",
                        "value": 487701657,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.3",
                        "rootCode": "null",
                        "name": "Necessidade de Capital de Giro",
                        "value": 764478213,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.4",
                        "rootCode": "null",
                        "name": "Saldo de Terouraria",
                        "value": -292101605,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.5",
                        "rootCode": "null",
                        "name": "Relação Necessidade/Receita Op. Líquida",
                        "value": -7650.294166947286,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.6",
                        "rootCode": "null",
                        "name": "Saldo em Tesouraria Sobre Vendas",
                        "value": -5235.81480194891,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11",
                        "rootCode": "null",
                        "name": "DEMAIS ÍNDICES",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.1",
                        "rootCode": "null",
                        "name": "Capital Circulante Líquido",
                        "value": 472376608,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.2",
                        "rootCode": "null",
                        "name": "Dívida Líquida",
                        "value": 466275809,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.3",
                        "rootCode": "null",
                        "name": "Dívida Líquida/EBITDA",
                        "value": -1.797897988962385,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6",
                        "rootCode": "null",
                        "name": "ÍNDICES DE LIQUIDEZ",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.1",
                        "rootCode": "null",
                        "name": "Liquidez Geral",
                        "value": 1.3069,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.2",
                        "rootCode": "null",
                        "name": "Liquidez Corrente",
                        "value": 1.5505001324021876,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.3",
                        "rootCode": "null",
                        "name": "Liquidez Seca",
                        "value": 1.0422,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.4",
                        "rootCode": "null",
                        "name": "Solvência Geral",
                        "value": 1.6518,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7",
                        "rootCode": "null",
                        "name": "ESTRUTURA DE CAPITAL",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.1",
                        "rootCode": "null",
                        "name": "Participação de Capital de Terceiros",
                        "value": 552.5581,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.2",
                        "rootCode": "null",
                        "name": "Endividamento Geral",
                        "value": 84.6757,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.3",
                        "rootCode": "null",
                        "name": "Endividamento Oneroso",
                        "value": 246.2566,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.4",
                        "rootCode": "null",
                        "name": "Composição do Endividamento",
                        "value": 76.3629,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.5",
                        "rootCode": "null",
                        "name": "Nível de Desconto de Duplicatas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.6",
                        "rootCode": "null",
                        "name": "Imobilização do Patrimônio Líquido",
                        "value": 190.56604280163023,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8",
                        "rootCode": "null",
                        "name": "RENTABILIDADE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.1",
                        "rootCode": "null",
                        "name": "Margem Bruta",
                        "value": -4681.142835326014,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.2",
                        "rootCode": "null",
                        "name": "Margem Líquida",
                        "value": 2613.452322398288,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.3",
                        "rootCode": "null",
                        "name": "Retorno Sobre Ativo",
                        "value": -19.679407756384386,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.4",
                        "rootCode": "null",
                        "name": "Retorno Sobre PL",
                        "value": -128.41957042824671,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9",
                        "rootCode": "null",
                        "name": "CICLO FINANCEIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.1",
                        "rootCode": "null",
                        "name": "Prazo Médio de Estoques",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.2",
                        "rootCode": "null",
                        "name": "Prazo Médio de Recebimentos",
                        "value": 51583.7625,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.3",
                        "rootCode": "null",
                        "name": "Prazo Médio de Pagamentos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.4",
                        "rootCode": "null",
                        "name": "Ciclo Financeiro",
                        "value": 51583.7625,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.5",
                        "rootCode": "null",
                        "name": "Ciclo do Ativo",
                        "value": -0.005383706935626373,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    }
                ]
            },
            {
                "id": "663b5f01916a520b483237f4",
                "organizationId": "00000000000",
                "cnpj": "01106869000188",
                "traceabilityId": "663b5f01916a520b483237f1",
                "endDate": "2022-12-31",
                "created": "2024-05-08T08:16:17.809",
                "source": "SPED",
                "analysisType": "INDIVIDUAL",
                "actives": [
                    {
                        "code": "1",
                        "rootCode": null,
                        "name": "ATIVO TOTAL",
                        "value": 227478270.60000002,
                        "percentVA": 100,
                        "percentHA": -88,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1",
                        "rootCode": "1",
                        "name": "ATIVO CIRCULANTE",
                        "value": 146490183.36,
                        "percentVA": 64,
                        "percentHA": -89,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1",
                        "rootCode": "1.1",
                        "name": "Disponibilidades",
                        "value": 917763.1900000001,
                        "percentVA": 0,
                        "percentHA": -97,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.1",
                        "rootCode": "1.1.1",
                        "name": "Caixa e Bancos",
                        "value": -885115.86,
                        "percentVA": 0,
                        "percentHA": -103,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.2",
                        "rootCode": "1.1.1",
                        "name": "Aplicações Financeiras",
                        "value": 1802879.05,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2",
                        "rootCode": "1.1",
                        "name": "Clientes",
                        "value": 49932991.42,
                        "percentVA": 22,
                        "percentHA": -94,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.1",
                        "rootCode": "1.1.2",
                        "name": "Clientes CP",
                        "value": 50695135.84,
                        "percentVA": 22,
                        "percentHA": -93,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.2",
                        "rootCode": "1.1.2",
                        "name": "Provisão para Dev. Duvidosos CP",
                        "value": -762144.42,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3",
                        "rootCode": "1.1",
                        "name": "Estoques",
                        "value": 78690880.58,
                        "percentVA": 35,
                        "percentHA": -82,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3.1",
                        "rootCode": "1.1.3",
                        "name": "Estoques",
                        "value": 78690880.58,
                        "percentVA": 35,
                        "percentHA": -82,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4",
                        "rootCode": "1.1",
                        "name": "Outros Créditos",
                        "value": 16948548.17,
                        "percentVA": 7,
                        "percentHA": -79,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.1",
                        "rootCode": "1.1.4",
                        "name": "Impostos a Recuperar CP",
                        "value": 13403618.07,
                        "percentVA": 6,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.2",
                        "rootCode": "1.1.4",
                        "name": "Adiantamentos a Fornecedores",
                        "value": 1209224.39,
                        "percentVA": 1,
                        "percentHA": -97,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.3",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos Ativo Cíclico",
                        "value": 1080180.23,
                        "percentVA": 0,
                        "percentHA": -9,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.4",
                        "rootCode": "1.1.4",
                        "name": "Valores Mobiliários",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.5",
                        "rootCode": "1.1.4",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.6",
                        "rootCode": "1.1.4",
                        "name": "IR Diferido de Curto Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.7",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos CP",
                        "value": 1255525.48,
                        "percentVA": 1,
                        "percentHA": -97,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2",
                        "rootCode": "1",
                        "name": "REALIZÁVEL LONGO PRAZO",
                        "value": 13895428.18,
                        "percentVA": 6,
                        "percentHA": -90,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1",
                        "rootCode": "1.2",
                        "name": "Clientes LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1.1",
                        "rootCode": "1.2.1",
                        "name": "Clientes LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2",
                        "rootCode": "1.2",
                        "name": "Outros Créditos",
                        "value": 13895428.18,
                        "percentVA": 6,
                        "percentHA": -89,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.1",
                        "rootCode": "1.2.2",
                        "name": "Partes Relacionadas LP",
                        "value": 120052.99,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.2",
                        "rootCode": "1.2.2",
                        "name": "IR Diferido de Longo Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.3",
                        "rootCode": "1.2.2",
                        "name": "Impostos a Recuperar LP",
                        "value": 1850950.38,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.4",
                        "rootCode": "1.2.2",
                        "name": "Outros Créditos LP",
                        "value": 11924424.81,
                        "percentVA": 5,
                        "percentHA": -91,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3",
                        "rootCode": "1",
                        "name": "PERMANENTE",
                        "value": 67092659.059999995,
                        "percentVA": 29,
                        "percentHA": -83,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1",
                        "rootCode": "1.3",
                        "name": "Investimentos",
                        "value": 11269153.8,
                        "percentVA": 5,
                        "percentHA": -59,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1.1",
                        "rootCode": "1.3.1",
                        "name": "Investimentos",
                        "value": 11269153.8,
                        "percentVA": 5,
                        "percentHA": -59,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2",
                        "rootCode": "1.3",
                        "name": "Imobilizado",
                        "value": 55775429.08,
                        "percentVA": 25,
                        "percentHA": -84,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2.1",
                        "rootCode": "1.3.2",
                        "name": "Imobilizado",
                        "value": 55775429.08,
                        "percentVA": 25,
                        "percentHA": -84,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3",
                        "rootCode": "1.3",
                        "name": "Intangível",
                        "value": 48076.18,
                        "percentVA": 0,
                        "percentHA": -98,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3.1",
                        "rootCode": "1.3.3",
                        "name": "Intangível",
                        "value": 48076.18,
                        "percentVA": 0,
                        "percentHA": -98,
                        "sheet": true,
                        "type": "ACTIVE"
                    }
                ],
                "relatedTraceabilities": [
                    {
                        "id": "663b62cd916a520b483237fc",
                        "endDate": "2022-12-31"
                    }
                ],
                "passives": [
                    {
                        "code": "2",
                        "rootCode": null,
                        "name": "PASSIVO TOTAL",
                        "value": 227478270.6,
                        "percentVA": 100,
                        "percentHA": -83,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1",
                        "rootCode": "2",
                        "name": "PASSIVO CIRCULANTE",
                        "value": 131292913.43,
                        "percentVA": 58,
                        "percentHA": -85,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1",
                        "rootCode": "2.1",
                        "name": "Obrigações Financeiras CP",
                        "value": 97331317.2,
                        "percentVA": 43,
                        "percentHA": -74,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.1",
                        "rootCode": "2.1.1",
                        "name": "Duplicatas Descontadas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.2",
                        "rootCode": "2.1.1",
                        "name": "Empréstimos e Financiamentos CP",
                        "value": 97331317.2,
                        "percentVA": 43,
                        "percentHA": -74,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.3",
                        "rootCode": "2.1.1",
                        "name": "Outras Obrigações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2",
                        "rootCode": "2.1",
                        "name": "Obrigações Operacionais CP",
                        "value": 33961596.23,
                        "percentVA": 15,
                        "percentHA": -93,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.1",
                        "rootCode": "2.1.2",
                        "name": "Fornecedores CP",
                        "value": 24909884.01,
                        "percentVA": 11,
                        "percentHA": -87,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.2",
                        "rootCode": "2.1.2",
                        "name": "Adiantamentos de Clientes",
                        "value": 206764.04,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.3",
                        "rootCode": "2.1.2",
                        "name": "Salários e Encargos",
                        "value": 1969919.95,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.4",
                        "rootCode": "2.1.2",
                        "name": "Tributos e Impostos CP",
                        "value": 2176424.66,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.5",
                        "rootCode": "2.1.2",
                        "name": "Outras Obrigações Operacionais",
                        "value": 1014011.68,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.6",
                        "rootCode": "2.1.2",
                        "name": "Partes Relacionadas CP",
                        "value": 3684591.89,
                        "percentVA": 2,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.7",
                        "rootCode": "2.1.2",
                        "name": "Provisões CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2",
                        "rootCode": "2",
                        "name": "EXIGÍVEL LONGO PRAZO",
                        "value": 37193882.23,
                        "percentVA": 16,
                        "percentHA": -86,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1",
                        "rootCode": "2.2",
                        "name": "Obrigações LP",
                        "value": 37193882.23,
                        "percentVA": 16,
                        "percentHA": -86,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.1",
                        "rootCode": "2.2.1",
                        "name": "Empréstimos e Financiamentos LP",
                        "value": 14513261,
                        "percentVA": 6,
                        "percentHA": -89,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.2",
                        "rootCode": "2.2.1",
                        "name": "Fornecedores LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.3",
                        "rootCode": "2.2.1",
                        "name": "Tributos e Impostos LP",
                        "value": 13976416.9,
                        "percentVA": 6,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.4",
                        "rootCode": "2.2.1",
                        "name": "Partes Relacionadas LP",
                        "value": 2478175.98,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.5",
                        "rootCode": "2.2.1",
                        "name": "Provisões LP",
                        "value": 4307208.06,
                        "percentVA": 2,
                        "percentHA": -96,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.6",
                        "rootCode": "2.2.1",
                        "name": "Outras Obrigações LP",
                        "value": 1918820.29,
                        "percentVA": 1,
                        "percentHA": -80,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3",
                        "rootCode": "2",
                        "name": "RESULTADO DE EXERCÍCIO FUTURO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1",
                        "rootCode": "2.3",
                        "name": "Resultado Exercício Futuro",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1.1",
                        "rootCode": "2.3.1",
                        "name": "Receitas Diferidas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4",
                        "rootCode": "2",
                        "name": "PATRIMÔNIO LÍQUIDO",
                        "value": 58991474.940000005,
                        "percentVA": 26,
                        "percentHA": -71,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1",
                        "rootCode": "2.4",
                        "name": "Patrimônio Líquido",
                        "value": 58991474.940000005,
                        "percentVA": 26,
                        "percentHA": -71,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.1",
                        "rootCode": "2.4.1",
                        "name": "Capital Subscrito",
                        "value": 38000000,
                        "percentVA": 17,
                        "percentHA": 7,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.2",
                        "rootCode": "2.4.1",
                        "name": "Capital a Integralizar",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.3",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Capital",
                        "value": 15437019.56,
                        "percentVA": 7,
                        "percentHA": -88,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.4",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Lucros",
                        "value": 5554455.38,
                        "percentVA": 2,
                        "percentHA": -44,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.5",
                        "rootCode": "2.4.1",
                        "name": "Prejuízos Acumulados",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.6",
                        "rootCode": "2.4.1",
                        "name": "(-) Ações em tesouraria",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.7",
                        "rootCode": "2.4.1",
                        "name": "Ajuste de Avaliação Patrimonial",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.8",
                        "rootCode": "2.4.1",
                        "name": "Resultado do Exercício",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.9",
                        "rootCode": "2.4.1",
                        "name": "Reserva de Reavaliação",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    }
                ],
                "demonstrations": [
                    {
                        "code": "3",
                        "rootCode": null,
                        "name": "DRE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL BRUTA",
                        "value": 317232289.88,
                        "percentVA": 100,
                        "percentHA": 5586,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1.1",
                        "rootCode": null,
                        "name": "Deduções da Receita",
                        "value": -58686813.39,
                        "percentVA": -18,
                        "percentHA": 277,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL LÍQUIDA",
                        "value": 258545476.49,
                        "percentVA": 82,
                        "percentHA": -2687,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2.1",
                        "rootCode": null,
                        "name": "Custo Produtos Vendidos",
                        "value": -230669629.78,
                        "percentVA": -73,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL BRUTO",
                        "value": 27875846.71000001,
                        "percentVA": 9,
                        "percentHA": -379,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1",
                        "rootCode": null,
                        "name": "Despesas Operacionais",
                        "value": -14483473.399999999,
                        "percentVA": -5,
                        "percentHA": -94,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.1",
                        "rootCode": null,
                        "name": "Despesas Comerciais e Administrativas",
                        "value": -14149826.87,
                        "percentVA": -4,
                        "percentHA": -94,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.2",
                        "rootCode": null,
                        "name": "Despesas de Depreciação / Amortização",
                        "value": -333646.53,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4",
                        "rootCode": null,
                        "name": "EBITDA",
                        "value": 13726019.84000001,
                        "percentVA": 4,
                        "percentHA": -105,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1",
                        "rootCode": null,
                        "name": "Resultado Financeiro",
                        "value": -9357925.59,
                        "percentVA": -3,
                        "percentHA": -202,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.1",
                        "rootCode": null,
                        "name": "Receitas Financeiras",
                        "value": 1147523.07,
                        "percentVA": 0,
                        "percentHA": -98,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.2",
                        "rootCode": null,
                        "name": "Despesas Financeiras",
                        "value": -13699331.28,
                        "percentVA": -4,
                        "percentHA": -70,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.3",
                        "rootCode": null,
                        "name": "Variações Monetárias e Cambiais",
                        "value": 3193882.62,
                        "percentVA": 1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL",
                        "value": 4034447.72000001,
                        "percentVA": 1,
                        "percentHA": -102,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1",
                        "rootCode": null,
                        "name": "Resultado Não Operacional",
                        "value": -1809259.6300000001,
                        "percentVA": -1,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.1",
                        "rootCode": null,
                        "name": "Receitas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.2",
                        "rootCode": null,
                        "name": "Despesas Não Operacionais",
                        "value": -3071844.77,
                        "percentVA": -1,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.3",
                        "rootCode": null,
                        "name": "Resultado de equivalência patrimonial",
                        "value": 1262585.14,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3",
                        "rootCode": null,
                        "name": "LUCRO ANTES DO IR",
                        "value": 2225188.09000001,
                        "percentVA": 1,
                        "percentHA": -101,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1",
                        "rootCode": null,
                        "name": "Impostos",
                        "value": -2225188.09,
                        "percentVA": -1,
                        "percentHA": -80,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.1",
                        "rootCode": null,
                        "name": "Provisões para IR e CSLL",
                        "value": -1642410.4,
                        "percentVA": -1,
                        "percentHA": -85,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.2",
                        "rootCode": null,
                        "name": "Provisão para IR e CSLL - diferido",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.3",
                        "rootCode": null,
                        "name": "Reversão JCP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.4",
                        "rootCode": null,
                        "name": "Participações nos Lucros",
                        "value": -582777.69,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "5",
                        "rootCode": null,
                        "name": "RESULTADO LÍQUIDO DO EXERCÍCIO",
                        "value": 1.0244548320770264e-8,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    }
                ],
                "indexesAndIndicators": [
                    {
                        "code": "10",
                        "rootCode": "null",
                        "name": "CAPITAL DE GIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico",
                        "value": 145079039.11,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.2",
                        "rootCode": "null",
                        "name": "Passivo Circulante Cíclico",
                        "value": 33961596.23,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.3",
                        "rootCode": "null",
                        "name": "Necessidade de Capital de Giro",
                        "value": 111117442.88000003,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.4",
                        "rootCode": "null",
                        "name": "Saldo de Terouraria",
                        "value": -95920172.95000002,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.5",
                        "rootCode": "null",
                        "name": "Relação Necessidade/Receita Op. Líquida",
                        "value": 42.97791026496564,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.6",
                        "rootCode": "null",
                        "name": "Saldo em Tesouraria Sobre Vendas",
                        "value": -30.236573012880847,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11",
                        "rootCode": "null",
                        "name": "DEMAIS ÍNDICES",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.1",
                        "rootCode": "null",
                        "name": "Capital Circulante Líquido",
                        "value": 15197269.930000007,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.2",
                        "rootCode": "null",
                        "name": "Dívida Líquida",
                        "value": 110926815.01,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.3",
                        "rootCode": "null",
                        "name": "Dívida Líquida/EBITDA",
                        "value": 8.081498956218901,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6",
                        "rootCode": "null",
                        "name": "ÍNDICES DE LIQUIDEZ",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.1",
                        "rootCode": "null",
                        "name": "Liquidez Geral",
                        "value": 0.9519,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.2",
                        "rootCode": "null",
                        "name": "Liquidez Corrente",
                        "value": 1.1157508774310394,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.3",
                        "rootCode": "null",
                        "name": "Liquidez Seca",
                        "value": 0.5164,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.4",
                        "rootCode": "null",
                        "name": "Solvência Geral",
                        "value": 1.3501,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7",
                        "rootCode": "null",
                        "name": "ESTRUTURA DE CAPITAL",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.1",
                        "rootCode": "null",
                        "name": "Participação de Capital de Terceiros",
                        "value": 285.6121,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.2",
                        "rootCode": "null",
                        "name": "Endividamento Geral",
                        "value": 74.0672,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.3",
                        "rootCode": "null",
                        "name": "Endividamento Oneroso",
                        "value": 189.5945,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.4",
                        "rootCode": "null",
                        "name": "Composição do Endividamento",
                        "value": 77.9247,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.5",
                        "rootCode": "null",
                        "name": "Nível de Desconto de Duplicatas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.6",
                        "rootCode": "null",
                        "name": "Imobilização do Patrimônio Líquido",
                        "value": 113.7328048302567,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8",
                        "rootCode": "null",
                        "name": "RENTABILIDADE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.1",
                        "rootCode": "null",
                        "name": "Margem Bruta",
                        "value": 3.2293523224402807e-15,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.2",
                        "rootCode": "null",
                        "name": "Margem Líquida",
                        "value": 3.9623777061775444e-15,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.3",
                        "rootCode": "null",
                        "name": "Retorno Sobre Ativo",
                        "value": 4.503528312286309e-15,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.4",
                        "rootCode": "null",
                        "name": "Retorno Sobre PL",
                        "value": 1.7366150500881617e-14,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9",
                        "rootCode": "null",
                        "name": "CICLO FINANCEIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.1",
                        "rootCode": "null",
                        "name": "Prazo Médio de Estoques",
                        "value": 122.8108,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.2",
                        "rootCode": "null",
                        "name": "Prazo Médio de Recebimentos",
                        "value": 58.3286,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.3",
                        "rootCode": "null",
                        "name": "Prazo Médio de Pagamentos",
                        "value": 45.2465,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.4",
                        "rootCode": "null",
                        "name": "Ciclo Financeiro",
                        "value": 135.8929,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.5",
                        "rootCode": "null",
                        "name": "Ciclo do Ativo",
                        "value": 1.1365721913045,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    }
                ]
            },
            {
                "id": "663b62cd916a520b483237ff",
                "organizationId": "00000000000",
                "cnpj": "01106869000188",
                "traceabilityId": "663b62cd916a520b483237fd",
                "endDate": "2023-12-31",
                "created": "2024-05-08T08:32:29.9",
                "source": "OCR",
                "analysisType": "INDIVIDUAL",
                "actives": [
                    {
                        "code": "1",
                        "rootCode": null,
                        "name": "ATIVO TOTAL",
                        "value": 1856117935,
                        "percentVA": 100,
                        "percentHA": 716,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1",
                        "rootCode": "1",
                        "name": "ATIVO CIRCULANTE",
                        "value": 1330462883,
                        "percentVA": 72,
                        "percentHA": 808,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1",
                        "rootCode": "1.1",
                        "name": "Disponibilidades",
                        "value": 34517096,
                        "percentVA": 2,
                        "percentHA": 3661,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.1",
                        "rootCode": "1.1.1",
                        "name": "Caixa e Bancos",
                        "value": 34517096,
                        "percentVA": 2,
                        "percentHA": -4000,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.1.2",
                        "rootCode": "1.1.1",
                        "name": "Aplicações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2",
                        "rootCode": "1.1",
                        "name": "Clientes",
                        "value": 779489020,
                        "percentVA": 42,
                        "percentHA": 1461,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.1",
                        "rootCode": "1.1.2",
                        "name": "Clientes CP",
                        "value": 779489020,
                        "percentVA": 42,
                        "percentHA": 1438,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.2.2",
                        "rootCode": "1.1.2",
                        "name": "Provisão para Dev. Duvidosos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3",
                        "rootCode": "1.1",
                        "name": "Estoques",
                        "value": 436152596,
                        "percentVA": 23,
                        "percentHA": 454,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.3.1",
                        "rootCode": "1.1.3",
                        "name": "Estoques",
                        "value": 436152596,
                        "percentVA": 23,
                        "percentHA": 454,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4",
                        "rootCode": "1.1",
                        "name": "Outros Créditos",
                        "value": 80304171,
                        "percentVA": 4,
                        "percentHA": 374,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.1",
                        "rootCode": "1.1.4",
                        "name": "Impostos a Recuperar CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.2",
                        "rootCode": "1.1.4",
                        "name": "Adiantamentos a Fornecedores",
                        "value": 35351115,
                        "percentVA": 2,
                        "percentHA": 2823,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.3",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos Ativo Cíclico",
                        "value": 1187139,
                        "percentVA": 0,
                        "percentHA": 10,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.4",
                        "rootCode": "1.1.4",
                        "name": "Valores Mobiliários",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.5",
                        "rootCode": "1.1.4",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.6",
                        "rootCode": "1.1.4",
                        "name": "IR Diferido de Curto Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.1.4.7",
                        "rootCode": "1.1.4",
                        "name": "Outros Créditos CP",
                        "value": 43765917,
                        "percentVA": 2,
                        "percentHA": 3386,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2",
                        "rootCode": "1",
                        "name": "REALIZÁVEL LONGO PRAZO",
                        "value": 138115652,
                        "percentVA": 7,
                        "percentHA": 894,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1",
                        "rootCode": "1.2",
                        "name": "Clientes LP",
                        "value": 8953103,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.1.1",
                        "rootCode": "1.2.1",
                        "name": "Clientes LP",
                        "value": 8953103,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2",
                        "rootCode": "1.2",
                        "name": "Outros Créditos",
                        "value": 129162549,
                        "percentVA": 7,
                        "percentHA": 830,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.1",
                        "rootCode": "1.2.2",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.2",
                        "rootCode": "1.2.2",
                        "name": "IR Diferido de Longo Prazo",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.3",
                        "rootCode": "1.2.2",
                        "name": "Impostos a Recuperar LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.2.2.4",
                        "rootCode": "1.2.2",
                        "name": "Outros Créditos LP",
                        "value": 129162549,
                        "percentVA": 7,
                        "percentHA": 983,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3",
                        "rootCode": "1",
                        "name": "PERMANENTE",
                        "value": 387539400,
                        "percentVA": 21,
                        "percentHA": 478,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1",
                        "rootCode": "1.3",
                        "name": "Investimentos",
                        "value": 27485397,
                        "percentVA": 1,
                        "percentHA": 144,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.1.1",
                        "rootCode": "1.3.1",
                        "name": "Investimentos",
                        "value": 27485397,
                        "percentVA": 1,
                        "percentHA": 144,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2",
                        "rootCode": "1.3",
                        "name": "Imobilizado",
                        "value": 357214217,
                        "percentVA": 19,
                        "percentHA": 540,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.2.1",
                        "rootCode": "1.3.2",
                        "name": "Imobilizado",
                        "value": 357214217,
                        "percentVA": 19,
                        "percentHA": 540,
                        "sheet": true,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3",
                        "rootCode": "1.3",
                        "name": "Intangível",
                        "value": 2839786,
                        "percentVA": 0,
                        "percentHA": 5807,
                        "sheet": false,
                        "type": "ACTIVE"
                    },
                    {
                        "code": "1.3.3.1",
                        "rootCode": "1.3.3",
                        "name": "Intangível",
                        "value": 2839786,
                        "percentVA": 0,
                        "percentHA": 5807,
                        "sheet": true,
                        "type": "ACTIVE"
                    }
                ],
                "relatedTraceabilities": [],
                "passives": [
                    {
                        "code": "2",
                        "rootCode": null,
                        "name": "PASSIVO TOTAL",
                        "value": 1327056872,
                        "percentVA": 100,
                        "percentHA": 483,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1",
                        "rootCode": "2",
                        "name": "PASSIVO CIRCULANTE",
                        "value": 858086275,
                        "percentVA": 65,
                        "percentHA": 554,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1",
                        "rootCode": "2.1",
                        "name": "Obrigações Financeiras CP",
                        "value": 370384618,
                        "percentVA": 28,
                        "percentHA": 281,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.1",
                        "rootCode": "2.1.1",
                        "name": "Duplicatas Descontadas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.2",
                        "rootCode": "2.1.1",
                        "name": "Empréstimos e Financiamentos CP",
                        "value": 370384618,
                        "percentVA": 28,
                        "percentHA": 281,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.1.3",
                        "rootCode": "2.1.1",
                        "name": "Outras Obrigações Financeiras",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2",
                        "rootCode": "2.1",
                        "name": "Obrigações Operacionais CP",
                        "value": 487701657,
                        "percentVA": 37,
                        "percentHA": 1336,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.1",
                        "rootCode": "2.1.2",
                        "name": "Fornecedores CP",
                        "value": 189409934,
                        "percentVA": 14,
                        "percentHA": 660,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.2",
                        "rootCode": "2.1.2",
                        "name": "Adiantamentos de Clientes",
                        "value": 78696414,
                        "percentVA": 6,
                        "percentHA": 37961,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.3",
                        "rootCode": "2.1.2",
                        "name": "Salários e Encargos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.4",
                        "rootCode": "2.1.2",
                        "name": "Tributos e Impostos CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.5",
                        "rootCode": "2.1.2",
                        "name": "Outras Obrigações Operacionais",
                        "value": 219595309,
                        "percentVA": 17,
                        "percentHA": 21556,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.6",
                        "rootCode": "2.1.2",
                        "name": "Partes Relacionadas CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.1.2.7",
                        "rootCode": "2.1.2",
                        "name": "Provisões CP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2",
                        "rootCode": "2",
                        "name": "EXIGÍVEL LONGO PRAZO",
                        "value": 265608343,
                        "percentVA": 20,
                        "percentHA": 614,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1",
                        "rootCode": "2.2",
                        "name": "Obrigações LP",
                        "value": 265608343,
                        "percentVA": 20,
                        "percentHA": 614,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.1",
                        "rootCode": "2.2.1",
                        "name": "Empréstimos e Financiamentos LP",
                        "value": 130408287,
                        "percentVA": 10,
                        "percentHA": 799,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.2",
                        "rootCode": "2.2.1",
                        "name": "Fornecedores LP",
                        "value": 2827795,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.3",
                        "rootCode": "2.2.1",
                        "name": "Tributos e Impostos LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.4",
                        "rootCode": "2.2.1",
                        "name": "Partes Relacionadas LP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.5",
                        "rootCode": "2.2.1",
                        "name": "Provisões LP",
                        "value": 123002289,
                        "percentVA": 9,
                        "percentHA": 2756,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.2.1.6",
                        "rootCode": "2.2.1",
                        "name": "Outras Obrigações LP",
                        "value": 9369972,
                        "percentVA": 1,
                        "percentHA": 388,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3",
                        "rootCode": "2",
                        "name": "RESULTADO DE EXERCÍCIO FUTURO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1",
                        "rootCode": "2.3",
                        "name": "Resultado Exercício Futuro",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.3.1.1",
                        "rootCode": "2.3.1",
                        "name": "Receitas Diferidas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4",
                        "rootCode": "2",
                        "name": "PATRIMÔNIO LÍQUIDO",
                        "value": 203362254,
                        "percentVA": 15,
                        "percentHA": 245,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1",
                        "rootCode": "2.4",
                        "name": "Patrimônio Líquido",
                        "value": 203362254,
                        "percentVA": 15,
                        "percentHA": 245,
                        "sheet": false,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.1",
                        "rootCode": "2.4.1",
                        "name": "Capital Subscrito",
                        "value": 35379969,
                        "percentVA": 3,
                        "percentHA": -7,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.2",
                        "rootCode": "2.4.1",
                        "name": "Capital a Integralizar",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.3",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Capital",
                        "value": 126568377,
                        "percentVA": 10,
                        "percentHA": 720,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.4",
                        "rootCode": "2.4.1",
                        "name": "Reservas de Lucros",
                        "value": 10000000,
                        "percentVA": 1,
                        "percentHA": 80,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.5",
                        "rootCode": "2.4.1",
                        "name": "Prejuízos Acumulados",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.6",
                        "rootCode": "2.4.1",
                        "name": "(-) Ações em tesouraria",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.7",
                        "rootCode": "2.4.1",
                        "name": "Ajuste de Avaliação Patrimonial",
                        "value": 31413908,
                        "percentVA": 2,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.8",
                        "rootCode": "2.4.1",
                        "name": "Resultado do Exercício",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    },
                    {
                        "code": "2.4.1.9",
                        "rootCode": "2.4.1",
                        "name": "Reserva de Reavaliação",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "PASSIVE"
                    }
                ],
                "demonstrations": [
                    {
                        "code": "3",
                        "rootCode": null,
                        "name": "DRE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL BRUTA",
                        "value": 5578914,
                        "percentVA": 100,
                        "percentHA": -98,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.1.1",
                        "rootCode": null,
                        "name": "Deduções da Receita",
                        "value": -15571709,
                        "percentVA": -279,
                        "percentHA": -73,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2",
                        "rootCode": null,
                        "name": "RECEITA OPERACIONAL LÍQUIDA",
                        "value": -9992795,
                        "percentVA": -179,
                        "percentHA": -104,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.2.1",
                        "rootCode": null,
                        "name": "Custo Produtos Vendidos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL BRUTO",
                        "value": -9992795,
                        "percentVA": -179,
                        "percentHA": -136,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1",
                        "rootCode": null,
                        "name": "Despesas Operacionais",
                        "value": -249352180,
                        "percentVA": -4470,
                        "percentHA": 1622,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.1",
                        "rootCode": null,
                        "name": "Despesas Comerciais e Administrativas",
                        "value": -249352180,
                        "percentVA": -4470,
                        "percentHA": 1662,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "3.3.1.2",
                        "rootCode": null,
                        "name": "Despesas de Depreciação / Amortização",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4",
                        "rootCode": null,
                        "name": "EBITDA",
                        "value": -259344975,
                        "percentVA": -4649,
                        "percentHA": -1989,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1",
                        "rootCode": null,
                        "name": "Resultado Financeiro",
                        "value": 9206548,
                        "percentVA": 165,
                        "percentHA": -198,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.1",
                        "rootCode": null,
                        "name": "Receitas Financeiras",
                        "value": 54220000,
                        "percentVA": 972,
                        "percentHA": 4625,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.2",
                        "rootCode": null,
                        "name": "Despesas Financeiras",
                        "value": -45013452,
                        "percentVA": -807,
                        "percentHA": 229,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.1.3",
                        "rootCode": null,
                        "name": "Variações Monetárias e Cambiais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2",
                        "rootCode": null,
                        "name": "RESULTADO OPERACIONAL",
                        "value": -250138427,
                        "percentVA": -4484,
                        "percentHA": -6300,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1",
                        "rootCode": null,
                        "name": "Resultado Não Operacional",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.1",
                        "rootCode": null,
                        "name": "Receitas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.2",
                        "rootCode": null,
                        "name": "Despesas Não Operacionais",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.2.1.3",
                        "rootCode": null,
                        "name": "Resultado de equivalência patrimonial",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3",
                        "rootCode": null,
                        "name": "LUCRO ANTES DO IR",
                        "value": -250138427,
                        "percentVA": -4484,
                        "percentHA": -11341,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1",
                        "rootCode": null,
                        "name": "Impostos",
                        "value": -11018506,
                        "percentVA": -198,
                        "percentHA": 395,
                        "sheet": false,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.1",
                        "rootCode": null,
                        "name": "Provisões para IR e CSLL",
                        "value": -11018506,
                        "percentVA": -198,
                        "percentHA": 571,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.2",
                        "rootCode": null,
                        "name": "Provisão para IR e CSLL - diferido",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.3",
                        "rootCode": null,
                        "name": "Reversão JCP",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "4.3.1.4",
                        "rootCode": null,
                        "name": "Participações nos Lucros",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": -100,
                        "sheet": true,
                        "type": "DRE"
                    },
                    {
                        "code": "5",
                        "rootCode": null,
                        "name": "RESULTADO LÍQUIDO DO EXERCÍCIO",
                        "value": -261156933,
                        "percentVA": -4681,
                        "percentHA": -2549228378087871000,
                        "sheet": false,
                        "type": "DRE"
                    }
                ],
                "indexesAndIndicators": [
                    {
                        "code": "10",
                        "rootCode": "null",
                        "name": "CAPITAL DE GIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.1",
                        "rootCode": "null",
                        "name": "Ativo Circulante Cíclico",
                        "value": 1252179870,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.2",
                        "rootCode": "null",
                        "name": "Passivo Circulante Cíclico",
                        "value": 487701657,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.3",
                        "rootCode": "null",
                        "name": "Necessidade de Capital de Giro",
                        "value": 764478213,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.4",
                        "rootCode": "null",
                        "name": "Saldo de Terouraria",
                        "value": -292101605,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.5",
                        "rootCode": "null",
                        "name": "Relação Necessidade/Receita Op. Líquida",
                        "value": -7650.294166947286,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "10.6",
                        "rootCode": "null",
                        "name": "Saldo em Tesouraria Sobre Vendas",
                        "value": -5235.81480194891,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11",
                        "rootCode": "null",
                        "name": "DEMAIS ÍNDICES",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.1",
                        "rootCode": "null",
                        "name": "Capital Circulante Líquido",
                        "value": 472376608,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.2",
                        "rootCode": "null",
                        "name": "Dívida Líquida",
                        "value": 466275809,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "11.3",
                        "rootCode": "null",
                        "name": "Dívida Líquida/EBITDA",
                        "value": -1.797897988962385,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6",
                        "rootCode": "null",
                        "name": "ÍNDICES DE LIQUIDEZ",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.1",
                        "rootCode": "null",
                        "name": "Liquidez Geral",
                        "value": 1.3069,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.2",
                        "rootCode": "null",
                        "name": "Liquidez Corrente",
                        "value": 1.5505001324021876,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.3",
                        "rootCode": "null",
                        "name": "Liquidez Seca",
                        "value": 1.0422,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "6.4",
                        "rootCode": "null",
                        "name": "Solvência Geral",
                        "value": 1.6518,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7",
                        "rootCode": "null",
                        "name": "ESTRUTURA DE CAPITAL",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.1",
                        "rootCode": "null",
                        "name": "Participação de Capital de Terceiros",
                        "value": 552.5581,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.2",
                        "rootCode": "null",
                        "name": "Endividamento Geral",
                        "value": 84.6757,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.3",
                        "rootCode": "null",
                        "name": "Endividamento Oneroso",
                        "value": 246.2566,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.4",
                        "rootCode": "null",
                        "name": "Composição do Endividamento",
                        "value": 76.3629,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.5",
                        "rootCode": "null",
                        "name": "Nível de Desconto de Duplicatas",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "7.6",
                        "rootCode": "null",
                        "name": "Imobilização do Patrimônio Líquido",
                        "value": 190.56604280163023,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8",
                        "rootCode": "null",
                        "name": "RENTABILIDADE",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.1",
                        "rootCode": "null",
                        "name": "Margem Bruta",
                        "value": -4681.142835326014,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.2",
                        "rootCode": "null",
                        "name": "Margem Líquida",
                        "value": 2613.452322398288,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.3",
                        "rootCode": "null",
                        "name": "Retorno Sobre Ativo",
                        "value": -19.679407756384386,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "8.4",
                        "rootCode": "null",
                        "name": "Retorno Sobre PL",
                        "value": -128.41957042824671,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9",
                        "rootCode": "null",
                        "name": "CICLO FINANCEIRO",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": false,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.1",
                        "rootCode": "null",
                        "name": "Prazo Médio de Estoques",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.2",
                        "rootCode": "null",
                        "name": "Prazo Médio de Recebimentos",
                        "value": 51583.7625,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.3",
                        "rootCode": "null",
                        "name": "Prazo Médio de Pagamentos",
                        "value": 0,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.4",
                        "rootCode": "null",
                        "name": "Ciclo Financeiro",
                        "value": 51583.7625,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    },
                    {
                        "code": "9.5",
                        "rootCode": "null",
                        "name": "Ciclo do Ativo",
                        "value": -0.005383706935626373,
                        "percentVA": 0,
                        "percentHA": 0,
                        "sheet": true,
                        "type": "INDEXES_AND_INDICATORS"
                    }
                ]
            }
        ]
        return of(b);
    }
}
