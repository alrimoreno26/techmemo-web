import {Component, Input} from "@angular/core";
import {CommonModule, NgForOf} from "@angular/common";
import {PipesModule} from "../../core/pipes/pipes.module";

@Component({
    standalone: true,
    selector: 'app-print-nfe',
    imports: [CommonModule, NgForOf, PipesModule],
    styleUrls: ['./print-nfe.components.scss'],
    template: `
        <div class="areaNfce">
            <table class="mainNfce">
                <thead>
                    <tr>
                        <td id="companyLogo">
                            <div class="logo">
                                <img src="[url_logo]"/>
                            </div>
                        </td>
                        <td class="titMain">
                            <p>
                                <span class="label">CNPJ: [nl_company_cnpj_cpf]</span><span style="font-weight: bold">&nbsp;[ds_company_issuer_name]</span>
                            </p>
                            <p>[ds_company_address], [ds_company_neighborhood], [ds_company_city_name], [ds_company_uf]</p>
                            <p>Documento Auxiliar da Nota Fiscal de Consumidor Eletrônica</p>
                        </td>
                    </tr>
                </thead>
            </table>

            <table class="table-contingencia">
                <tr>
                    <td>
                        <div class="aviso-contingencia">
                            <h5>Emitida em Contingencia</h5>
                            <p>Pendente de autorização</p>
                        </div>
                    </td>
                </tr>
            </table>

            <table class="formPayment">
                <tr>
                    <td><strong>Código - Descrição</strong></td>
                    <td class="tdRight"><strong>Qtde</strong></td>
                    <td><strong>UN</strong></td>
                    <td class="tRight"><strong>Vl Unit.</strong></td>
                    <td class="tRight"><strong>Vl Total</strong></td>
                </tr>
                <tr *ngFor="let item of product">
                    <td>{{item.sabor}}</td>
                    <td class="tdRight">{{item.count}}</td>
                    <td>{{item.unit}}</td>
                    <td class="tdRight">{{item.unit_cost}}</td>
                    <td class="tdRight">{{item.unit === 'KILO' ? (item.unit_cost * item.count | currency: 'BR') : (item.unit_cost | currency: 'BR')}}</td>
                </tr>
            </table>


            <table class="descQt">
                <tr>
                    <td>Itens unitários<span class="td-text-right">{{product.length}}</span></td>
                </tr>
                <tr>
                    <td>Qtde total de itens <span class="td-text-right">{{totalProduct()}}</span></td>
                </tr>
                <tr>
                    <td>Valor total R$ <span class="td-text-right">{{total | currency: 'BR'}}</span></td>
                </tr>
<!--                <tr id="discount">-->
<!--                    <td>Desconto R$ <span class="td-text-right">[vl_discount]</span></td>-->
<!--                </tr>-->
<!--                <tr id="shipping">-->
<!--                    <td class="last">Frete R$ <span class="td-text-right">[vl_shipping]</span></td>-->
<!--                </tr>-->
                <tr>
                    <td class="last"><strong>Valor a Pagar R$ <span class="td-text-right">{{total | currency: 'BR'}}</span></strong></td>
                </tr>
            </table>

            <table class="valuePayment">
                <tr>
                    <td>FORMA PGTO. <span class="td-text-right">VALOR PAGO R$</span></td>
                </tr>
                [payment_forms]
                [payment_return_forms]
            </table>

            <table class="postTax">
                <tr>
                    <td><span id="url_consulta" class="text">Consulte pela Chave de Acesso em <br>[url_sefaz]</span></td>
                </tr>
                <tr>
                    <td>[ds_danfe]</td>
                </tr>
            </table>

            <table class="barcode">
                <tr class="section-info">
                    <td align="center" class="info-consumer">
                        <p><strong>CONSUMIDOR</strong> [consumer]</p>
                        <p><strong>NFCe nº [nl_invoice] Série [ds_invoice_serie] [dt_invoice_issue]</strong></p>
                        <p><strong>Via consumidor</strong></p>
                        <p><strong>Protocolo de autorização:</strong> [ds_protocol]</p>
                        <p><strong>Data de autorização:</strong> [dt_hr_invoice_issue]</p>
                        <div class="contingency-text">
                            <h5>Emitida em Contingencia</h5>
                            <p>Pendente de autorização</p>
                        </div>

                        <div id="qrCode" class="qrCode">QRCODE</div>
                    </td>
                </tr>
            </table>

            <table class="nfceFooter" id="stateFiscalMessage">
                <tr>
                    <td><p style="text-align: center">[state_fiscal_message]</p></td>
                </tr>
            </table>

            <table class="nfceFooter">
                <tr>
                    <td><p style="text-align: center">ApproximateTax</p></td>
                </tr>
            </table>

            <table class="nfceFooter">
                <tr>
                    <td><p style="text-align: center">[additional_information]</p></td>
                </tr>
            </table>

            <table class="nfceFooter">
                <tr><td style="text-align: center"><strong>Empresa de Software www.empresa.com</strong></td>
                </tr>
            </table>
        </div>
    `
})
export class PrintNfeComponents {

    @Input() product: any;
    @Input() total: any;

    totalProduct():number{
        return this.product.reduce((sumaTotal: any, item: { unit: string; count: any; }) =>
                sumaTotal + (item.unit === "KILO" ? item.count : 1),
            0
        );
    }
}
