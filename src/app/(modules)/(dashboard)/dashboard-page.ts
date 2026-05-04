import { Component } from '@angular/core';
import { WarehouseStatusComponent } from './sections/warehouse-status/warehouse-status';
import { StockInsightsComponent } from './sections/stock-insights/stock-insights';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WarehouseStatusComponent, StockInsightsComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardComponent {}
