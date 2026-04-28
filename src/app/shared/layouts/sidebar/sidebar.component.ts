import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon:  string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home',     route: '/dashboard' },
    { label: 'Warehouse', icon: 'pi pi-building',  route: '/inventory/warehouse' },
    { label: 'Items',     icon: 'pi pi-box',       route: '/inventory/items' },
    { label: 'Users',     icon: 'pi pi-users',     route: '/settings/users' },
    { label: 'Logs',      icon: 'pi pi-list',      route: '/settings/logs' },
  ];
}
