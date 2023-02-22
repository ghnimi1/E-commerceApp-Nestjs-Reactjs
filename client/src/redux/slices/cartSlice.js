import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  error: null,
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info('Decreased product quantity', {
          position: 'bottom-left',
          autoClose: 2000,
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id,
        );

        state.cartItems = nextCartItems;

        toast.error('Product removed from cart', {
          position: 'bottom-left',
          autoClose: 2000,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id,
          );

          state.cartItems = nextCartItems;

          toast.error('Product removed from cart', {
            position: 'bottom-left',
            autoClose: 2000,
          });
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return state;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error('Cart cleared', { position: 'bottom-left' });
    },
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info('Increased product quantity', {
          position: 'bottom-left',
          autoClose: 2000,
        });
      } else {
        let tempProductItem = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProductItem);
        toast.success('Product added to cart', {
          position: 'bottom-left',
          autoClose: 2000,
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
