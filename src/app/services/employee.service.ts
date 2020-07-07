import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { EMPLOYEES } from '../mocks/employees-list';

/**
 * Сервис сотрудников
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = EMPLOYEES;

  /**
   * Возвращает сотрудников
   */
  get(filter?: string): Employee[] {
    if (filter) {
      return this.employees.filter(employee => employee.name.last.toLowerCase().includes(filter.toLowerCase()));
    }

    return this.employees;
  }

  /**
   * Удаляет сотрудника по гуиду
   */
  delete(guid: string): void {
    this.employees = this.employees.filter(employee => employee.guid !== guid);
  }

  /**
   * Редактирует сотрудника
   */
  edit(employee: Employee): void {
    const employeeIndex = this.employees.findIndex(item => employee.guid === item.guid);
    this.employees[employeeIndex] = employee;
  }

  /**
   * Добавляет сотрудника
   */
  create(employee: Employee): void {
    employee.guid = this.generateGuid();
    this.employees.push(employee);
  }

  /**
   * Генерирует гуиды
   * TODO: нужна проверка на уникальность
   */
  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, (c, r) => ('x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
  }
}
