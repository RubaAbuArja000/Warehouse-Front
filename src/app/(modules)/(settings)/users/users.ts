import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { UserRole } from '../../../enums/user-role.enum';

type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

const ROLE_SEVERITY: Record<UserRole, TagSeverity> = {
  [UserRole.Admin]:   'danger',
  [UserRole.Manager]: 'warn',
  [UserRole.Staff]:   'info',
};

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    TableModule, ButtonModule, ToggleSwitchModule,
    TagModule, ToastModule, InputTextModule,
    IconFieldModule, InputIconModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  private messageService = inject(MessageService);

  users: User[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (users) => { this.users = users; this.loading = false; },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load users' });
      },
    });
  }

  toggleStatus(user: User, isActive: boolean): void {
    const previous = user.isActive;
    user.isActive = isActive;

    this.userService.toggleStatus(user.id, isActive).subscribe({
      next: () =>
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `${user.name} is now ${isActive ? 'Active' : 'Inactive'}`,
        }),
      error: () => {
        user.isActive = previous;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update status' });
      },
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getRoleSeverity(role: UserRole): TagSeverity {
    return ROLE_SEVERITY[role] ?? 'secondary';
  }
}
