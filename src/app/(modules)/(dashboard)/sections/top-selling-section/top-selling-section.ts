import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateService } from '../../services/dashboard-state-management';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './top-selling-section.html',
  styleUrl: './top-selling-section.scss',
})
export class TopSellingComponent {
  protected state = inject(DashboardStateService);

  protected chartOption = computed<EChartsOption>(() => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 20, top: 16, bottom: 36 },
    xAxis: {
      type: 'category',
      data: this.state.sellingItems().map(i => i.name),
      axisLabel: { fontSize: 11, interval: 0, overflow: 'truncate', width: 70 },
    },
    yAxis: { type: 'value', axisLabel: { fontSize: 11 } },
    series: [{
      type: 'bar',
      data: this.state.sellingItems().map(i => i.quantity),
      itemStyle: { color: '#6366f1', borderRadius: [4, 4, 0, 0] },
      barMaxWidth: 48,
    }],
  }));
}
