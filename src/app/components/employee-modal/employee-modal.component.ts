import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';

/**
 * Модальное окно с формой создания / редактирования
 */
@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private dialogRef: MatDialogRef<EmployeeModalComponent>,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  /**
   * Закрывает окно
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Закрывает окно, передает данные формы
   */
  submit(): void {
    if (this.form.valid) {
      const { firstName: first, lastName: last, age, email } = this.form.value;

      const data = {
        guid: this.data ? this.data.guid : null,
        name: {
          first,
          last,
        },
        age,
        email
      };

      this.dialogRef.close(data);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * Инициализирует форму
   */
  private initForm(): void {
    const { name, age, email } = { ...this.data };

    this.form = this.fb.group({
      firstName: [name ? name.first : null, [Validators.required, NoWhitespaceValidator]],
      lastName: [name ? name.last : null, [Validators.required, NoWhitespaceValidator]],
      age: [age, [Validators.required, Validators.min(0)]],
      email: [email, [Validators.required, Validators.email]]
    });
  }
}
