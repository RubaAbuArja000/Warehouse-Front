import { Component } from '@angular/core';

@Component({
  selector: 'app-items',
  standalone: true,
  template: `<div class="page-shell"><h2>Items</h2></div>`,
  styles: [`.page-shell { padding: 1.5rem; }`],
})
export class ItemsComponent {}
