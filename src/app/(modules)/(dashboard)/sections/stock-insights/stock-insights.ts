import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { DashboardApiService } from '../../../../services/api/dashboard/dashboard-api-service';
import { DashboardItem } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-stock-insights',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './stock-insights.html',
  styleUrl: './stock-insights.scss',
})
export class StockInsightsComponent implements OnInit {
  private api = inject(DashboardApiService);

  highItems = signal<DashboardItem[]>([]);
  lowItems  = signal<DashboardItem[]>([]);
  loading   = signal(true);

  ngOnInit(): void {
    forkJoin({
      high: this.api.getTopHighItems(),
      low:  this.api.getTopLowItems(),
    }).subscribe({
      next: ({ high, low }) => {
        this.highItems.set(high);
        this.lowItems.set(low);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
