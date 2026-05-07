import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  template: `
    <div class="search-box">
      <i class="pi pi-search search-icon"></i>
      <input
        pInputText
        type="text"
        [placeholder]="placeholder()"
        [(ngModel)]="value"
        class="search-input"
      />
    </div>
  `,
  styleUrl: './search-box.scss',
})
export class SearchBoxComponent {
  value       = model('');
  placeholder = input('Search...');
}
