import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InventoryHeaderComponent } from './sections/inventory-header-section/inventory-header-section';
import { InventoryTableComponent } from './sections/inventory-table-section/inventory-table-section';
import { InventoryStateService } from '../../services/api/inventory/inventory-state.service';

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
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.scss',
  providers: [MessageService, ConfirmationService, InventoryStateService],
})
export class InventoryComponent implements OnInit {
  protected state = inject(InventoryStateService);

  ngOnInit(): void {
    this.state.load();
  }
}
