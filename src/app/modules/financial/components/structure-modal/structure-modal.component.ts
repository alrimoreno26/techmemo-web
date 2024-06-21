import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseModalComponentDirective} from "../../../../standalone/data-table/directives/base.modal.component.directive";
import {StructureService} from "../../service/structure.service";
import {currencyFormatEnum, decimalPrecision, stateOptions} from "../../../../core/enums/commerce";

@Component({
  selector: 'm-structure-modal',
  templateUrl: './structure-modal.component.html',
  styleUrls: ['./structure-modal.component.scss']
})
export class StructureModalComponent extends BaseModalComponentDirective implements OnInit {
  protected readonly stateOptions = stateOptions;
  protected readonly decimalPrecision = decimalPrecision;

  constructor(private structureService: StructureService) {
    super(structureService);
  }

  ngOnInit(): void {
    const {data} = this.config;
    this.form = new FormGroup({
      description: new FormControl(data?.description, Validators.required),
      inverted: new FormControl<boolean>(data?.inverted ?? false, Validators.required),
      currencyFormat: new FormControl<currencyFormatEnum>(
        data?.currencyFormat ?? currencyFormatEnum.NORMAL, Validators.required
      ),
      decimalPrecision: new FormControl<number>(data?.decimalPrecision ?? 2, Validators.required),
    });
  }

  onClose(): void {
    this.structureService.openModalAddOrEdit(false);
  }
}
