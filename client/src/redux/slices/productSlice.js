import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ProductServices } from '../../services/productServices';
const initialState = {
  loading: false,
  products: null,
  fiproducts: null,
  product: null,
  topProducts: null,
  error: null,
  success: false,
};

export const addProduct = createAsyncThunk(
  'product/addproduct',
  async (product) => {
    try {
      const res = await ProductServices.addProduct(product);
      toast.success('New Product Added', {
        position: 'bottom-left',
        autoClose: 2000,
      });
      return res.data;
    } catch (err) {
      let error =
        err.response && err.response.data ? err.response.data : err.message;
      return error;
    }
  },
);
export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async ({ keyword, pageNumber, sortBy, category }) => {
    try {
      const res = await ProductServices.getProducts(
        keyword,
        pageNumber,
        sortBy,
        category,
      );
      return res.data;
    } catch (err) {
      let error =
        err.response && err.response.data ? err.response.data : err.message;
      return error;
    }
  },
);

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id) => {
    try {
      const res = await ProductServices.getProduct(id);
      return res.data;
    } catch (err) {
      let error =
        err.response && err.response.data ? err.response.data : err.message;
      return error;
    }
  },
);

export const fetchTopProducts = createAsyncThunk(
  'product/top-rated',
  async () => {
    try {
      const res = await ProductServices.getTopProduct();
      return res.data;
    } catch (err) {
      let error =
        err.response && err.response.data ? err.response.data : err.message;
      return error;
    }
  },
);
export const addReviews = createAsyncThunk(
  'product/addreviews',
  async (reviews) => {
    const { id, rating, comment } = reviews;
    const newReview = { rating, comment };
    try {
      const res = await ProductServices.addReview(id, newReview);
      toast.success('Review Added', {
        position: 'bottom-left',
        autoClose: 2000,
      });
      return await res.data;
    } catch (err) {
      let error =
        err.response && err.response.data ? err.response.data : err.message;
      return error;
    }
  },
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTopProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addReviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(addReviews.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
