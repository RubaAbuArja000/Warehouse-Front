import { Component, inject } from '@angular/core';
import { WarehousesStateManagement } from '../../state-management/warehouses-state-management';
import { BaseButton } from '../../../../theme/components/base-button/base-button';

@Component({
  selector: 'app-warehouse-header',
  standalone: true,
  imports: [BaseButton],
  templateUrl: './warehouse-header-section.html',
  styleUrl: './warehouse-header-section.scss',
})
export class WarehouseHeaderComponent {
  protected state = inject(WarehousesStateManagement);
}
