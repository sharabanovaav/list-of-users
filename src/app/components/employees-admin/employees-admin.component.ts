import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/model/employee';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

/**
 * Админка сотрудников
 */
@Component({
  selector: 'app-employees-admin',
  templateUrl: './employees-admin.component.html',
  styleUrls: ['./employees-admin.component.scss']
})
export class EmployeesAdminComponent implements OnInit, OnDestroy {

  displayedColumns = ['index', 'avatar', 'firstName', 'lastName', 'age', 'aggregator', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  lastNameFilter = new FormControl();

  private employees: Employee[] = [];
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.subscribeToFilter();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  /**
   * Возвращает агрегатор
   */
  getAggregator(item: Employee): string {
    return `${item.name.first[0]}.${item.name.last[0]}. - ${item.email}`;
  }

  /**
   * Удаляет сотрудника
   */
  delete(guid: string): void {
    this.employeeService.delete(guid);
    this.getEmployees();
  }

  /**
   * Открывает модальное окно создания / редактирования сотрудника
   */
  openModal(data?: Employee): void {
    this.dialog.open(EmployeeModalComponent, {
      panelClass: 'admin-modal',
      data
    })
      .afterClosed()
      .subscribe(employee => {
        if (employee) {
          employee.guid ? this.employeeService.edit(employee) : this.employeeService.create(employee);
          this.getEmployees();
        }
      });
  }

  /**
   * Загружает сотрудников
   */
  private getEmployees(): void {
    this.employees = this.employeeService.get(this.lastNameFilter.value);
    this.dataSource.data = this.employees;
  }

  /**
   * Подписывается на изменение значения фильтра
   */
  private subscribeToFilter(): void {
    this.lastNameFilter.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.getEmployees();
      });
  }
}
