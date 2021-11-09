/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({ navigation }: Props) => {
  const { logOut } = useContext(AuthContext);
  const { products, loadProducts } = useContext(ProductsContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerRight}
          onPress={() => {
            navigation.navigate('ProductScreen', {
              name: 'New Product',
            });
          }}>
          <Text style={styles.headerRightText}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  // TODO: create a pull to refresh
  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={logOut} />
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.productItem}
            onPress={() => {
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              });
            }}>
            <Text key={index} style={styles.productText}>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsFromBackend}
            progressViewOffset={10}
            tintColor="white"
            title="Refreshing"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  productItem: {
    width: '100%',
    paddingVertical: 20,
  },
  productText: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0, 0.5)',
    marginVertical: 5,
  },
  headerRight: {
    marginRight: 20,
  },
  headerRightText: {},
});
