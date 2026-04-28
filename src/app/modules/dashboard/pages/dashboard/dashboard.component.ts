import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `<div class="page-shell"><h2>Dashboard</h2></div>`,
  styles: [`.page-shell { padding: 1.5rem; }`],
})
export class DashboardComponent {}
