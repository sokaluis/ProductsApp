import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  LogInScreen: undefined;
  SigUpScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogInScreen" component={HomeScreen} />
      <Stack.Screen name="SigUpScreen" component={HomeScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
