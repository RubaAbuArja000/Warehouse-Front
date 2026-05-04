import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { InventoryStateService } from '../../../../services/api/inventory/inventory-state.service';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
  ],
  templateUrl: './inventory-table-section.html',
  styleUrl: './inventory-table-section.scss',
})
export class InventoryTableComponent {
  protected state = inject(InventoryStateService);
}
