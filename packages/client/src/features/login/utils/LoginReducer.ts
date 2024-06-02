export type ReducerState = {
    email: string,
    password: string,
    errorMessage: string,
    isLoading: boolean,
    isFormValidated: boolean
}

export const ReducerActionValues = {
    email: 'EMAIL',
    password: 'PASSWORD',
    formValidation: 'FORM'
} as const;

export type EmailAction = {
    type: 'EMAIL',
    value: string
}

export type PasswordAction = {
    type: 'PASSWORD',
    value: string
}

export type FormValidationAction = {
    type: 'FORM',
    value: boolean
}

export type ReducerAction = EmailAction | PasswordAction | FormValidationAction;

export const initialLoginState: ReducerState = {
    email: "gandalf.the.grey@test.com",
    password: "123code",
    errorMessage: "",
    isLoading: false,
    isFormValidated: false
}

export const loginReducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
        case ReducerActionValues.email:
            return { ...state, email: action.value }
        case ReducerActionValues.password:
            return { ...state, password: action.value }
        case ReducerActionValues.formValidation:
            return { ...state, isFormValidated: action.value }
        default:
            return state
    }
}
