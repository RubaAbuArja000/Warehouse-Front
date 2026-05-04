import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { WarehouseApiService } from '../../services/api/warehouse/warehouse-api-service';
import { Warehouse } from '../../models/warehouse.model';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    TableModule, ButtonModule, InputTextModule,
    IconFieldModule, InputIconModule,
    DialogModule, ToastModule, ConfirmDialogModule,
  ],
  templateUrl: './warehouses-page.html',
  styleUrl: './warehouses-page.scss',
  providers: [MessageService, ConfirmationService],
})
export class WarehousesComponent implements OnInit {
  private api         = inject(WarehouseApiService);
  private fb          = inject(FormBuilder);
  private toast       = inject(MessageService);
  private confirm     = inject(ConfirmationService);

  warehouses  = signal<Warehouse[]>([]);
  loading     = signal(true);
  saving      = signal(false);
  showDialog  = signal(false);
  editingId   = signal<number | null>(null);
  query       = signal('');

  isEditing  = computed(() => this.editingId() !== null);
  filtered   = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.warehouses();
    return this.warehouses().filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.city.toLowerCase().includes(q) ||
        w.country.toLowerCase().includes(q),
    );
  });

  form: FormGroup = this.fb.group({
    name:    ['', Validators.required],
    address: ['', Validators.required],
    city:    ['', Validators.required],
    country: ['', Validators.required],
  });

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.api.getAll().subscribe({
      next:  (data) => { this.warehouses.set(data); this.loading.set(false); },
      error: ()     => { this.loading.set(false); this.error('Failed to load warehouses'); },
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.reset();
    this.showDialog.set(true);
  }

  openEdit(w: Warehouse): void {
    this.editingId.set(w.id);
    this.form.patchValue(w);
    this.showDialog.set(true);
  }

  save(): void {
    if (this.form.invalid) return;
    this.saving.set(true);
    const v = this.form.value;

    const request$ = this.isEditing()
      ? this.api.update(this.editingId()!, { id: this.editingId()!, ...v })
      : this.api.create(v);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.showDialog.set(false);
        this.success(this.isEditing() ? 'Warehouse updated' : 'Warehouse created');
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.error('Failed to save warehouse');
      },
    });
  }

  delete(w: Warehouse): void {
    this.confirm.confirm({
      message: `Delete "${w.name}"? This cannot be undone.`,
      header:  'Confirm Delete',
      icon:    'pi pi-exclamation-triangle',
      accept:  () => {
        this.api.delete(w.id).subscribe({
          next:  () => { this.warehouses.update((list) => list.filter((x) => x.id !== w.id)); this.success('Warehouse deleted'); },
          error: () => this.error('Failed to delete warehouse'),
        });
      },
    });
  }

  private success(detail: string): void {
    this.toast.add({ severity: 'success', summary: 'Success', detail });
  }

  private error(detail: string): void {
    this.toast.add({ severity: 'error', summary: 'Error', detail });
  }
}
