import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-named-as-default
import productsSlice from './redux/productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});

export default store;
