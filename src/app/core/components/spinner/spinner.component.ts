import {Component} from '@angular/core';
import {SpinnerService} from '../../injects/spinner.services';

@Component({
    selector: 'c-spinner',
    template: `
        <p-blockUI [blocked]="spinnerService.block" styleClass="spinner">
            @if (spinnerService.block) {
                <img src="../assets/images/tube-spinner.svg" width="150" height="150" alt="logo">
            }
        </p-blockUI>
    `,
    styles: [`::ng-deep .spinner {
    z-index: 1000;
  } `]
})
export class SpinnerComponent {

    constructor(public spinnerService: SpinnerService) {
    }
}
