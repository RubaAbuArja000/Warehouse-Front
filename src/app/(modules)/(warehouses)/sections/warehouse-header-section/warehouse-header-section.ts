import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-warehouse-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './warehouse-header-section.html',
  styleUrl: './warehouse-header-section.scss',
})
export class WarehouseHeaderComponent {
  addClicked = output<void>();

  onAddClick(): void {
    this.addClicked.emit();
  }
}
