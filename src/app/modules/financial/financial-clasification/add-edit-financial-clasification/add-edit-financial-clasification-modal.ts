import {Component, OnInit} from '@angular/core';
import {
    BaseModalStoreComponentDirective
} from "../../../../standalone/data-table/directives/base.modal.store.component.directive";
import {PaymentMethodService} from "../../service/payment-method.service";
import {TranslateModule} from "@ngx-translate/core";
import {DirectivesModule} from "../../../../core/directives/directives.module";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputSwitchModule} from "primeng/inputswitch";
import {FinancialClasificationService} from "../../service/financial-clasification.service";
import {SelectButtonModule} from "primeng/selectbutton";

@Component({
    standalone: true,
    selector: 'm-add-edit-financial-clasification',
    templateUrl: './add-edit-financial-clasification-modal.html',
    imports: [
        TranslateModule,
        DirectivesModule,
        ButtonModule,
        RippleModule,
        PaginatorModule,
        ReactiveFormsModule,
        InputTextModule,
        InputSwitchModule,
        SelectButtonModule
    ],
    styleUrls: ['./add-edit-financial-clasification-modal.scss']
})
export class AddEditFinancialClasificationModal extends BaseModalStoreComponentDirective implements OnInit {

    stateOptions: any[] = [
        {label: 'A pagar', value: 'EXPENSES'},
        {label: 'Renda', value: 'BILLINGS'}
    ];

    constructor(public financialClasificationService: FinancialClasificationService) {
        super(financialClasificationService);
    }

