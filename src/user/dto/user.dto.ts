import { Account } from "src/account/entity/account.entity";

export interface CreateUserDTO {
  name: string,
  email: string,
  document: string,
  password: string,
  accountType: string;
}