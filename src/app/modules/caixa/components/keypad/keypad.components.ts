import {Component, effect, EventEmitter, HostListener, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {CaixaService} from "../../services/caixa.service";
import {MessageServices} from "../../../../core/injects/message.services";
import {DialogService} from "primeng/dynamicdialog";
import {MPaymentMethodComponent} from "../modals/payment-method/payment-method.component";
import {PaymentStructureTO} from "../../../../core/models/financial";
import {MPartialPaymentComponent} from "../modals/partial-payment/partial-payment.component";
import {CreatePaymentTransactionTO} from "../../../../core/models/orders";
@Component({
    selector: 'app-keypad',
    templateUrl: './keypad.components.html'
})
export class KeypadComponents implements OnInit {
    @Input() totalPayment: number = 0;
    @Input() tableOrderClosed: boolean;
    @Output() confirmSell: EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>()

    decimal = false;
    pagamento: any = '0';
    divider = 1;

    amountPaid = 0;
    paymentValue = 0;

    remaining_amount = 0;

    disableAllFields = true;
    selectedPaymentMethod: PaymentStructureTO;

    paymentsDone: any[] = [];

    formPagamento: FormGroup;
    paymentByProduct: any[] = [];

    show: boolean = false;
    productsPagamento: any[] = [];

    constructor(private service: CaixaService,
                private messageService: MessageServices,
                private dialogService: DialogService) {
        effect(() => {
            if (this.service.selectedEntity$()) {
                let allPayments = this.service.selectedEntity$().flatMap((item: any) => item.payments);

                let result = allPayments.reduce((acc: any, item: any) => {
                    const key = item.paymentStructure.id;

                    // Inicializar el array de products si no existe
                    acc[key] = {
                        ...(acc[key] || {}),
                        ...item,
                        valueToPaid: (acc[key]?.valueToPaid || 0) + item.valueToPaid,
                        valuePaid: (acc[key]?.valuePaid || 0) + item.valuePaid,
                        valuePaidChange: (acc[key]?.valuePaidChange || 0) + item.valuePaidChange,
                        discount: (acc[key]?.discount || 0) + item.discount,
                        paymentStructure: key,
                        method: item.paymentStructure.description,
                        products: [...(acc[key]?.products || []), item.product],
                    };

                    // Calcular valuePaidChange
                    acc[key].valuePaidChange = acc[key].valueToPaid - acc[key].valuePaid;

                    return acc;
                }, {});

                this.paymentsDone = Object.values(result).map(({
                                                                   id,
                                                                   method,
                                                                   valueToPaid,
                                                                   valuePaid,
                                                                   valuePaidChange,
                                                                   discount,
                                                                   products
                                                               }: any) => ({
                    id,
                    method,
                    receita: valueToPaid,
                    payment: valuePaid,
                    paidChange: valuePaidChange,
                    discount,
                    products,
                }));
                this.pagamento = this.paymentsDone.reduce((sumaTotal: any, item: any) =>
                        sumaTotal + item.payment,
                    0
                ) || 0;
                this.remaining_amount = this.formPagamento.get('amountPaid')?.value;
            }
        });
    }

    initPagamento() {
        this.amountPaid = this.totalPayment;
        this.remaining_amount = this.totalPayment;
        let total = this.paymentsDone.reduce((sumaTotal: any, item: any) =>
                sumaTotal + item.payment,
            0
        ) || 0;
        this.pagamento = this.paymentsDone.length > 0 ? total : this.totalPayment;
        this.formPagamento = new FormGroup({
            amountPaid: new FormControl({value: this.totalPayment, disabled: true}),
            paymentValue: new FormControl({value: 0, disabled: true}),
            discount: new FormControl({value: 0, disabled: true}),
            paidChange: new FormControl({value: 0, disabled: true}),
        });

    }

    ngOnInit(): void {

        this.initPagamento()
        this.formPagamento.get('paymentValue')?.valueChanges.subscribe((value: any) => {
            if (this.selectedPaymentMethod.allowsChange) {
                this.formPagamento.get('paidChange')?.setValue(Number(this.amountPaid - value));
            }
            if (value > this.formPagamento.get('amountPaid')?.value) {
                this.formPagamento.get('paymentValue')?.setValue(this.formPagamento.get('amountPaid')?.value);
            }
        });
        this.formPagamento.get('amountPaid')?.valueChanges.subscribe((value: any) => {
            if (value === 0) {
                this.service.setFinalizeValue(true);
            }
        })
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'F7':
                this.doPagamento()
                break;
        }
    }

    addNameOrder() {

    }

    voltarAtras() {
        this.goBack.emit(false)
    }

    doPagamento() {
        if (this.disableAllFields) {
            this.dialogService.open(MPaymentMethodComponent, {
                modal: true,
                style: {'width': '25vw'},
                draggable: false,
                resizable: false
            }).onClose.subscribe((result) => {
                if (result) {
                    this.selectedPaymentMethod = result;
                    if (this.selectedPaymentMethod.mandatorySendCfe) {
                        this.formPagamento.get('paymentValue')?.setValue(this.amountPaid);
                    }
                    this.disableAllFields = false;
                    this.formPagamento.get('paymentValue')?.enable();
                    this.formPagamento.get('discount')?.enable();
                    this.paymentValue = Number(this.amountPaid / this.divider);
                }
            })
        }
    }

    dividerChange(event: KeyboardEvent) {
        if (event.code.includes('Numpad') || event.code.includes('Digit')) {
            const divisor = Number(event.key) === 0 ? 1 : Number(event.key)
            this.formPagamento.get('paymentValue')?.setValue(Number(this.amountPaid / divisor));
        }
    }

    showProductsPagamento(products: any){
        console.log(products)
        const arrayPlano = this.service.selectedEntity$().flatMap((p: any) =>
            p.products
                .filter((x: any) => x.paid)
                .map((x: any) => ({
                    ...x,
                    clientName: p.clientName,
                    tableNumber: p.tableNumber,
                    orderId: p.id
                }))
        );

        this.productsPagamento = arrayPlano.filter((el: any) =>
            products.some((x: any) => x.id === el.id)
        );
        this.show = true
    }

    partialPayment() {
        this.dialogService.open(MPartialPaymentComponent, {
            modal: true,
            style: {'width': '50vw'},
            draggable: false,
            resizable: false
        }).onClose.subscribe((response: any) => {
            if (response && response.length > 0) {
                this.paymentByProduct = response;
                const partial_payment = this.paymentByProduct.reduce((total: any, item: any) => total + (item.salePrice + item.totalAdditionalsValue), 0);
                this.formPagamento.get('paymentValue')?.setValue(partial_payment)
            }
        })
    }

    addPaymentDone() {
        let transactions: CreatePaymentTransactionTO[] = [];
        if (this.formPagamento.get('paymentValue')?.value !== 0) {
            // VARIANTE PAID BY PRODUCT
            if (this.paymentByProduct.length > 0) {
                let totalValuePaid = this.formPagamento.get('paymentValue')?.value;
                this.paymentByProduct.forEach((el: any) => {
                    transactions.push({
                        orderId: el.orderId,
                        paymentPerProducts: [
                            {
                                amount: el.amount,
                                productId: el.id,
                                payments: [{
                                    paymentStructureId: this.selectedPaymentMethod?.id,
                                    valueToPaid: this.formPagamento.get('amountPaid')?.value,
                                    valuePaid: totalValuePaid > (el.salePrice + el.totalAdditionalsValue) ? (el.salePrice + el.totalAdditionalsValue) : totalValuePaid,
                                    discount: this.formPagamento.get('discount')?.value,
                                    valuePaidChange: this.formPagamento.get('paidChange')?.value
                                }]
                            }
                        ]
                    })
                    totalValuePaid -= (el.salePrice + el.totalAdditionalsValue);
                })
            } else {
                // VARIANTE PAID TOTAL
                if (this.formPagamento.get('paymentValue')?.value === this.formPagamento.get('amountPaid')?.value) {
                    this.service.selectedEntity$().forEach((el: any) => {
                        transactions.push({
                            orderId: el.id,
                            paymentPerProducts: [{
                                payments: [{
                                    paymentStructureId: this.selectedPaymentMethod?.id,
                                    valueToPaid: el.valueToPaid,
                                    valuePaid: el.valueToPaid,
                                    discount: this.formPagamento.get('discount')?.value,
                                    valuePaidChange: this.formPagamento.get('paidChange')?.value
                                }]
                            }]
                        })
                    })
                } else {
                    // VARIANTE PAID PARCIAL TOTAL
                    let totalValuePaid = this.formPagamento.get('paymentValue')?.value;
                    this.service.selectedEntity$().forEach((el: any) => {
                        if (totalValuePaid > 0) {
                            transactions.push({
                                orderId: el.id,
                                paymentPerProducts: [{
                                    payments: [{
                                        paymentStructureId: this.selectedPaymentMethod?.id,
                                        valueToPaid: this.formPagamento.get('amountPaid')?.value,
                                        valuePaid: totalValuePaid > el.valueToPaid ? el.valueToPaid : totalValuePaid,
                                        discount: this.formPagamento.get('discount')?.value,
                                        valuePaidChange: this.formPagamento.get('paidChange')?.value
                                    }]
                                }]
                            });
                            totalValuePaid -= el.valueToPaid;
                        }
                    })
                }
            }

            this.service.payments(transactions);

            this.paymentsResetFields();
        } else {
            // this.messageService.addError('Valor pago no pode ser 0')
        }
    }

    paymentsResetFields() {
        this.pagamento = this.paymentsDone.reduce((total, item) => total + item.payment, 0);
        this.amountPaid = this.amountPaid - this.formPagamento.get('paymentValue')?.value;
        this.remaining_amount = this.totalPayment - this.paymentsDone.reduce((total, item) => total + item.payment, 0);
        this.disableAllFields = true;
        this.divider = 1;
        this.formPagamento.get('amountPaid')?.setValue(this.amountPaid);
        this.formPagamento.get('paymentValue')?.setValue(0);
        this.formPagamento.get('discount')?.setValue(0);
        this.formPagamento.get('paidChange')?.setValue(0);
    }

    removePayment(pagamento: any) {
        this.amountPaid = this.amountPaid + pagamento.payment;
        this.totalPayment = this.totalPayment + this.amountPaid;
        this.pagamento -= pagamento.payment;
        this.remaining_amount += pagamento.payment;
        this.formPagamento.get('amountPaid')?.setValue(this.remaining_amount);
        this.paymentsDone = this.paymentsDone.filter(f => f.id !== pagamento.id)
        if (this.amountPaid !== 0) {
            this.service.setFinalizeValue(false);
        }
    }

}
