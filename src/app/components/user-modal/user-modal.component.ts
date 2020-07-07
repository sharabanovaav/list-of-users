import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';

/**
 * Модальное окно с формой создания / редактирования
 */
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
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
