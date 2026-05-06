import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../models/auth';
import { UserRole } from '../../enums/user-role-enum';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsComponent {
  private auth = inject(Auth);
  isAdmin = computed(() => this.auth.getRole() === UserRole.Admin);
}
