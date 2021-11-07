import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { IChildrenAsProps } from './src/interfaces/appInterfaces';
import { StackNavigator } from './src/navigator/StackNavigator';

const AppProvider = ({ children }: IChildrenAsProps) => {
  return <>{children}</>;
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
