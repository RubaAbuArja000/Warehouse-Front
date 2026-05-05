import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { WarehouseHeaderComponent } from './sections/warehouse-header-section/warehouse-header-section';
import { WarehouseTableComponent } from './sections/warehouse-table-section/warehouse-table-section';
import { WarehousesStateManagement } from './state-management/warehouses-state-management';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    WarehouseHeaderComponent,
    WarehouseTableComponent,
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
