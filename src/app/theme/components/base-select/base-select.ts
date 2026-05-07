import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-base-select',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './base-select.html',
  styleUrl: './base-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelect),
      multi: true,
    },
  ],
})
export class BaseSelect implements ControlValueAccessor {
  label = input<string>('');
  options = input<any[]>([]);
  optionLabel = input<string>('label');
  optionValue = input<string>('value');
  placeholder = input<string>('');
  appendTo = input<string>('');

  value = signal<any>(null);
  disabled = signal(false);

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onValueChange(value: any): void {
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
