import { User } from "src/user/entity/user.entity";
import { AccountType } from "../entity/account-type.entity";

export interface AccountTypeDTO {
  type: string;
}

export interface CreateAccountDTO {
  type: string;
  user: User;
}