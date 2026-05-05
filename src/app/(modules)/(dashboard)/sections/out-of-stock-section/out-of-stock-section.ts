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

  protected chartOption = computed<EChartsOption>(() => {
    const items = this.state.outOfStock();

    if (items.length === 0)
      return {
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: { text: 'All items in stock', fontSize: 13, fill: '#16a34a' },
          },
        ],
      };

    return {
      animation: true,
      animationDuration: 600,
      animationEasing: 'cubicOut' as const,

      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => `<strong>${params[0].name}</strong><br/>Out of stock`,
      },

      grid: { left: 120, right: 70, top: 10, bottom: 20 },

      xAxis: { type: 'value', min: 0, max: 1, show: false },

      yAxis: {
        type: 'category',
        data: items.map((i) => i.name),
        axisLabel: { fontSize: 11, color: '#374151', width: 110, overflow: 'truncate' },
        axisTick: { show: false },
        axisLine: { show: false },
      },

      series: [
        {
          type: 'bar',
          data: items.map(() => 1),
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#dc2626' },
                { offset: 1, color: '#fca5a5' },
              ],
            },
          },
          barMaxWidth: 18,
          label: {
            show: true,
            position: 'right',
            formatter: 'Out of stock',
            fontSize: 10,
            color: '#9ca3af',
          },
          emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(220,38,38,0.25)' } },
        },
      ],
    };
  });
}
