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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export interface TransactionsModalConfig {
  transaction: Transaction;
  isEditMode: boolean;
}

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
  private ref = inject(DynamicDialogRef);
  modalConfig = inject(DynamicDialogConfig<TransactionsModalConfig>);

  constructor() {}

  private buildForm(transaction: Transaction) {
    const fb = this.fb.nonNullable;
    const form = new FormGroup<TransactionForm>({
      category: fb.control(transaction?.category),
      date: fb.control(
        transaction?.date ? new Date(transaction.date) : undefined,
        Validators.required
      ),
      type: fb.control(
        {
          value:
            (transaction?.type as TransactionType) ?? TransactionType.INCOME,
          disabled: true,
        },
        Validators.required
      ),
      recipientOrSender: fb.control(
        transaction?.recipientOrSender,
        Validators.required
      ),
      amount: fb.control(transaction?.amount, Validators.required),
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
      amount:
        formValue?.type === TransactionType.EXPENSE
          ? formValue?.amount! * -1
          : formValue?.amount!,
      date: formValue?.date!,
      dateAdded: new Date(),
      recipientOrSender: formValue?.recipientOrSender!,
      type: formValue?.type!,
      ...(this.modalConfig.data?.isEditMode && {
        _id: this.modalConfig.data?.transaction?._id,
        userId: this.modalConfig.data?.transaction?.userId,
      }),
    } satisfies Transaction;

    this.ref.close(payload);
  }

  ngOnInit() {
    this.buildForm(this.modalConfig?.data?.transaction);
    this.categories.set(this.config.getCategories());
  }
}
