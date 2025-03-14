import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef,
    effect, input
} from '@angular/core';
import { Router } from '@angular/router';
import { Listbox } from 'primeng/listbox';
import {ConfirmEventType, ConfirmationService, MessageService, TreeNode, TooltipOptions} from 'primeng/api';
import { Subject } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'
import {cnpj} from "../../../../../../core/validators/cnpj.validator";
import {CommercesService} from "../../../../service/commerces.service";

@Component({
	selector: 'commerce-left-bar',
	templateUrl: './commerce-left-bar.component.html',
	styleUrls: ['./commerce-left-bar.component.scss']
})
export class CommerceLeftBarComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges{

	userLogged: any;

	timeoutId: any;
	organizationIdActive: string;

	companyDataInfo: any | null;


	companiesPageData: any | null;

	companiesData: any[];

	formattedCompaniesListData: any[] = [];
	filteredCompaniesListData: any[] = [];
	selectedCompanyData: any;

	selectedOrganizationsChildrenTreeNode: TreeNode;
	activeOrganization: any | null;

	filterUsers: any[] = [];
	filterCreatedDate: any = null;

	filterValue: string = "";
	companiesCurrentPage: number = 0;
	companiesSize: number = 10;
	companiesSort: string = "COMPANY_CREATED";
	companiesDirection: string = "ASC";

	orderFields: any[] = [];
	orderFieldSelected: any;

	orderBy: any[] = [];
	orderBySelected: any;

	companiesFirstPage: number = 0;
	companiesTotal: number = 0;
	companiesPageFilterData: any;

    tooltipCompanyOptions: TooltipOptions;
    collapseCompaniesListData = input<boolean>(false);

	private colorMap: Map<string, string> = new Map<string, string>();

	skeletonCompaniesItemsArray = Array(10).fill(0);
	skeletonCompaniesPaginateItemsArray = Array(4).fill(0);

	displayModalAddCompany: boolean = false;

	addCompanyForm: FormGroup;
	cnpjArrayList: any[] = [];

	isSandboxMode: boolean = false;

	@Input() addOrganizationCompany: boolean = false;

	@Output() updateMenuEmit = new EventEmitter<[any, boolean]>();
	@Output() updateAddCompanyEmit = new EventEmitter<boolean>();
	@Output() updateOrganizationEmit = new EventEmitter<any>();
	@Output() updateCleanCompanyListEmit = new EventEmitter<[boolean, boolean]>();

	onDestroySubscriptions$: Subject<boolean> = new Subject();

	@ViewChild('companiesListData') companiesListData: Listbox;

	constructor(
		private router: Router,
		public messageService: MessageService,
		private translateService: TranslateService,
		private confirmationService: ConfirmationService,
		private changeDetectorRef: ChangeDetectorRef,
        public commercesService: CommercesService,
	) {
		this.updateSubscribers();


		this.colorMap.set("ME", "#6738a4");
		this.colorMap.set("EPP", "#10a4a0");
		this.colorMap.set("DEMAIS", "#3f6ade");

		this.orderFields = [
			{ name: "Data de criação", value: "COMPANY_CREATED"},
			{ name: "Razão social", value: "SOCIAL_REASON"},
			{ name: "Nome de fantasia", value: "FANTASY_NAME"},
			{ name: "Cnpj", value: "CNPJ"}
		];
		this.orderFieldSelected = this.orderFields[0];

		this.orderBy = [
			{ name: "Ascendente", value: "ASC", icon: "sort-descending"},
			{ name: "Descendente", value: "DESC", icon: "sort-ascending"}
		];
		this.orderBySelected = this.orderBy[0];

        effect(() => {
            if(this.commercesService.loaded$()){
                this.filteredCompaniesListData = this.commercesService.listEntities$();
                this.companiesTotal = this.commercesService.total$();
            }
            if(this.commercesService.selectedEntity$()){
                this.selectedCompanyData = this.commercesService.selectedEntity$();
            }
            this.tooltipCompanyOptions = {
                tooltipEvent: 'hover',
                tooltipPosition: 'right',
                disabled: !this.collapseCompaniesListData(),
            };
        });

		if(!this.companiesPageData) {
			this.updatePageCompaniesFilterData(this.filterValue, this.companiesCurrentPage, this.companiesSize, this.companiesSort, this.companiesDirection);
			this.refreshAllOrganizationCompaniesData();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes['addOrganizationCompany']) {
			this.addOrganizationCompany = changes['addOrganizationCompany'].currentValue;
			if (this.addOrganizationCompany) {
				this.showAddCompany(this.addOrganizationCompany);
			}
		}

	}

