import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { IChildrenAsProps } from './src/interfaces/appInterfaces';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigator/StackNavigator';
import { LogBox } from 'react-native';
import { ProductsProvider } from './src/context/ProductsContext';
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']); // Ignore log notification by message

const AppProvider = ({ children }: IChildrenAsProps) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <>{children}</>
      </ProductsProvider>
    </AuthProvider>
  );
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
