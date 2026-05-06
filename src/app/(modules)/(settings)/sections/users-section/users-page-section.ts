import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { UserApiService } from '../../../../services/api/user/user-api-service';
import { User } from '../../../../services/api/user/models/user.model';
import { UserRole } from '../../../../enums/user-role.enum';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

const ROLE_SEVERITY: Record<string, TagSeverity> = {
  [UserRole.Admin]:      'danger',
  [UserRole.Management]: 'warn',
  [UserRole.Auditor]:    'info',
};

const ROLE_OPTIONS = [
  { label: 'Admin',      value: UserRole.Admin },
  { label: 'Management', value: UserRole.Management },
  { label: 'Auditor',    value: UserRole.Auditor },
];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    TableModule, ButtonModule, ToggleSwitchModule,
    TagModule, ToastModule, InputTextModule,
    IconFieldModule, InputIconModule,
    DialogModule, SelectModule, ConfirmDialogModule, CheckboxModule,
  ],
  templateUrl: './users-page-section.html',
  styleUrl: './users-page-section.scss',
  providers: [MessageService, ConfirmationService],
})
export class UsersPage implements OnInit {
  private api     = inject(UserApiService);
  private fb      = inject(FormBuilder);
  private toast   = inject(MessageService);
  private confirm = inject(ConfirmationService);

  users      = signal<User[]>([]);
  loading    = signal(true);
  saving     = signal(false);
  showDialog = signal(false);
  editingId  = signal<number | null>(null);
  query      = signal('');

  isEditing = computed(() => this.editingId() !== null);
  filtered  = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.users();
    return this.users().filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q),
    );
  });

  roleOptions = ROLE_OPTIONS;

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email:    ['', [Validators.required, Validators.email]],
    role:     ['', Validators.required],
    password: ['', Validators.required],
    isActive: [true],
  });

  editForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    role:     ['', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.api.getAll().subscribe({
      next:  (data) => { this.users.set(data); this.loading.set(false); },
      error: ()     => { this.loading.set(false); this.error('Failed to load users'); },
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.reset({ isActive: true });
    this.showDialog.set(true);
  }

  openEdit(user: User): void {
    this.editingId.set(user.id);
    this.editForm.patchValue({ fullName: user.name, role: user.role, isActive: user.isActive });
    this.showDialog.set(true);
  }

  save(): void {
    const activeForm = this.isEditing() ? this.editForm : this.form;
    if (activeForm.invalid) return;
    this.saving.set(true);

    const request$ = this.isEditing()
      ? this.api.update(this.editingId()!, this.editForm.value)
      : this.api.create(this.form.value);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.showDialog.set(false);
        this.success(this.isEditing() ? 'User updated' : 'User created');
        this.load();
      },
      error: () => { this.saving.set(false); this.error('Failed to save user'); },
    });
  }

  toggleStatus(user: User, isActive: boolean): void {
    this.users.update((list) => list.map((u) => (u.id === user.id ? { ...u, isActive } : u)));
    this.api.toggleStatus(user.id, isActive).subscribe({
      next:  () => this.success(`${user.name} is now ${isActive ? 'Active' : 'Inactive'}`),
      error: () => {
        this.users.update((list) => list.map((u) => (u.id === user.id ? { ...u, isActive: !isActive } : u)));
        this.error('Failed to update status');
      },
    });
  }

  delete(user: User): void {
    this.confirm.confirm({
      message: `Delete user "${user.name}"?`,
      header:  'Confirm Delete',
      icon:    'pi pi-exclamation-triangle',
      accept:  () =>
        this.api.delete(user.id).subscribe({
          next:  () => { this.users.update((list) => list.filter((u) => u.id !== user.id)); this.success('User deleted'); },
          error: () => this.error('Failed to delete user'),
        }),
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getRoleSeverity(role: string): TagSeverity {
    return ROLE_SEVERITY[role] ?? 'secondary';
  }

  private success(detail: string): void { this.toast.add({ severity: 'success', summary: 'Success', detail }); }
  private error(detail: string): void   { this.toast.add({ severity: 'error',   summary: 'Error',   detail }); }
}
