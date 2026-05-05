import { Component, OnInit, inject } from '@angular/core';
import { WarehouseStatusComponent } from './sections/warehouse-status-section/warehouse-status-section';
import { StockInsightsComponent } from './sections/stock-insights-section/stock-insights-section';
import { StockAlertsComponent } from './sections/stock-alerts-section/stock-alerts-section';
import { TopSellingComponent } from './sections/top-selling-section/top-selling-section';
import { LowStockComponent } from './sections/low-stock-section/low-stock-section';
import { OutOfStockComponent } from './sections/out-of-stock-section/out-of-stock-section';
import { DashboardStateManagement  } from './state-management/dashboard-state-management';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WarehouseStatusComponent,
    StockInsightsComponent,
    StockAlertsComponent,
    TopSellingComponent,
    LowStockComponent,
    OutOfStockComponent,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  providers: [DashboardStateManagement],
})
export class DashboardComponent implements OnInit {
  protected state = inject(DashboardStateManagement);

  ngOnInit(): void {
    this.state.load();
  }
}
