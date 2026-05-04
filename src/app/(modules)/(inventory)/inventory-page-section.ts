import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { forkJoin } from 'rxjs';
import { WarehouseItemApiService } from '../../services/api/warehouse-item/warehouse-item-api-service';
import { WarehouseApiService } from '../../services/api/warehouse/warehouse-api-service';
import { WarehouseItem } from '../../services/api/warehouse-item/models/warehouse-item.model';
import { Warehouse } from '../../services/api/warehouse/models/warehouse.model';
import { InventoryHeaderComponent } from './sections/inventory-header-section/inventory-header-section';
import { InventoryTableComponent } from './sections/inventory-table-section/inventory-table-section';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    InventoryHeaderComponent,
    InventoryTableComponent,
  ],
  templateUrl: './inventory-page-section.html',
  styleUrl: './inventory-page-section.scss',
  providers: [MessageService, ConfirmationService],
})
export class InventoryComponent implements OnInit {
  private itemApi = inject(WarehouseItemApiService);
  private warehouseApi = inject(WarehouseApiService);
  private fb = inject(FormBuilder);
  private toast = inject(MessageService);
  private confirm = inject(ConfirmationService);

  items = signal<WarehouseItem[]>([]);
  warehouses = signal<Warehouse[]>([]);
  loading = signal(true);
  saving = signal(false);
  showDialog = signal(false);
  editingId = signal<number | null>(null);
  filterWh = signal<number | null>(null);
  query = signal('');

  isEditing = computed(() => this.editingId() !== null);

  filtered = computed(() => {
    let list = this.items();
    const wid = this.filterWh();
    if (wid) list = list.filter((i) => i.warehouseId === wid);
    const q = this.query().toLowerCase().trim();
    if (q)
      list = list.filter(
        (i) => i.itemName.toLowerCase().includes(q) || (i.skuCode ?? '').toLowerCase().includes(q),
      );
    return list;
  });

  warehouseOptions = computed(() => this.warehouses().map((w) => ({ label: w.name, value: w.id })));

  form: FormGroup = this.fb.group({
    itemName: ['', Validators.required],
    skuCode: [''],
    quantity: [1, [Validators.required, Validators.min(1)]],
    costPrice: [0, [Validators.required, Validators.min(0)]],
    msrpPrice: [null],
    warehouseId: [null, Validators.required],
  });

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    forkJoin({ items: this.itemApi.getAll(), warehouses: this.warehouseApi.getAll() }).subscribe({
      next: ({ items, warehouses }) => {
        this.items.set(items);
        this.warehouses.set(warehouses);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error('Failed to load inventory');
      },
    });
  }

  openCreate(): void {
    this.editingId.set(null);
    this.form.reset({ quantity: 1, costPrice: 0 });
    this.showDialog.set(true);
  }

  openEdit(item: WarehouseItem): void {
    this.editingId.set(item.id);
    this.form.patchValue({
      itemName: item.itemName,
      skuCode: item.skuCode ?? '',
      quantity: item.quantity,
      costPrice: item.costPrice,
      msrpPrice: item.msrpPrice ?? null,
      warehouseId: item.warehouseId,
    });
    this.showDialog.set(true);
  }

  save(): void {
    if (this.form.invalid) return;
    this.saving.set(true);
    const v = this.form.value;

    const request$ = this.isEditing()
      ? this.itemApi.update(this.editingId()!, v)
      : this.itemApi.create(v);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.showDialog.set(false);
        this.success(this.isEditing() ? 'Item updated' : 'Item created');
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.error('Failed to save item');
      },
    });
  }

  delete(item: WarehouseItem): void {
    this.confirm.confirm({
      message: `Delete "${item.itemName}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        this.itemApi.delete(item.id).subscribe({
          next: () => {
            this.items.update((list) => list.filter((x) => x.id !== item.id));
            this.success('Item deleted');
          },
          error: () => this.error('Failed to delete item'),
        }),
    });
  }

  private success(detail: string): void {
    this.toast.add({ severity: 'success', summary: 'Success', detail });
  }
  private error(detail: string): void {
    this.toast.add({ severity: 'error', summary: 'Error', detail });
  }
}
