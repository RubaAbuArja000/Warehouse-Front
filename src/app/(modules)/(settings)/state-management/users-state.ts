import { Injectable, inject, signal, computed } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserApiService } from '../../../services/api/user/user-api-service';
import { User } from '../../../services/api/user/models/user.model';
import { CreateUserDto, UpdateUserDto } from '../constants/settings.constants';

@Injectable()
export class UsersState {
  private api     = inject(UserApiService);
  private toast   = inject(MessageService);
  private confirm = inject(ConfirmationService);

  users   = signal<User[]>([]);
  loading = signal(true);
  query   = signal('');

  filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.users();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q),
    );
  });

  load(): void {
    this.loading.set(true);
    this.api.getAll().subscribe({
      next:  data => { this.users.set(data); this.loading.set(false); },
      error: ()   => { this.loading.set(false); this.showError('Failed to load users'); },
    });
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.api.create({ ...dto, isActive: true }).pipe(
      tap(u => this.users.update(list => [...list, u])),
    );
  }

  update(id: number, dto: UpdateUserDto): Observable<User> {
    return this.api.update(id, dto).pipe(
      tap(u => this.users.update(list => list.map(x => x.id === id ? u : x))),
    );
  }

  toggleStatus(user: User, isActive: boolean): void {
    this.users.update(list => list.map(u => u.id === user.id ? { ...u, isActive } : u));
    this.api.toggleStatus(user.id, isActive).subscribe({
      next:  () => this.showSuccess(`${user.name} is now ${isActive ? 'Active' : 'Inactive'}`),
      error: () => {
        this.users.update(list => list.map(u => u.id === user.id ? { ...u, isActive: !isActive } : u));
        this.showError('Failed to update status');
      },
    });
  }

  delete(user: User): void {
    this.confirm.confirm({
      message: `Delete user "${user.name}"?`,
      header:  'Confirm Delete',
      icon:    'pi pi-exclamation-triangle',
      accept:  () => this.api.delete(user.id).subscribe({
        next:  () => { this.users.update(list => list.filter(u => u.id !== user.id)); this.showSuccess('User deleted'); },
        error: () => this.showError('Failed to delete user'),
      }),
    });
  }

  showSuccess(detail: string): void { this.toast.add({ severity: 'success', summary: 'Success', detail }); }
  showError(detail: string):   void { this.toast.add({ severity: 'error',   summary: 'Error',   detail }); }
}
