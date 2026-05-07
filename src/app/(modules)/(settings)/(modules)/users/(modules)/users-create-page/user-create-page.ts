import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { UsersState } from '../../state-management/users-state';
import { ROLE_OPTIONS, CreateUserDto } from '../../../../store/settings-store';
import { BaseInput } from '../../../../../../theme/components/base-input/base-input';
import { BaseButton } from '../../../../../../theme/components/base-button/base-button';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, SelectModule, BaseInput, BaseButton],
  templateUrl: './user-create-page.html',
  styleUrl: './user-create-page.scss',
})
export class UserCreatePage {
  private state = inject(UsersState);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  saving = signal(false);
  roleOptions = ROLE_OPTIONS;

  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['', Validators.required],
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.state.create(this.form.value as CreateUserDto).subscribe({
      next: () => {
        this.saving.set(false);
        this.state.showSuccess('User created');
        this.router.navigate(['/settings/users']);
      },
      error: () => {
        this.saving.set(false);
        this.state.showError('Failed to create user');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/settings/users']);
  }
}
