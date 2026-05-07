import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';
import { UsersState } from './state-management/users-state';
import { SearchBoxComponent } from '../../../../shared/search-box/search-box';
import { ROLE_SEVERITY, TagSeverity } from '../../constants/settings.constants';
import { User } from '../../../../services/api/user/models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, TableModule, ButtonModule, ToggleSwitchModule, TagModule, SearchBoxComponent],
  templateUrl: './users-list-page.html',
  styleUrl: './users-list-page.scss',
})
export class UsersListPage implements OnInit {
  protected state  = inject(UsersState);
  private   router = inject(Router);

  ngOnInit(): void { this.state.load(); }

  openCreate(): void { this.router.navigate(['/settings/users/new']); }

  openEdit(user: User): void { this.router.navigate(['/settings/users', user.id, 'edit']); }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getRoleSeverity(role: string): TagSeverity { return ROLE_SEVERITY[role] ?? 'secondary'; }
}
