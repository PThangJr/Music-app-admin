import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryAPI from '../../api/categoryAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchCategories = createAsyncThunk('/categories', async (payload, thunkAPI) => {
  try {
    const response = await categoryAPI.getCategories(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchCreateCategory = createAsyncThunk('/categories/create', async (payload, thunkAPI) => {
  try {
    const response = await categoryAPI.createCategory(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateCategory = createAsyncThunk('/categories/update', async (payload, thunkAPI) => {
  try {
    const response = await categoryAPI.updateCategory(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchDeleteCategory = createAsyncThunk('/categories/delete', async (payload, thunkAPI) => {
  try {
    const response = await categoryAPI.deleteCategory(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [fetchCategories.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchCategories.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchCategories.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchCreateCategory.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchCreateCategory.fulfilled](state, action) {
      state.isLoading = false;
      state.data.unshift(action.payload.data);
      console.log(action.payload);
    },
    [fetchCreateCategory.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default categorySlice.reducer;
