import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersState } from '../../state-management/users-state';
import { UserApiService } from '../../../../../../services/api/user/user-api-service';
import { ROLE_OPTIONS, UpdateUserDto } from '../../../../store/settings-store';
import { BaseInput } from '../../../../../../theme/components/base-input/base-input';
import { BaseButton } from '../../../../../../theme/components/base-button/base-button';
import { BaseSelect } from '../../../../../../theme/components/base-select/base-select';
import { BaseCheckbox } from '../../../../../../theme/components/base-checkbox/base-checkbox';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, BaseInput, BaseButton, BaseSelect, BaseCheckbox],
  templateUrl: './user-edit-page.html',
  styleUrl: './user-edit-page.scss',
})
export class UserEditPage implements OnInit {
  private state = inject(UsersState);
  private api = inject(UserApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  userId = signal(0);
  saving = signal(false);
  loading = signal(true);
  roleOptions = ROLE_OPTIONS;

  form = this.fb.group({
    fullName: ['', Validators.required],
    role: ['', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userId.set(id);
    this.api.getById(id).subscribe({
      next: (u) => {
        this.form.patchValue({ fullName: u.name, role: u.role, isActive: u.isActive });
        this.loading.set(false);
      },
      error: () => {
        this.state.showError('User not found');
        this.router.navigate(['/settings/users']);
      },
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.state.update(this.userId(), this.form.value as UpdateUserDto).subscribe({
      next: () => {
        this.saving.set(false);
        this.state.showSuccess('User updated');
        this.router.navigate(['/settings/users']);
      },
      error: () => {
        this.saving.set(false);
        this.state.showError('Failed to update user');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/settings/users']);
  }
}
