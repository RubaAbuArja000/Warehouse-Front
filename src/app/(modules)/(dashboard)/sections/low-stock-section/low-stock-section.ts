import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './low-stock-section.html',
  styleUrl: './low-stock-section.scss',
})
export class LowStockComponent {
  protected state = inject(DashboardStateManagement);

  protected chartOption = computed<EChartsOption>(() => {
    const items = this.state.lowStockItems();

    if (items.length === 0)
      return {
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: { text: 'No data available', fontSize: 13, fill: '#9ca3af' },
          },
        ],
      };

    const total = items.reduce((s, i) => s + i.quantity, 0);

    return {
      animation: true,
      animationDuration: 600,
      animationEasing: 'cubicOut' as const,

      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = params[0];
          const pct = total > 0 ? ((p.value / total) * 100).toFixed(1) : '0.0';
          return `<strong>${p.name}</strong><br/>Qty: ${p.value.toLocaleString()} (${pct}%)`;
        },
      },

      grid: { left: 50, right: 20, top: 20, bottom: 40 },

      xAxis: {
        type: 'value',
        axisLabel: { fontSize: 11, color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLine: { show: false },
      },

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
          data: items.map((i) => i.quantity),
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#d97706' },
                { offset: 1, color: '#fde68a' },
              ],
            },
          },
          barMaxWidth: 22,
          emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(217,119,6,0.25)' } },
        },
      ],
    };
  });
}
