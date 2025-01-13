import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupplyBody } from '../../models/supply.model';
import { Router } from '@angular/router';
import { SupplyService } from '../../services/supply.service';
import { CommonModule, formatDate } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { PlateInputDirective } from '../../../shared/directive/plate-format.directive';

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIcon,
    ToolbarComponent,
    PlateInputDirective
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  bodySupply: SupplyBody = {};
  isSaving: boolean = false;

  @ViewChild('plate', { static: false }) plate: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private supplyService: SupplyService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      mileage: ['', Validators.required],
      plate: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  onSave(): void {
    this.form.markAllAsTouched();
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;
    const rawValue = this.form.getRawValue();
    this.bodySupply.createdAt = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en');
    this.bodySupply.mileage = rawValue.mileage;
    this.bodySupply.plate = rawValue.plate;
    this.bodySupply.total = rawValue.total;
    this.create(this.bodySupply);
  }

  private create(body: SupplyBody): void {
    this.supplyService.create(body).subscribe({
      next: (res) => {
        if (res) {
          this.isSaving = false;
          this.feedbackService.show(`Item criado com sucesso.`);
          this.onBack();
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.feedbackService.httpError(err);
        console.log(err);
      },
    });
  }

  invalidInput(control: any, disabled = false): boolean {
    if (disabled) {
      return false;
    } else {
      return !(
        this.form?.get(control)?.valid ||
        !this.form?.get(control)?.dirty ||
        this.form?.get(control)?.untouched
      );
    }
  }

  onChange(value: string) {
    let regexp = /^([0-9][0-9]?)(\.([0-9][0-9]?)?)?$/;
    if (!value) {
      this.plate = '';
    }
    if (!regexp.test(value)) {
      this.plate.nativeElement.value = this.plate
    } else {
      this.plate = value;
    }
   
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
