import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});
