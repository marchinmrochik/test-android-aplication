import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        return JSON.parse(storedProducts);
      } else {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        await AsyncStorage.setItem('products', JSON.stringify(data));

        return data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