	ngOnInit(): void {
		this.isSandboxMode = false;//!environment.production;
		this.initAddCompanyForm();
	}

	ngAfterViewInit(): void {
		this.centerSelectDataOption();
	}

	updateSubscribers(): void {
	}


	get fC(): {
		[key: string]: AbstractControl;
	} {
		return this.addCompanyForm.controls;
	}

	initAddCompanyForm(): void {
		this.addCompanyForm = new FormGroup({
			cnpj: new FormControl<string>('', [Validators.required, cnpj]),
			cnpjArrayListSelected: new FormControl<any[]>([]),
		});
	}





	clearCompanyData(): void {
		this.addCompanyForm?.controls['cnpj'].setValue('');
		this.cnpjArrayList = [];
	}



	validateCnpjToAdd(): boolean {
		let invalid: boolean = true;
		if (this.cnpjArrayList.length === 0) {
			invalid = this.addCompanyForm.controls['cnpj'].invalid
		} else {
			invalid = this.addCompanyForm.controls['cnpjArrayListSelected'].value.length === 0
		}
		return invalid;
	}

	updatePageCompaniesFilterData(filterValue: string, currentPage: number, rowsPage: number, sortValue: string, directionValue: string): void {
		// const companiesFilter: PageCompanyFilter = {
		// 	filterValue: filterValue,
		// 	currentPage: currentPage,
		// 	rowsPage: rowsPage,
		// 	sortValue: sortValue,
		// 	directionValue: directionValue
		// }
		// this.organizationService.setOrganizationPageCompaniesFilterData(companiesFilter);
	}

	refreshAllOrganizationCompaniesData(): void {

	}

	selectOrganizationChildrenTreeNode(event: any): void {
		if (this.selectedOrganizationsChildrenTreeNode) {
			if (this.selectedOrganizationsChildrenTreeNode.data !== this.activeOrganization) {
				this.updateOrganizationEmit.emit(this.selectedOrganizationsChildrenTreeNode.data);
				this.activeOrganization = this.selectedOrganizationsChildrenTreeNode.data;
			}
		}
	}

	selectDataOption(): void {
        this.commercesService.setSelected(this.selectedCompanyData)
	}

