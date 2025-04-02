import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Transaction,
  TransactionForm,
  TransactionType,
} from '@app/models/transaction.model';
import { CommonModule } from '@angular/common';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownValue } from '@app/models/inputs.model';
import { TransactionsConfig } from '../transactions.config';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TransactionsService } from '@app/services/transactions.service';
import { finalize } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-transaction-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule,
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.scss',
  standalone: true,
})
export class TransactionModalComponent {
  transactionForm = signal<FormGroup<TransactionForm> | undefined>(undefined);
  categories = signal<DropdownValue[]>([]);

  private fb = inject(FormBuilder);
  private config = inject(TransactionsConfig);
  private transactionsService = inject(TransactionsService);
  private ref = inject(DynamicDialogRef);

  constructor() {}

  private buildForm() {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<TransactionForm>({
      category: fb.control(undefined),
      date: fb.control(undefined, Validators.required),
      type: fb.control(
        {
          value: TransactionType.INCOME,
          disabled: true,
        },
        Validators.required
      ),
      recipientOrSender: fb.control(undefined, Validators.required),
      amount: fb.control(undefined, Validators.required),
    });
    this.transactionForm.set(form);
  }

  onCategoryChange(event: SelectChangeEvent) {
    if (event.value) {
      this.transactionForm()?.get('type')?.setValue(TransactionType.EXPENSE);
    } else {
      this.transactionForm()?.get('type')?.setValue(TransactionType.INCOME);
    }
  }

  manageTransaction() {
    const formValue = this.transactionForm()?.getRawValue();
    const payload = {
      category: (formValue?.category as DropdownValue)?.value,
      amount: formValue?.amount!,
      date: formValue?.date!,
      recipientOrSender: formValue?.recipientOrSender!,
      type: formValue?.type!,
    } satisfies Transaction;

    return this.transactionsService
      .addTransaction(payload)
      .pipe(finalize(() => this.ref.close()))
      .subscribe(() => this.transactionsService.page.set(0));
  }

  ngOnInit() {
    this.buildForm();
    this.categories.set(this.config.getCategories());
  }
}
