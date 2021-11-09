import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductScreen } from '../screens/ProductScreen';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: { id?: string; name?: string };
};

const Stack = createStackNavigator<ProductsStackParams>();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
