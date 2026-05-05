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

  protected chartOption = computed<EChartsOption>(() => {
    const items = this.state.highItems();

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
        type: 'category',
        data: items.map((i) => i.name),
        axisLabel: { fontSize: 11, interval: 0, overflow: 'truncate', width: 70, color: '#6b7280' },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisTick: { show: false },
      },

      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 11, color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
      },

      series: [
        {
          type: 'line',
          data: items.map((i) => i.quantity),
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { color: '#16a34a', width: 2 },
          itemStyle: { color: '#16a34a', borderColor: '#fff', borderWidth: 2 },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(22,163,74,0.25)' },
                { offset: 1, color: 'rgba(22,163,74,0.02)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: { shadowBlur: 8, shadowColor: 'rgba(22,163,74,0.3)' },
          },
        },
      ],
    };
  });
}
