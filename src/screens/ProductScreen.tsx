/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route: { params }, navigation }: Props) => {
  const { loadProductById, addProduct, updateProduct, deleteProduct } =
    useContext(ProductsContext);
  const { id = '', name = '' } = params;
  const { categories, isLoading } = useCategories();
  const { _id, categoriaId, img, nombre, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: '',
    img: '',
  });
  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre de Producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    if (_id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      nombre: name,
      categoriaId: product.categoria._id,
      img: product.img ? product.img : '',
    });
  };

  const saveOrUpdate = async () => {
    if (_id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre);
      onChange(newProduct._id, '_id');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del Producto</Text>
        <TextInput
          placeholder="Producto"
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          style={styles.textInput}
        />
        <Text style={styles.label}>Categoría</Text>
        {isLoading ? (
          <ActivityIndicator size={30} color="black" />
        ) : (
          <Picker
            selectedValue={categoriaId}
            onValueChange={value => onChange(value, 'categoriaId')}>
            {categories.map(item => (
              <Picker.Item
                label={item.nombre}
                value={item._id}
                key={item._id}
              />
            ))}
          </Picker>
        )}
        <Button title="Guardar" onPress={saveOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <>
            <View style={styles.imageContainer}>
              <Button title="Cámara" onPress={() => {}} color="#5856D6" />
              <Button title="Galería" onPress={() => {}} color="#5856D6" />
            </View>
            <View style={styles.delete}>
              <Button
                title="Eliminar"
                color="red"
                onPress={() => deleteProduct(_id)}
              />
            </View>
          </>
        )}
        {img.length > 0 && (
          <Image source={{ uri: img }} style={styles.imageItem} />
        )}
        {/* {TODO: create temp image} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0, 0.2)',
    height: 45,
    marginVertical: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  imageItem: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
  delete: {
    marginTop: 20,
  },
});
