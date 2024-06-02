import { Dispatch, Reducer, createContext } from "react"
import { Transaction } from "../../../lib-common/types/Transaction";

/**
 * API types
 */

// FetchResponse will be the return type of all API calls
export type FetchResponse = {
    response: number,
    data: LoginResponse | TransactionResponse | SMEResponse | User[] | null,
    error: ErrorResponse | null,
    loading: boolean,
}

export type LoginBodyParameters = {
    email: string,
    password: string
}

export type LoginResponse = {
    token: string
}

// type guard functions for quick type checking
export function isLoginResponse(data: any): data is LoginResponse {
    return data && typeof data.token === 'string';
}

export type SMEResponse = {
    id: string,
    legalName: string,
    businessType: string
}

export type User = {
    id: string,
    name: string,
    email: string,
    profileImage: string
}

export type TransactionMeta = {
    limit: number,
    offset: number,
    status: string,
    userId: string,
    smeId: string,
    total: number
}

export type TransactionResponse = {
    data: Transaction[],
    meta: TransactionMeta
}

export const isTransactionResponse = (obj: any): obj is TransactionResponse => {
    return typeof obj === 'object' && obj !== null && 'data' in obj && 'meta' in obj;
}

export type ErrorResponse = {
    error: string,
    message: string
}

export const TransactionStringDict: { [key: string]: string } = {
    'id': 'Transaction ID',
    'userId': 'User ID',
    'smeId': 'SME ID',
    'transactionTime': 'Transaction Time',
    'merchantIconUrl': 'Merchant Icon URL',
    'merchantName': 'Merchant Name',
    'amount': 'Amount',
    'currency': 'Currency',
    'status': 'Status',
    'rejectionReason': 'Rejection Reason'
} as const;

/**
 * Globally available reducer state
 */

export type ReducerState = {
    userToken: string | null,
    userObject: User | null,
    smeData: SMEResponse | null,
    error: ErrorResponse | null
}

export type ReducerAction = {
    type: string,
    value: any,
}

export const reducerActionTypes = {
    userToken: "SET_USER_TOKEN",
    userObject: "SET_USER_OBJECT",
    smeData: "SET_SMD_DATA",
    error: "SET_ERROR"
  } as const;

export const GlobalUserContext = createContext<
{ userDataState: ReducerState | null; dispatch: Dispatch<ReducerAction> }
>
({
    userDataState: null,
    dispatch: () => {}
});