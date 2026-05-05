import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './top-selling-section.html',
  styleUrl: './top-selling-section.scss',
})
export class TopSellingComponent {
  protected state = inject(DashboardStateManagement);

  protected chartOption = computed<EChartsOption>(() => {
    const items = this.state.sellingItems();

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
      animationDuration: 800,
      animationEasing: 'cubicOut' as const,

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1e1b4b',
        borderColor: '#4f46e5',
        textStyle: { color: '#fff', fontSize: 12 },
        formatter: (params: any) => {
          const p = params[0];
          const pct = total > 0 ? ((p.value / total) * 100).toFixed(1) : '0.0';
          return `<strong>${p.name}</strong><br/>Sold: ${p.value.toLocaleString()} (${pct}%)`;
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
          type: 'bar',
          data: items.map((i) => i.quantity),
          barWidth: '50%',
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#4f46e5' },
                { offset: 1, color: '#818cf8' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(79,70,229,0.4)',
            },
          },
        },
      ],
    };
  });
}
