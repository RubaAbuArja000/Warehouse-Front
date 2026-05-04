import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-inventory-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './inventory-header-section.html',
  styleUrl: './inventory-header-section.scss',
})
export class InventoryHeaderComponent {
  addClicked = output<void>();
}
