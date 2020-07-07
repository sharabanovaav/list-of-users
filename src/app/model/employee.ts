export interface Employee {
  guid: string;
  age: number;
  name: EmployeeName;
  email: string;
}

interface EmployeeName {
  first: string;
  last: string;
}
