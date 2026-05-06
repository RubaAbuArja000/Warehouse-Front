import { Component, inject, signal, computed } from '@angular/core';
import { Auth } from '../../models/auth';
import { UsersPage } from './sections/users-section/users-page-section';
import { LogsPage } from './sections/logs-section/logs-section';
import { UserRole } from '../../enums/user-role.enum';

type Tab = 'users' | 'logs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [UsersPage, LogsPage],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsComponent {
  private auth = inject(Auth);

  activeTab = signal<Tab>('users');
  isAdmin   = computed(() => this.auth.getRole() === UserRole.Admin);
}
