import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement  } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './low-stock-section.html',
  styleUrl: './low-stock-section.scss',
})
export class LowStockComponent {
  protected state = inject(DashboardStateManagement);

  protected chartOption = computed<EChartsOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 120, right: 20, top: 10, bottom: 20 },
    xAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    yAxis: {
      type: 'category',
      data: this.state.lowStockItems().map(i => i.name),
      axisLabel: { fontSize: 11, width: 110, overflow: 'truncate' },
    },
    series: [{
      type: 'bar',
      data: this.state.lowStockItems().map(i => i.quantity),
      itemStyle: { color: '#f59e0b', borderRadius: [0, 4, 4, 0] },
      barMaxWidth: 28,
    }],
  }));
}
