import { Component, inject } from '@angular/core';
import { InventoryStateManagement } from '../../state-management/inventory-state-management';
import { BaseButton } from '../../../../theme/components/base-button/base-button';

@Component({
  selector: 'app-inventory-header',
  standalone: true,
  imports: [BaseButton],
  templateUrl: './inventory-header-section.html',
  styleUrl: './inventory-header-section.scss',
})
export class InventoryHeaderComponent {
  protected state = inject(InventoryStateManagement);
}
