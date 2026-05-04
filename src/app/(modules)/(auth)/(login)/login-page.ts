import { Component } from '@angular/core';
import { LoginBrandComponent } from './sections/brand/brand';
import { LoginFormComponent } from './sections/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginBrandComponent, LoginFormComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginComponent {}
