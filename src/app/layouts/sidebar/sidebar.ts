import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  navItems = signal<NavItem[]>([
    { label: 'Dashboard',  icon: 'pi pi-home',     route: '/dashboard'  },
    { label: 'Warehouses', icon: 'pi pi-building',  route: '/warehouses' },
    { label: 'Inventory',  icon: 'pi pi-box',       route: '/inventory'  },
    { label: 'Settings',   icon: 'pi pi-cog',       route: '/settings'   },
  ]);
}
