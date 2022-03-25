import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import albumAPI from '../../api/albumAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchAlbums = createAsyncThunk('/albums', async (payload, thunkAPI) => {
  try {
    const response = await albumAPI.getAlbums(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchCreateAlbum = createAsyncThunk('/albums/create', async (payload, thunkAPI) => {
  try {
    const response = await albumAPI.createAlbum(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateAlbum = createAsyncThunk('/albums/update', async (payload, thunkAPI) => {
  try {
    const response = await albumAPI.updateAlbum(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchDeleteAlbum = createAsyncThunk('/albums/delete', async (payload, thunkAPI) => {
  try {
    const response = await albumAPI.deleteAlbum(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  extraReducers: {
    [fetchAlbums.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchAlbums.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchAlbums.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchCreateAlbum.pending](state, action) {
      state.isLoading = true;
    },
    [fetchCreateAlbum.fulfilled](state, action) {
      state.isLoading = false;
      state.data.unshift(action.payload.data);
      console.log(action.payload.mesage);
    },
    [fetchCreateAlbum.rejected](state, action) {
      state.isLoading = false;
    },
  },
  [fetchDeleteAlbum.pending](state, action) {
    state.isLoading = true;
  },
  [fetchDeleteAlbum.fulfilled](state, action) {
    state.isLoading = false;
    console.log(action.payload);
  },
  [fetchDeleteAlbum.rejected](state, action) {
    state.isLoading = false;
  },
});
export default albumsSlice.reducer;
