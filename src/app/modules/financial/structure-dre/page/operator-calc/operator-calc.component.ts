import {Component, EventEmitter, Input, Output, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Dropdown} from 'primeng/dropdown';
import {Inplace} from 'primeng/inplace';
import {Options} from "../../../../../core/models";
import {operatorConditionalOptions, operatorOptions } from '../../utils';

@Component({
  selector: 'c-operator-calc',
  templateUrl: './operator-calc.component.html',
  styleUrls: ['./operator-calc.component.scss']
})
export class OperatorCalcComponent implements ControlValueAccessor {
  @ViewChild(Dropdown, {static: false}) dropdown: Dropdown;
  @ViewChild(Inplace, {static: false}) inplace: Inplace;

  @Output() changeValues = new EventEmitter<any>();

  @Input() conditionalOperators: boolean;

  operator: FormControl;
  operatorOptions: Options[] = operatorOptions;
  operatorConditionalOptions: Options[] = operatorConditionalOptions;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  @Input() onChange = (change: any) => {
  };

  @Input() onTouched = () => {
  };

  onShow($event: Event): void {
    $event.preventDefault();
    setTimeout(() => this.dropdown.show());
  }

  onHide(): void {
    this.inplace.deactivate();
    const {value} = this.operator;
    this.onChange(value);
  }

  writeValue(value: string | null): void {
    this.operator = new FormControl<any>(value);
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
