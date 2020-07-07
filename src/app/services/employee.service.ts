import { Injectable } from '@angular/core';
import { USERS } from '../mocks/users-list';
import { User } from '../model/user';

/**
 * Сервис сотрудников
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  users = USERS;

  /**
   * Возвращает сотрудников
   */
  get(filter?: string): User[] {
    if (filter) {
      return this.users.filter(user => user.name.last.toLowerCase().includes(filter.toLowerCase()));
    }

    return this.users;
  }

  /**
   * Удаляет сотрудника по гуиду
   */
  delete(guid: string): void {
    this.users = this.users.filter(user => user.guid !== guid);
  }

  /**
   * Редактирует сотрудника
   */
  edit(user: User): void {
    const userIndex = this.users.findIndex(item => user.guid === item.guid);
    this.users[userIndex] = user;
  }

  /**
   * Добавляет сотрудника
   */
  create(user: User): void {
    user.guid = this.generateGuid();
    this.users.push(user);
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
