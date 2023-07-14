import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/products';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState:ProductsState = {
  products: [],
    status: 'idle',
    error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        // @ts-ignore
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

