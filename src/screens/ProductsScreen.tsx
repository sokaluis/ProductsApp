import React, { useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProductsContext } from '../context/ProductsContext';

export const ProductsScreen = () => {
  const { products } = useContext(ProductsContext);
  // TODO: create a pull to refresh
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={product => product._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Text key={index} style={styles.productText}>
              {item.nombre}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  productText: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0, 0.5)',
    marginVertical: 5,
  },
});
