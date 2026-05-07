import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { WarehouseHeaderComponent } from './sections/warehouse-header-section/warehouse-header-section';
import { WarehouseTableComponent } from './sections/warehouse-table-section/warehouse-table-section';
import { WarehousesStateManagement } from './state-management/warehouses-state-management';
import { BaseInput } from '../../theme/components/base-input/base-input';
import { BaseButton } from '../../theme/components/base-button/base-button';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    WarehouseHeaderComponent,
    WarehouseTableComponent,
    BaseInput,
    BaseButton,
  ],
  templateUrl: './warehouses-page.html',
  styleUrl: './warehouses-page.scss',
  providers: [WarehousesStateManagement],
})
export class WarehousesComponent implements OnInit {
  protected state = inject(WarehousesStateManagement);

  ngOnInit(): void {
    this.state.load();
  }
}
