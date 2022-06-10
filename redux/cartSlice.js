import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.thumbnailHd === action.payload.thumbnailHd,
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    removeFromCart(state, action) {
      const updatedCart = state.cartItems.filter(
        (cartItem) => cartItem.thumbnailHd !== action.payload.thumbnailHd,
      );

      state.cartItems = updatedCart;
    },
    removeAll(state) {
      state.cartItems = [];
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.thumbnailHd === action.payload.thumbnailHd,
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else {
        const updatedCart = state.cartItems.filter(
          (cartItem) => cartItem.thumbnailHd !== action.payload.thumbnailHd,
        );

        state.cartItems = updatedCart;
      }
    },
    getTotal(state) {
      const { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      }, {
        total: 0,
        quantity: 0,
      });

      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const {
  addToCart, removeFromCart, removeAll, decreaseCart, getTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
