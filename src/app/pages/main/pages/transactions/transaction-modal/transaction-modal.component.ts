import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionForm, TransactionType } from '../transaction.model';
import { CommonModule } from '@angular/common';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownValue } from '../../../../../models/inputs.model';
import { TransactionsConfig } from '../transactions.config';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

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
    console.log(this.transactionForm()?.getRawValue());
  }

  ngOnInit() {
    this.buildForm();
    this.categories.set(this.config.getCategories());
  }
}
