import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { WarehousesStateManagement } from '../../state-management/warehouses-state-management';

@Component({
  selector: 'app-warehouse-table',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './warehouse-table-section.html',
  styleUrl: './warehouse-table-section.scss',
})
export class WarehouseTableComponent {
  protected state = inject(WarehousesStateManagement);
}
