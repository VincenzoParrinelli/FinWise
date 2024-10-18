import { Component } from '@angular/core';
import { MainLayoutComponent } from '../layouts/main/main.component';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-add',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule],
  templateUrl: './transactions-add.component.html',
  styleUrl: './transactions-add.component.scss',
})
export class TransactionsAddComponent {
  transactionsAddForm = new FormGroup({
    amount: new FormControl('', {}),
    category: new FormControl('', {}),
  });

  onSubmit() {}
}
