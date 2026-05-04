import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-warehouse-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './warehouse-header.html',
  styleUrl: './warehouse-header.scss',
})
export class WarehouseHeaderComponent {
  @Output() addClicked = new EventEmitter<void>();

  onAddClick(): void {
    this.addClicked.emit();
  }
}
