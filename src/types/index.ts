export interface Result {
  _id: string;
  email: string;
  selfpurchase: number;
  createdAt: string;
  referedBy?: string;
  referalId: string;
  referedUsers: number;
  totalReferedUsersPurchaseSum: number;
}

export interface UsersData {
  result: Result[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface ReferedUser {
  email: string;
  _id: string;
}

export interface UsersTransactions {
  result: TransactionsResult[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface TransactionsResult {
  referedBy: string;
  createdAt: string;
  transactionId: string;
  amount: number;
  email: string;
}

export interface UsersClaimRequest {
  result: UsersClaims[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface UsersClaims {
  _id: string;
  email: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
  transactionId: string;
}

export interface User_Personal_Transactions {
  transactions: PRSNL_Transaction[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface PRSNL_Transaction {
  account: string;
  txid: string;
  amount: number;
  isRewarded: boolean;
  referedBy: string;
  createdAt: string;
}

export interface TeamMembers {
  data: members[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface members {
  _id: string;
  email: string;
  referalId: string;
  referedBy: string;
  createdAt: string;
  reward: number;
}

export interface UsersClaimRequests {
  claimRequests: ClaimRequest[];
  page: number;
  perPage: number;
  totalRecords: number;
  totalPages: number;
}

export interface ClaimRequest {
  _id: string;
  email: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}