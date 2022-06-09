import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import cartSlice, { getTotal } from './redux/cartSlice';
import productsSlice, { productFetch } from './redux/productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});

store.dispatch(productFetch());

store.dispatch(getTotal());

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme="dark" />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
