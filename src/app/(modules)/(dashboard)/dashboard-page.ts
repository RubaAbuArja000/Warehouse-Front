import { Component } from '@angular/core';
import { WarehouseStatusComponent } from './sections/warehouse-status-section/warehouse-status-section';
import { StockInsightsComponent } from './sections/stock-insights-section/stock-insights-section';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WarehouseStatusComponent, StockInsightsComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardComponent {}
