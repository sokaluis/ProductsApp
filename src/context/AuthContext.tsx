import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthReducer } from './AuthReducer';
import {
  IChildrenAsProps,
  AuthContextProps,
  AuthState,
} from '../interfaces/appInterfaces';
import coffeAPI from '../api/coffeAPI';
import {
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/appInterfaces';

export const AuthContext = createContext({} as AuthContextProps);

const AuthInitialState: AuthState = {
  errorMessage: '',
  status: 'checking',
  token: null,
  user: null,
};

export const AuthProvider = ({ children }: IChildrenAsProps) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch({
        type: 'NOT_AUTH',
      });
    }
    const resp = await coffeAPI.get('/auth');

    if (resp.status !== 200) {
      return dispatch({
        type: 'NOT_AUTH',
      });
    }
    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({
      type: 'SIGN_IN_SIGN_UP',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const resp = await coffeAPI.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });

      dispatch({
        type: 'SIGN_IN_SIGN_UP',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });

      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'ADD_ERROR',
        payload: error.response.data.errors[0].msg || 'Información Incorrecta',
      });
    }
  };
  const signUp = async ({ correo, nombre, password }: RegisterData) => {
    try {
      const resp = await coffeAPI.post<LoginResponse>('/usuarios', {
        correo,
        nombre,
        password,
      });

      dispatch({
        type: 'SIGN_IN_SIGN_UP',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      dispatch({
        type: 'ADD_ERROR',
        payload: error.response.data.errors[0].msg || 'Información Incorrecta',
      });
    }
  };
  const removeError = () => {
    dispatch({
      type: 'REMOVE_ERROR',
    });
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({
      type: 'LOG_OUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        removeError,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
