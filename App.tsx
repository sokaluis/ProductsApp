import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { IChildrenAsProps } from './src/interfaces/appInterfaces';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigator/StackNavigator';

const AppProvider = ({ children }: IChildrenAsProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <StackNavigator />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
