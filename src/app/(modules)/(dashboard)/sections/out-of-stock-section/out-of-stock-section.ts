import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-out-of-stock',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './out-of-stock-section.html',
  styleUrl: './out-of-stock-section.scss',
})
export class OutOfStockComponent {
  protected state = inject(DashboardStateManagement);

  protected chartOption = computed<EChartsOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 120, right: 60, top: 10, bottom: 20 },
    xAxis: { type: 'value', min: 0, max: 1, show: false },
    yAxis: {
      type: 'category',
      data: this.state.outOfStock().map(i => i.name),
      axisLabel: { fontSize: 11, width: 110, overflow: 'truncate' },
    },
    series: [{
      type: 'bar',
      data: this.state.outOfStock().map(() => 1),
      itemStyle: { color: '#ef4444', borderRadius: [0, 4, 4, 0] },
      barMaxWidth: 20,
      label: { show: true, position: 'right', formatter: 'Out', fontSize: 10, color: '#6b7280' },
    }],
  }));
}
