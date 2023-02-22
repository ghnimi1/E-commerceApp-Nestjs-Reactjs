import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { OrderServices } from '../../services/orderServices';
const initialState = {
  loading: false,
  orders: null,
  order: null,
  error: null,
  success: null,
};
export const paidOrder = createAsyncThunk('orders/paidorder', async (id) => {
  try {
    const res = await OrderServices.paidOrder(id);
    toast.success('Order Paid', {
      position: 'bottom-left',
      autoClose: 2000,
    });
    return await res;
  } catch (err) {
    let error =
      err.response && err.response.data.msg ? err.response.data.msg : err.msg;
    return error;
  }
});
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async () => {
    try {
      const res = await OrderServices.getOrders();
      return res.data;
    } catch (err) {
      let error =
        err.response && err.response.data.msg ? err.response.data.msg : err.msg;
      return error;
    }
  },
);
export const OrderDelivered = createAsyncThunk(
  'orders/deliveredorder',
  async (id) => {
    try {
      const res = await OrderServices.OrderDelivered(id);
      toast.success('Order Delivered', {
        position: 'bottom-left',
        autoClose: 2000,
      });
      return await res.data;
    } catch (err) {
      let error =
        err.response && err.response.data.msg ? err.response.data.msg : err.msg;
      return error;
    }
  },
);
export const fetchOrder = createAsyncThunk('orders/fetchOrder', async (id) => {
  try {
    const res = await OrderServices.getOrder(id);
    return res.data;
  } catch (err) {
    let error =
      err.response && err.response.data.msg ? err.response.data.msg : err.msg;
    return error;
  }
});

export const addOrder = createAsyncThunk('orders/addorder', async (order) => {
  try {
    const res = await OrderServices.addOrder(order);
    toast.success('New Order Added', {
      position: 'bottom-left',
      autoClose: 2000,
    });
    return res.data;
  } catch (err) {
    let error =
      err.response && err.response.data.msg ? err.response.data.msg : err.msg;
    return error;
  }
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllOrders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.success = true;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
