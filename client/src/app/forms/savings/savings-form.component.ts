import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../../shared/custom-btn/custom-btn.component';

import { CategoryService } from '../../category.service';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';
import {
  SavingsState,
  Saving,
  NewSavingFormData,
} from '../../store/savings/savings.model';
import * as SavingsActions from '../../store/savings/savings.actions';

@Component({
  selector: 'app-savings-form',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule, CustomBtnComponent],
  templateUrl: './savings-form.component.html',
  styleUrl: './savings-form.component.scss',
})
export class SavingsFormComponent {
  categoryService = inject(CategoryService);
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<SavingsState>);
  private router = inject(Router);
  loading = this.store.selectSignal<boolean>(selectLoading);
  toggleCategoryDropdown = signal<boolean>(false);
  selectedSaving =
    this.router.getCurrentNavigation()?.extras?.state?.['saving'];
  updatedSaving = signal({});

  ngOnInit() {
    this.formatGoalAmountOnLeave();
  }

  savingsForm = new FormGroup({
    date: new FormControl(this.formatSelectedSavingDate || '', {
      validators: [Validators.required],
    }),
    category: new FormControl(this.selectedSaving?.category || '', {
      validators: [Validators.required],
    }),
    goalAmount: new FormControl(
      this.selectedSaving?.goalAmount.toString() || '',
      {
        validators: [Validators.required],
      }
    ),
    savingTitle: new FormControl(this.selectedSaving?.savingTitle || '', {
      validators: [Validators.maxLength(50)],
    }),
    description: new FormControl(this.selectedSaving?.description || '', {
      validators: [Validators.maxLength(50)],
    }),
  });

  get formatSelectedSavingDate(): string {
    return this.selectedSaving
      ? new Date(this.selectedSaving.date).toISOString().split('T')[0]
      : '';
  }

  get isDateRequired() {
    return (
      this.savingsForm.controls.date.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isCategoryRequired() {
    return (
      this.savingsForm.controls.category.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isGoalAmountRequired() {
    return (
      this.savingsForm.controls.goalAmount.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get descriptionMaxLengthExceeded() {
    return (
      this.savingsForm.controls.description.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get savingTitleLengthExceeded() {
    return (
      this.savingsForm.controls.savingTitle.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get categoryFormValue() {
    return this.savingsForm.get('category')?.value;
  }

  formatGoalAmountOnEnter(): void {
    const amountControl = this.savingsForm.get('goalAmount');

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[^0-9.]/g, ''));
  }

  formatGoalAmountOnLeave(): void {
    const amountControl = this.savingsForm.get('goalAmount');
    const categoryControl = this.savingsForm.get('category');

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[-]/g, ''));
    const fixedValue = parseFloat(amountControl.value).toFixed(2);

    if (categoryControl?.value === 'Salary') {
      amountControl.setValue(`$${fixedValue}`);
    } else {
      amountControl.setValue(`-$${fixedValue}`);
    }
  }

  setCategory(categoryName: string): void {
    this.savingsForm.patchValue({ category: categoryName });

    const amountControl = this.savingsForm.get('goalAmount');

    if (!amountControl?.value) return;

    const isNotSalary = categoryName !== 'Salary';
    let amountValueNumeric = amountControl.value.replace(/[^0-9.]/g, '');

    if (isNotSalary) {
      amountValueNumeric = amountValueNumeric.includes('-')
        ? amountValueNumeric
        : `-$${amountValueNumeric}`;
    } else {
      amountValueNumeric = `$${amountValueNumeric}`;
    }

    amountControl.setValue(amountValueNumeric);
  }

  private issavingEdited(formattedFormData: object): number {
    for (const key in formattedFormData) {
      const formField = formattedFormData[key as keyof object];
      const selectedsavingField = this.selectedSaving[key as keyof Saving];

      if (formField !== selectedsavingField) {
        this.updatedSaving.set({
          ...this.updatedSaving(),
          [key]: formField,
        });
      } else {
        const updatedsaving = { ...this.updatedSaving() };
        delete updatedsaving[key as keyof object];
        this.updatedSaving.set(updatedsaving);
      }
    }

    return Object.values(this.updatedSaving()).length;
  }

  // TODO: do not submit if no field has changed
  onSubmit(): void {
    this.formIsSubmitted.set(true);

    if (!this.savingsForm.valid) {
      this.savingsForm.markAllAsTouched();
      return;
    }

    const formattedsaving = {
      ...this.savingsForm.value,
      amountGoal: parseFloat(
        this.savingsForm.controls.goalAmount.value?.replace(/[^0-9.-]/g, '')!
      ),
    } as NewSavingFormData;

    if (!this.selectedSaving) {
      this.store.dispatch(
        SavingsActions.createSaving({
          saving: formattedsaving,
        })
      );
      // } else if (this.issavingEdited(formattedsaving)) {
      //   this.store.dispatch(
      //     SavingsActions.updateSaving({
      //       updatedsavingFormData: this.updatedSaving(),
      //       id: this.selectedSaving._id,
      //     })
      //   );
    }
  }
}
