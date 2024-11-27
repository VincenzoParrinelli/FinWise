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
  categories = inject(CategoryService).getAllCategories;
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
  });

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

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[-]/g, ''));
    const fixedValue = parseFloat(amountControl.value).toFixed(2);

    amountControl.setValue(`$${fixedValue}`);
  }

  setCategory(categoryName: string): void {
    this.savingsForm.patchValue({ category: categoryName });
  }

  private isSavingEdited(formattedFormData: object): number {
    for (const key in formattedFormData) {
      const formField = formattedFormData[key as keyof object];
      const selectedSavingField = this.selectedSaving[key as keyof Saving];

      if (formField !== selectedSavingField) {
        this.updatedSaving.set({
          ...this.updatedSaving(),
          [key]: formField,
        });
      } else {
        const updatedSaving = { ...this.updatedSaving() };
        delete updatedSaving[key as keyof object];
        this.updatedSaving.set(updatedSaving);
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

    const formattedSaving = {
      ...this.savingsForm.value,
      date: this.selectedSaving?.date || new Date(),
      goalAmount: parseFloat(
        this.savingsForm.controls.goalAmount.value?.replace(/[^0-9.-]/g, '')!
      ),
    } as NewSavingFormData;

    if (!this.selectedSaving) {
      this.store.dispatch(
        SavingsActions.createSaving({
          saving: formattedSaving,
        })
      );
    } else if (this.isSavingEdited(formattedSaving)) {
      this.store.dispatch(
        SavingsActions.updateSaving({
          updatedSavingFormData: this.updatedSaving(),
          id: this.selectedSaving._id,
        })
      );
    }
  }
}
