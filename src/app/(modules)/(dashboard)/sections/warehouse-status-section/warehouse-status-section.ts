import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { DashboardStateService } from '../../services/dashboard-state-management';

@Component({
  selector: 'app-warehouse-status',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './warehouse-status-section.html',
  styleUrl: './warehouse-status-section.scss',
})
export class WarehouseStatusComponent {
  protected state = inject(DashboardStateService);

  protected chartOption = computed<EChartsOption>(() => {
    const data = this.state.status();

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },

      legend: {
        bottom: 0,
        orient: 'horizontal',
        textStyle: {
          fontSize: 11,
        },
      },

      series: [
        {
          name: 'Warehouse Status',
          type: 'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: true,

          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2,
          },

          label: {
            fontSize: 11,
            formatter: '{b}\n{d}%',
          },

          emphasis: {
            scale: true,
            scaleSize: 8,
          },

          labelLine: {
            show: true,
          },

          data: data.map((w) => ({
            name: w.warehouseName,
            value: w.totalItems,
          })),
        },
      ],
    };
  });
}
