import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateManagement } from '../../state-management/dashboard-state-management';

@Component({
  selector: 'app-warehouse-status',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './warehouse-status-section.html',
  styleUrl: './warehouse-status-section.scss',
})
export class WarehouseStatusComponent {
  protected state = inject(DashboardStateManagement);

  private readonly COLORS = [
    '#3b82f6',
    '#16a34a',
    '#6366f1',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
    '#8b5cf6',
    '#f97316',
  ];

  protected chartOption = computed<EChartsOption>(() => {
    const data = this.state.status();

    if (data.length === 0)
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

    const total = data.reduce((s, w) => s + w.totalItems, 0);

    return {
      animation: true,
      animationDuration: 700,
      animationEasing: 'cubicOut' as const,
      color: this.COLORS,

      tooltip: {
        trigger: 'item',
        formatter: (p: any) => {
          const pct = total > 0 ? ((p.value / total) * 100).toFixed(1) : '0.0';
          return `<strong>${p.name}</strong><br/>Items: ${p.value.toLocaleString()} (${pct}%)`;
        },
      },

      legend: {
        bottom: 0,
        orient: 'horizontal',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 11, color: '#6b7280' },
      },

      series: [
        {
          name: 'Warehouse Status',
          type: 'pie',
          radius: ['42%', '68%'],
          center: ['50%', '46%'],
          avoidLabelOverlap: true,
          padAngle: 2,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, fontSize: 11, formatter: '{d}%' },
          labelLine: { show: true, length: 8, length2: 6 },
          emphasis: {
            scale: true,
            scaleSize: 6,
            itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,0.15)' },
          },
          data: data.map((w) => ({ name: w.warehouseName, value: w.totalItems })),
        },
      ],
    };
  });
}
