import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth } from '../../services/api/auth/auth';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

const TITLES: Record<string, string> = {
  dashboard:  'Dashboard',
  warehouses: 'Warehouses',
  inventory:  'Inventory',
  settings:   'Settings',
};

function titleFromUrl(url: string): string {
  return TITLES[url.split('/')[1] ?? ''] ?? 'Dashboard';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit {
  private auth   = inject(Auth);
  private router = inject(Router);

  pageTitle = signal(titleFromUrl(this.router.url));
  userName  = signal(this.auth.getUserName());
  userRole  = signal(this.auth.getRole());
  initials  = signal(this.auth.getInitials());

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.pageTitle.set(titleFromUrl((e as NavigationEnd).urlAfterRedirects)));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
