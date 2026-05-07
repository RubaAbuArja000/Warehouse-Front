import { Component, input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  standalone: true,
  templateUrl: './base-card.html',
  styleUrl: './base-card.scss',
})
export class BaseCard {
  title = input<string>('');
  subtitle = input<string>('');

  shadow = input<boolean>(true);
  padding = input<boolean>(true);
  bordered = input<boolean>(false);
}
