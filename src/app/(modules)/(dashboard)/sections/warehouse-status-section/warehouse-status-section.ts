import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DashboardApiService } from '../../../../services/api/dashboard/dashboard-api-service';
import { WarehouseStatus } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-warehouse-status',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './warehouse-status-section.html',
  styleUrl: './warehouse-status-section.scss',
})
export class WarehouseStatusComponent implements OnInit {
  private api = inject(DashboardApiService);

  status  = signal<WarehouseStatus[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.api.getWarehouseStatus().subscribe({
      next:  (data) => { this.status.set(data);  this.loading.set(false); },
      error: ()     => {                           this.loading.set(false); },
    });
  }
}
