import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { InventoryStateManagement } from '../../state-management/inventory-state-management';
import { BaseButton } from '../../../../theme/components/base-button/base-button';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    BaseButton,
  ],
  templateUrl: './inventory-table-section.html',
  styleUrl: './inventory-table-section.scss',
})
export class InventoryTableComponent {
  protected state = inject(InventoryStateManagement);
}
