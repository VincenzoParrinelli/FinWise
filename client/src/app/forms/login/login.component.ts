import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    console.log(enteredEmail);
  }
}
