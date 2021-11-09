/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import coffeAPI from '../api/coffeAPI';
import {
  IChildrenAsProps,
  Producto,
  ProductsResponse,
} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryID: string, productName: string) => Promise<void>;
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
    setProducts([...products, ...data.productos]);
  };
  const addProduct = async (categoryID: string, productName: string) => {
    console.log(categoryID, productName);
  };
  const updateProduct = async (
    categoryID: string,
    productName: string,
    productID: string,
  ) => {
    console.log(categoryID, productName, productID);
  };
  const deleteProduct = async (productID: string) => {
    console.log(productID);
  };
  const loadProductById = async (id: string) => {
    console.log(id);
    throw new Error('Not Implemented');
  };
  //TODO: change any type
  const uploadImage = async (data: any, id: string) => {
    console.log(id, data);
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
