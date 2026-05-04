import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Warehouse } from '../../../../services/api/warehouse/models/warehouse.model';

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
  items = input.required<Warehouse[]>();
  loading = input.required<boolean>();

  query = input.required<string>();

  queryChange = output<string>();
  editWarehouse = output<Warehouse>();
  deleteWarehouse = output<Warehouse>();
}
