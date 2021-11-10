import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import ProductsNavigator from './ProductsNavigator';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  ProductsNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const { status } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
        <>
          <Stack.Screen
            name="ProductsNavigator"
            component={ProductsNavigator}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LogInScreen" component={LogInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
