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
