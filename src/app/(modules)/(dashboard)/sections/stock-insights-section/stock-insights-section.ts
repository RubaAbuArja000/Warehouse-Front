import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-stock-insights',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './stock-insights-section.html',
  styleUrl: './stock-insights-section.scss',
})
export class StockInsightsComponent {
  protected state = inject(DashboardStateManagement);

  protected chartOption = computed<EChartsOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 120, right: 20, top: 10, bottom: 20 },
    xAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    yAxis: {
      type: 'category',
      data: this.state.highItems().map(i => i.name),
      axisLabel: { fontSize: 11, width: 110, overflow: 'truncate' },
    },
    series: [{
      type: 'bar',
      data: this.state.highItems().map(i => i.quantity),
      itemStyle: { color: '#16a34a', borderRadius: [0, 4, 4, 0] },
      barMaxWidth: 28,
    }],
  }));
}
