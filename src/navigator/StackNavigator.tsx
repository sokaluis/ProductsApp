import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import ProductsNavigator from './ProductsNavigator';

export type RootStackParams = {
  HomeScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const { status } = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status === 'authenticated' ? (
        <Stack.Screen name="HomeScreen" component={ProductsNavigator} />
      ) : (
        <>
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
