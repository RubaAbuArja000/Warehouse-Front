import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-base-input',
  standalone: true,
  imports: [FormsModule, InputTextModule],
  templateUrl: './base-input.html',
  styleUrl: './base-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInput),
      multi: true,
    },
  ],
})
export class BaseInput implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');

  value = signal('');
  disabled = signal(false);

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
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

  onValueChange(value: string): void {
    this.value.set(value);

    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
