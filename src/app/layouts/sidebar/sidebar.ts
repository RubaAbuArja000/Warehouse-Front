import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Dashboard',  icon: 'pi pi-home',      route: '/dashboard' },
    { label: 'Warehouse',  icon: 'pi pi-building',   route: '/warehouse' },
    { label: 'Items',      icon: 'pi pi-box',         route: '/items' },
    { label: 'Users',      icon: 'pi pi-users',       route: '/users' },
    { label: 'Logs',       icon: 'pi pi-list',        route: '/logs' },
  ];
}
