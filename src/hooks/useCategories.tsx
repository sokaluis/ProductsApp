/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';
import coffeAPI from '../api/coffeAPI';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const getCategories = async () => {
    const { data } = await coffeAPI.get<CategoriesResponse>('/categorias');

    setCategories(data.categorias);
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    isLoading,
    categories,
  };
};
