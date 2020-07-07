import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';

/**
 * Список сотрудников
 */
@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit, OnDestroy {

  lastNameFilter = new FormControl();
  displayedColumns = ['index', 'avatar', 'firstName', 'lastName', 'age', 'aggregator', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  private items: User[] = [];
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscribeToFilter();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  /**
   * Возвращает агрегатор
   */
  getAggregator(item: User): string {
    return `${item.name.first[0]}.${item.name.last[0]}. - ${item.email}`;
  }

  /**
   * Удаляет пользователя
   */
  delete(guid: string): void {
    this.employeeService.delete(guid);
    this.getUsers();
  }

  /**
   * Открывает модальное окно создания / редактирования пользователя
   */
  openModal(data?: User): void {
    this.dialog.open(UserModalComponent, {
      panelClass: 'admin-modal',
      data
    })
      .afterClosed()
      .subscribe(user => {
        if (user) {
          user.guid ? this.employeeService.edit(user) : this.employeeService.create(user);
          this.getUsers();
        }
      });
  }

  /**
   * Загружает пользователей
   */
  private getUsers(): void {
    this.items = this.employeeService.get(this.lastNameFilter.value);
    this.dataSource.data = this.items;
  }

  /**
   * Подписывается на изменение значения фильтра
   */
  private subscribeToFilter(): void {
    this.lastNameFilter.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.getUsers();
      });
  }
}
