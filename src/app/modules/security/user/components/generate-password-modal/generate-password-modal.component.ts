import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'm-generate-password-modal',
  templateUrl: './generate-password-modal.component.html',
  styleUrls: ['./generate-password-modal.component.scss']
})
export class GeneratePasswordModalComponent implements OnInit {
  /**
   * Form for new password
   */
  form: FormGroup;

  constructor(public ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              public service: UserService) {
  }

  ngOnInit(): void {
    const {data} = this.config;
    this.form = new FormGroup({
      id: new FormControl<string>(data.id),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  /**
   * Save generated password
   */
  save(): void {
    this.service.changePass(this.form.value, this.ref);
  }
}
