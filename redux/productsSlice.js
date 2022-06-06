import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    setProducts: (state, payload) => {
      state.products.push(payload);
    },
    addToCart: (state, name) => {
      const cartObject = state.products.map((item) => item.payload);

      const products = cartObject[0];

      const results = products.map((product) => {
        // eslint-disable-next-line no-unused-expressions
        product.title === name ? product : null;
      });

      console.log(results);

      state.cart.push(results);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, addToCart } = productsSlice.actions;

export default productsSlice.reducer;
