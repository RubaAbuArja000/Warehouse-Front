import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InventoryStateService } from '../../../../services/api/inventory/inventory-state.service';

@Component({
  selector: 'app-inventory-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './inventory-header-section.html',
  styleUrl: './inventory-header-section.scss',
})
export class InventoryHeaderComponent {
  protected state = inject(InventoryStateService);
}
