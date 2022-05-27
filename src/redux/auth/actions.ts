export enum Actions {

    CREATE_ACCOUNT = "AUTH_CREATE_ACCOUNT",

    SIGN_IN = "AUTH_SIGN_IN"
}


export const CREATE_ACCOUNT = pin => {
    return {
      type: 'AUTH_CREATE_ACCOUNT',
      payload: pin
    }
}

export interface CreateAccountAction {
    type: Actions.CREATE_ACCOUNT;
    pin: string;
}

export interface SignInAction {
    type: Actions.CREATE_ACCOUNT;
    pin: string;
}