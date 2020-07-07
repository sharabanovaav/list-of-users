export interface User {
  guid: string;
  age: number;
  name: UserName;
  email: string;
}

interface UserName {
  first: string;
  last: string;
}
