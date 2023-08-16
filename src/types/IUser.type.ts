export enum UserRoleEnums {
  employee = "employee",
  manager = "manager",
}

type UserRole = keyof typeof UserRoleEnums;

export interface IUser {
  id: number | string
  name?: string
  surname?: string
  role?: UserRole
  number?: string
  avatar?: string
}
