import { AuthState, Usuario } from '../interfaces/appInterfaces';

type AuthAction =
  | {
      type: 'SIGN_IN_SIGN_UP';
      payload: { token: string; user: Usuario };
    }
  | { type: 'ADD_ERROR'; payload: string }
  | { type: 'REMOVE_ERROR' }
  | { type: 'NOT_AUTH' }
  | { type: 'LOG_OUT' };

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'ADD_ERROR':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        errorMessage: '',
      };

    case 'SIGN_IN_SIGN_UP':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'LOG_OUT':
    case 'NOT_AUTH':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
