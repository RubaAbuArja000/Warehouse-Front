import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../../../../services/api/auth/auth';
import { BaseInput } from '../../../../../theme/components/base-input/base-input';
import { BaseButton } from '../../../../../theme/components/base-button/base-button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, BaseInput, BaseButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ['admin@happywarehouse.com', [Validators.required, Validators.email]],
    password: ['P@ssw0rd', [Validators.required]],
  });

  loading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  email = computed(() => this.form.get('email'));
  password = computed(() => this.form.get('password'));

  submit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid email or password.');
      },
    });
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
}
