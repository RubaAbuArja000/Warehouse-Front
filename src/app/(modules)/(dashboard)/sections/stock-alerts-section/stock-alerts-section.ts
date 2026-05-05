import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateService } from '../../services/dashboard-state-management';

@Component({
  selector: 'app-stock-alerts',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './stock-alerts-section.html',
  styleUrl: './stock-alerts-section.scss',
})
export class StockAlertsComponent {
  protected state = inject(DashboardStateService);

  protected chartOption = computed<EChartsOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 120, right: 20, top: 10, bottom: 20 },
    xAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    yAxis: {
      type: 'category',
      data: this.state.lowItems().map(i => i.name),
      axisLabel: { fontSize: 11, width: 110, overflow: 'truncate' },
    },
    series: [{
      type: 'bar',
      data: this.state.lowItems().map(i => i.quantity),
      itemStyle: { color: '#f97316', borderRadius: [0, 4, 4, 0] },
      barMaxWidth: 28,
    }],
  }));
}
