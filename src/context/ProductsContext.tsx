/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import coffeAPI from '../api/coffeAPI';
import {
  IChildrenAsProps,
  Producto,
  ProductsResponse,
} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryID: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryID: string,
    productName: string,
    productID: string,
  ) => Promise<void>;
  deleteProduct: (productID: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO: change any type
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: IChildrenAsProps) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data } = await coffeAPI.get<ProductsResponse>(
      '/productos?limite=50',
    );
    setProducts(data.productos);
  };
  const addProduct = async (
    categoryID: string,
    productName: string,
  ): Promise<Producto> => {
    const { data } = await coffeAPI.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryID,
    });
    setProducts([...products, data]);

    return data;
  };
  const updateProduct = async (
    categoryID: string,
    productName: string,
    productID: string,
  ) => {
    const { data } = await coffeAPI.put<Producto>(`/productos/${productID}`, {
      nombre: productName,
      categoria: categoryID,
    });
    setProducts(products.map(prod => (prod._id === productID ? data : prod)));
  };
  const deleteProduct = async (productID: string) => {
    const { data } = await coffeAPI.delete<Producto>(`/productos/${productID}`);
    setProducts(products.filter(item => item._id !== data._id));
  };
  const loadProductById = async (id: string): Promise<Producto> => {
    const { data } = await coffeAPI.get<Producto>(`/productos/${id}`);
    return data;
  };
  //TODO: change any type
  const uploadImage = async (image: ImagePickerResponse, id: string) => {
    if (image.assets?.length === 0) {
      return;
    }
    const fileToUpload = {
      uri: image.assets![0].uri,
      type: image.assets![0].type,
      name: image.assets![0].fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      await coffeAPI.put<Producto>(`/uploads/productos/${id}`, formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
