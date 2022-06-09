import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
};

export const productFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    try {
      const { data } = await axios.get('https://raw.githubusercontent.com/stone-pagamentos/desafio-mobile/master/store/products.json');

      return data;
    } catch (err) {
      console.log('erro', err);

      return [];
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: {
    // immer, to change a immutable state
    [productFetch.pending]: (state) => {
      state.loading = true;
    },
    [productFetch.fulfilled]: (state, action) => {
      state.products.push(...action.payload);
    },
    [productFetch.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default productsSlice.reducer;
