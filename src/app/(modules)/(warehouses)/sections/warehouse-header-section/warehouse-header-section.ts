import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { WarehousesStateManager } from '../../services/warehouses-state-management';

@Component({
  selector: 'app-warehouse-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './warehouse-header-section.html',
  styleUrl: './warehouse-header-section.scss',
})
export class WarehouseHeaderComponent {
  protected state = inject(WarehousesStateManager);
}
