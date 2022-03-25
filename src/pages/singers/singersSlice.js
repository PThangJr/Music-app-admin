import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import singerAPI from '../../api/singerAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchSingers = createAsyncThunk('/singers', async (payload, thunkAPI) => {
  try {
    const response = await singerAPI.getSingers(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchCreateSinger = createAsyncThunk('/singers/create', async (payload, thunkAPI) => {
  try {
    const response = await singerAPI.createSinger(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateSinger = createAsyncThunk('/singers/update', async (payload, thunkAPI) => {
  try {
    const response = await singerAPI.updateSinger(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchDeleteSinger = createAsyncThunk('/singers/delete', async (payload, thunkAPI) => {
  try {
    const response = await singerAPI.deleteSinger(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  extraReducers: {
    [fetchSingers.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchSingers.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchSingers.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchCreateSinger.pending](state, action) {
      state.isLoading = true;
    },
    [fetchCreateSinger.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.data.unshift(action.payload.data);
      state.message = action.payload.message;
    },
    [fetchCreateSinger.rejected](state, action) {
      state.isLoading = false;
      // console.log(action.payload);
      state.errors = action.payload.data.errors;
    },
    [fetchUpdateSinger.pending](state, action) {
      state.isLoading = true;
      // state.data = initData;
    },
    [fetchUpdateSinger.fulfilled](state, action) {
      state.isLoading = false;
      // state.data.unshift(action.payload.data);
    },
    [fetchUpdateSinger.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchDeleteSinger.pending](state, action) {
      state.isLoading = true;
      // state.data = initData;
    },
    [fetchDeleteSinger.fulfilled](state, action) {
      state.isLoading = false;
      // state.data.unshift(action.payload.data);
    },
    [fetchDeleteSinger.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default singerSlice.reducer;