	centerSelectDataOption(): void {
		this.changeDetectorRef.detectChanges();
		if(this.companiesListData && this.companiesData.length > 0) {
			// Obtener el índice del elemento seleccionado
			const selectedIndex = this.companiesListData.options.findIndex((option, index) => option.cnpj === this.companyDataInfo?.cnpj);
			// Obtener el índice del elemento seleccionado en la lista
			const listItems = document.querySelectorAll('.p-listbox-list .p-listbox-item');
			const selectedItem = listItems[selectedIndex];
			// Hacer scroll hasta el elemento seleccionado
			if (selectedItem){
				selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}

	showAddCompany(state: boolean): void {
		this.displayModalAddCompany = state;
		this.updateAddCompanyEmit.emit(this.displayModalAddCompany);
	}

	convertTreeNode(object: any): TreeNode {
		const node: TreeNode = {
			key: object.id.toString(),
			label: object.name,
			data: object,
			children: []
		};
		if (object.children && object.children.length > 0) {
			for (const child of object.children) {
				if(node.children){
					node.children.push(this.convertTreeNode(child));
				}
			}
		}
		return node;
	}

	clearFilter(event: any): void {
		this.filterUsers = [];
		this.filterCreatedDate = null;

		this.filteredCompaniesListData = [...this.formattedCompaniesListData];
	}

	generateRandomColor(companySize: string): string {
		if (this.colorMap.has(companySize)) {
			return this.colorMap.get(companySize)!;
		}
		const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
		this.colorMap.set(companySize, randomColor);
		return randomColor;
	}

	getCompanyColor(companySize: string): string {
		if (this.colorMap.has(companySize)) {
			return this.colorMap.get(companySize)!;
		}
		return "#d16651";
	}

	getContrastYIQ(companySize: string): string {
		const hexcolor = this.colorMap.get(companySize)!;
		var r = parseInt(hexcolor.slice(1, 2), 16);
		var g = parseInt(hexcolor.slice(3, 2), 16);
		var b = parseInt(hexcolor.slice(5, 2), 16);
		var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return (yiq >= 128) ? '#424242' : '#ffffff';
	}

	filterCompanyData(event: any): void {
		/*const filterOptions: boolean[] = new Array(3).fill(false);
		filterOptions[0] = !isEmpty(this.filterValue);
		filterOptions[1] = !isEmpty(this.filterUsers);
		filterOptions[2] = this.filterCreatedDate !== null;

		this.filteredCompaniesListData = this.newCompaniesListData.filter(c =>
			(filterOptions[0] ? (c.socialReason.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase()) || c.cnpj.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase())) : true)
			&& (filterOptions[1] ? (this.filterUsers.filter(u => c.userData.userName === u.userName).length > 0) : true)
			&& (filterOptions[2] ? (formatDate(new Date(this.filterCreatedDate), 'dd/MM/yyyy', 'en') === formatDate(new Date(c.created), 'dd/MM/yyyy', 'en')) : true)
		);*/

		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		this.timeoutId = setTimeout(() => {
			const key = event.key;

			const isControlKey = ["CapsLock", "Shift", "Alt", "Enter", "Home", "End", "PageUp", "PageDown", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(key);

			if (!isControlKey) {
				this.companiesFirstPage = 0;
				this.companiesCurrentPage = 0;
				this.companiesSize = 10;

				this.updatePageCompaniesFilterData(this.filterValue, this.companiesCurrentPage, this.companiesPageFilterData.rowsPage, this.companiesPageFilterData.sortValue, this.companiesPageFilterData.directionValue);
				this.refreshAllOrganizationCompaniesData();
			}
		}, 500);
	}

	onCompanyPageChange(event: PaginatorState): void {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		this.timeoutId = setTimeout(() => {
			this.companiesFirstPage = event.first as number;
			this.companiesCurrentPage = event.page as number;
			this.companiesSize = event.rows as number;

			this.updatePageCompaniesFilterData(this.companiesPageFilterData.filterValue, this.companiesCurrentPage, this.companiesPageFilterData.rowsPage, this.companiesPageFilterData.sortValue, this.companiesPageFilterData.directionValue);
			this.refreshAllOrganizationCompaniesData();
		});
	}

	onCompanyOrderChange(event: any): void {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}

		this.timeoutId = setTimeout(() => {
			this.companiesFirstPage = 0;
			this.companiesCurrentPage = 0;
			this.companiesSize = 10;

			this.updatePageCompaniesFilterData(this.companiesPageFilterData.filterValue, this.companiesCurrentPage, this.companiesPageFilterData.rowsPage, this.orderFieldSelected.value, this.orderBySelected.value);
			this.refreshAllOrganizationCompaniesData();
		});
	}

	goToCompany(cnpj: string): void {
		if(cnpj) {
			var organizationId = '';
			if(this.userLogged.role === "BackOfficeSaas"){
				organizationId = this.organizationIdActive || '';
			}

			const companyData = this.companiesData.filter(c => c.cnpj === cnpj)[0];
			//this.companyService.setCompanyDataInfo(companyData);

			const actualRoute = '/credit-analysis/data/' + (organizationId ? organizationId + '/' : '') + 'bigdata/company/' + cnpj;
			this.router.navigateByUrl(actualRoute);
		}
	}



	removeOrganizationCompany(): void {
		this.confirmationService.confirm({
			header: this.translateService.instant('companyList.modal_dialog.remove_company_header_text'),
			icon: 'mdi mdi-office-building-remove mdi-24px',
			message: this.translateService.instant('companyList.modal_dialog.remove_company_body_text'),
			acceptLabel: 'Eliminar',
			rejectLabel: 'Cancelar',
			accept: () => {
				// if(this.companyDataInfo) {
				// 	const companyPosition = this.filteredCompaniesListData.findIndex(company => company.cnpj === this.companyDataInfo?.cnpj);
				// 	this.store.dispatch(
				// 		fromCreditAnalysisActions.removeOrganizationCompany({
				// 			organizationId: this.organizationIdActive,
				// 			cnpj: this.companyDataInfo.cnpj,
				// 			position: companyPosition
				// 		})
				// 	);
				// }
			},
			reject: (type: ConfirmEventType) => {
				switch (type) {
                    case ConfirmEventType.REJECT:
                        break;
                    case ConfirmEventType.CANCEL:
                        break;
				}
			},
			key: 'accompanimentDialog'
		});
	}

	ngOnDestroy(): void {
		this.onDestroySubscriptions$.next(true);
	}

}
