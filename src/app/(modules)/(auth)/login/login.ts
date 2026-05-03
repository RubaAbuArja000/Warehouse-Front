import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  form!: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      email:    ['admin@happywarehouse.com', [Validators.required, Validators.email]],
      password: ['P@ssw0rd',                [Validators.required]],
    });
  }

  get email()    { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password.';
      },
    });
  }
}
