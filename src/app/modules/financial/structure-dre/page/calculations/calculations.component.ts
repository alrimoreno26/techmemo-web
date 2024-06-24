import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  Self,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NgControl} from '@angular/forms';
import {Inplace} from 'primeng/inplace';
import {CalculationTO} from "../../../../../core/models/bills";
import {Options} from "../../../../../core/models";
import { operatorOptions } from '../../utils';
import {StructureDataService} from "../../../service/structure.data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {calculationValidation} from "../../validations/calculation.validation";

@Component({
  selector: 'c-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements ControlValueAccessor, OnChanges {

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.inplace.active) {
      this.inplace.deactivate();
    }
  }

  @ViewChild(Inplace, {static: false}) inplace: Inplace;

  @Output() changeValues = new EventEmitter<any>();
  @Output() changeStatus = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();

  @Input() onChange = (change: any) => {
  };
  @Input() onTouched = () => {
  };
  @Input() last: boolean;

  form: FormGroup;
  data?: CalculationTO;
  operatorOptions: Options[] = operatorOptions;
  typeOptions: Options[] = [
    {name: 'balance.structure.calculations.account', value: 'account'},
    {name: 'balance.structure.calculations.constant', value: 'constant'}
  ];
  private destroyRef = inject(DestroyRef);

  constructor(@Self() public controlDir: NgControl,
              private elementRef: ElementRef,
              public service: StructureDataService) {
    this.controlDir.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {last} = changes;
    const {currentValue, firstChange} = last;
    if (!firstChange) {
      this.form.setValidators(calculationValidation(currentValue));
      this.form.updateValueAndValidity();
    }
  }

  writeValue(value?: CalculationTO): void {
    this.data = value;
    this.form = new FormGroup({
      type: new FormControl(!!value?.accountId ? 'account' : 'constant'),
      id: new FormControl(value?.id),
      accountId: new FormControl(this.service.accountList$().find(f => f.accountId === value?.accountId)),
      changeSignEndValue: new FormControl(value?.changeSignEndValue),
      constant: new FormControl(value?.constant),
      name: new FormControl(value?.name),
      previousYears: new FormControl<number| null>(value?.previousYears ?? null),
      operator: new FormControl(value?.operator)
    }, calculationValidation(this.last));
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => this.update(data));
    this.form.get('type')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data === 'account') {
        this.form.get('constant')?.setValue(null);
      } else {
        this.form.patchValue({accountId: null, name: null});
      }
    });
    this.form.get('accountId')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      if (data) {
        const {name} = data;
        this.form.get('name')?.setValue(name);
      }
    });
    this.form.statusChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeStatus.emit(this.form.errors));
  }

  private update(data: any): void {
    const {accountId} = data;
    const value = accountId ? {...data, accountId: accountId.accountId} : data;
    if (!value?.id) {
      delete value.id;
    }
    this.onChange(value);
    this.data = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