    ngOnInit() {
        const {data} = this.config;
        this.form = new FormGroup({
            name: new FormControl<string>(data?.name, Validators.required),
            type: new FormControl<string>(data?.type, Validators.required),
            code: new FormControl<string>(data?.code, Validators.required),
        });
        const dataArray = [
            { code: '1001', name: 'Vendas de Sorvetes', type: 'BILLING' },
            { code: '1002', name: 'Vendas de Bebidas', type: 'BILLING' },
            { code: '1003', name: 'Vendas de Açaí', type: 'BILLING' },
            { code: '1004', name: 'Vendas Bomboniere', type: 'BILLING' },
            { code: '1005', name: 'Vendas Diversos', type: 'BILLING' },
            { code: '1006', name: 'Receitas com Entregas', type: 'BILLING' },
            { code: '1007', name: 'Receitas Financeiras', type: 'BILLING' },
            { code: '1008', name: 'Receitas Não Operacionais', type: 'BILLING' },
            { code: '2001', name: 'Impostos sobre Serviços (ISS)', type: 'EXPENSES' },
            { code: '2002', name: 'Imposto sobre Circulação de Mercadorias e Serviços (ICMS)', type: 'EXPENSES' },
            { code: '4001', name: 'Custos de Sorvetes e Açaí', type: 'EXPENSES' },
            { code: '4002', name: 'Custos de Bebidas', type: 'EXPENSES' },
            { code: '4003', name: 'Custos Produtos Agregados Sorvetes e Açai', type: 'EXPENSES' },
            { code: '4004', name: 'Custos Bomboniere', type: 'EXPENSES' },
            { code: '4005', name: 'Custos Produtos Diversos', type: 'EXPENSES' },
            { code: '4006', name: 'Custos com Embalagens', type: 'EXPENSES' },
            { code: '4007', name: 'Custos com Entregas', type: 'EXPENSES' },
            { code: '6101', name: 'Salários', type: 'EXPENSES' },
            { code: '6102', name: 'Adiantamento de Salários', type: 'EXPENSES' },
            { code: '6103', name: 'Férias', type: 'EXPENSES' },
            { code: '6104', name: '13º Salário', type: 'EXPENSES' },
            { code: '6105', name: 'Rescisões Trabalhistas', type: 'EXPENSES' },
            { code: '6106', name: 'FGTS', type: 'EXPENSES' },
            { code: '6107', name: 'FGTS 13º Salário', type: 'EXPENSES' },
            { code: '6108', name: 'FGTS Rescisões Trabalhistas', type: 'EXPENSES' },
            { code: '6109', name: 'GPS - Guia da Previdência Social', type: 'EXPENSES' },
            { code: '6110', name: 'IRRF - Imposto de Renda', type: 'EXPENSES' },
            { code: '6111', name: 'Seguro de Vida Funcionários', type: 'EXPENSES' },
            { code: '6112', name: 'Saúde Ocupacional', type: 'EXPENSES' },
            { code: '6113', name: 'Benefícios', type: 'EXPENSES' },
            { code: '6114', name: 'Treinamentos', type: 'EXPENSES' },
            { code: '6115', name: 'Free Lance', type: 'EXPENSES' },
            { code: '6116', name: 'Despesas Diversas com Pessoal', type: 'EXPENSES' },
            { code: '6201', name: 'Aluguel', type: 'EXPENSES' },
            { code: '6202', name: 'Energia Elétrica', type: 'EXPENSES' },
            { code: '6203', name: 'Água', type: 'EXPENSES' },
            { code: '6204', name: 'Telefone / Internet', type: 'EXPENSES' },
            { code: '6205', name: 'Sistema Operacional', type: 'EXPENSES' },
            { code: '6206', name: 'Serviços Contábeis', type: 'EXPENSES' },
            { code: '6207', name: 'Seguro Predial', type: 'EXPENSES' },
            { code: '6208', name: 'Monitoramento', type: 'EXPENSES' },
            { code: '6209', name: 'Materias de Limpeza', type: 'EXPENSES' },
            { code: '6210', name: 'Materias de Escritório', type: 'EXPENSES' },
            { code: '6211', name: 'Utensílios de Cozinha', type: 'EXPENSES' },
            { code: '6212', name: 'Honorários Jurídicos', type: 'EXPENSES' },
            { code: '6213', name: 'Honorários Consultoria/Assessoria', type: 'EXPENSES' },
            { code: '6214', name: 'Tarifas Bancárias', type: 'EXPENSES' },
            { code: '6215', name: 'Despesas Diversas Administrativas', type: 'EXPENSES' },
            { code: '6301', name: 'Marketing Prestação de Serviços', type: 'EXPENSES' },
            { code: '6302', name: 'Marketing Serviços Gráficos', type: 'EXPENSES' },
            { code: '6303', name: 'Redes Sociais', type: 'EXPENSES' },
            { code: '6304', name: 'Despesas Diversas Marketing', type: 'EXPENSES' },
            { code: '6305', name: 'Taxas Transações com Cartões e Pix', type: 'EXPENSES' },
            { code: '6306', name: 'Mensalidade Máquina Cartões', type: 'EXPENSES' },
            { code: '6401', name: 'Manutenção Predial - Mão de Obra', type: 'EXPENSES' },
            { code: '6402', name: 'Manutenção Predial - Materiais', type: 'EXPENSES' },
            { code: '6403', name: 'Manutenção Freezer - Mão de Obra', type: 'EXPENSES' },
            { code: '6404', name: 'Manutenção Freezer - Materiais', type: 'EXPENSES' },
            { code: '6405', name: 'Manutenção Equipamento Eletrônico - Mão de Obra', type: 'EXPENSES' },
            { code: '6406', name: 'Manutenção Equipamento Eletrônico - Materiais', type: 'EXPENSES' },
            { code: '8101', name: 'Imposto Simples Nacional', type: 'EXPENSES' },
            { code: '1011', name: 'Máquinas e Equipamentos', type: 'EXPENSES' },
            { code: '1012', name: 'Móveis e Acessórios', type: 'EXPENSES' },
            { code: '1013', name: 'Reformas - Mão de Obra', type: 'EXPENSES' },
            { code: '1014', name: 'Reformas - Materias', type: 'EXPENSES' },
            { code: '1015', name: 'Outros Investimentos', type: 'EXPENSES' },
            { code: '1111', name: 'Juros Bancários', type: 'EXPENSES' },
            { code: '1112', name: 'IOF', type: 'EXPENSES' },
            { code: '1113', name: 'Empréstimos e Financiamentos', type: 'EXPENSES' },
            { code: '1211', name: 'Distribuição Sócio ', type: 'EXPENSES' }
        ];
        // dataArray.forEach((item) => {
        //     this.service.create({data: item})
        // })
    }

    override save(): void {
        !this.config.data ?
            this.service.create({data: this.form.value}) :
            this.service.update({data: {id: this.config.data.id, ...this.form.value}});
    }

}
