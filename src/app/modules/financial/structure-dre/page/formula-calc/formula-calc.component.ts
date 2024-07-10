import {Component, DestroyRef, EventEmitter, inject, Input, Output, Self} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NgControl} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AccountEquationStructureTO} from "../../../../../core/models/bills";

@Component({
    selector: 'c-formula-calc',
    templateUrl: './formula-calc.component.html',
    styleUrls: ['./formula-calc.component.scss']
})
export class FormulaCalcComponent implements ControlValueAccessor {

    @Output() changeValues = new EventEmitter<any>();
    @Output() changeStatus = new EventEmitter<any>();

    @Input() withoutOperation: boolean;

    @Input() onChange = (change: any) => {
    };
    @Input() onTouched = () => {
    };

    showCalc: boolean;
    form: FormGroup;
    data: FormArray;
    private destroyRef = inject(DestroyRef);

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }

    writeValue(value: AccountEquationStructureTO[] | null): void {
        this.showCalc = !!value;
        if (value) {
            this.data = new FormArray(value.map(m => new FormGroup({
                calculations: new FormArray(m.calculations.map(c => new FormControl(c))),
                operator: new FormControl(m.operator)
            })));
            //formulaValidation
            this.form = new FormGroup({calculations: this.data});
            this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(({calculations}) => this.onChange(calculations));
            this.form.statusChanges.pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.changeStatus.emit(this.form.errors));
        }
    }

    addNode(i: number): void {
        this.data.insert(i + 1, new FormGroup({
            calculations: new FormArray([new FormControl(null)]),
            operator: new FormControl(null)
        }));
    }

    removeNode(i: number): void {
        if (this.data.length > 1) {
            this.data.removeAt(i);
        }
    }

    addCalc(i: number, j: number): void {
        (this.data.at(i).get('calculations') as FormArray).insert(j + 1, new FormControl(null));
    }

    removeCalc(i: number, j: number): void {
        const calc = (this.data.at(i).get('calculations') as FormArray);
        if (calc.length > 1) {
            calc.removeAt(j);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    updateStatus($event: any): void {
        this.form.setErrors($event);
    }
}
