import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './base-button.html',
  styleUrl: './base-button.scss',
})
export class BaseButton {
  label = input<string>('');
  icon = input<string>('');

  iconPos = input<'left' | 'right' | 'top' | 'bottom'>('left');

  severity = input<'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast' | null>(null);

  size = input<'small' | 'large' | undefined>(undefined);

  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  text = input<boolean>(false);
  rounded = input<boolean>(false);
  fluid = input<boolean>(false);

  type = input<'button' | 'submit' | 'reset'>('button');

  tooltip = input<string>('');
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  onClick = output<MouseEvent>();
}
