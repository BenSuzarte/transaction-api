export interface SendTransactionDTO {
  value: number;
  sender: string;
  receiver: string;
  type: string;
}

export interface CreateTransactionTypeDTO {
  type: string
}