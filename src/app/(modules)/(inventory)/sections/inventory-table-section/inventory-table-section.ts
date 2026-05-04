import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { WarehouseItem } from '../../../../services/api/warehouse-item/models/warehouse-item.model';

interface SelectOption { label: string; value: number; }

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    FormsModule, CurrencyPipe,
    TableModule, ButtonModule, InputTextModule,
    IconFieldModule, InputIconModule, SelectModule,
  ],
  templateUrl: './inventory-table-section.html',
  styleUrl: './inventory-table-section.scss',
})
export class InventoryTableComponent {
  items            = input.required<WarehouseItem[]>();
  loading          = input.required<boolean>();
  query            = input.required<string>();
  filterWh         = input.required<number | null>();
  warehouseOptions = input.required<SelectOption[]>();

  queryChange    = output<string>();
  filterWhChange = output<number | null>();
  editItem       = output<WarehouseItem>();
  deleteItem     = output<WarehouseItem>();
}
