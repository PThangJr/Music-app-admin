import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import songAPI from '../../api/songAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchSongs = createAsyncThunk('/songs', async (payload, thunkAPI) => {
  try {
    const response = await songAPI.getSongs(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchCreateSong = createAsyncThunk('/songs/create', async (payload, thunkAPI) => {
  try {
    const response = await songAPI.createSong(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateSong = createAsyncThunk('/songs/:id/update', async (payload, thunkAPI) => {
  try {
    const response = await songAPI.updateSong(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchDeleteSong = createAsyncThunk('/songs/:id/delete', async (payload, thunkAPI) => {
  try {
    const response = await songAPI.deleteSong(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const songSlice = createSlice({
  name: 'songs',
  initialState,
  extraReducers: {
    [fetchSongs.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchSongs.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchSongs.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchCreateSong.fulfilled](state, action) {
      console.log(action.payload);
      state.data.unshift(action.payload.data);
      state.isLoading = false;
    },
    [fetchCreateSong.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchUpdateSong.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
    },
    [fetchUpdateSong.rejected](state, action) {
      state.isLoading = false;
    },
    [fetchDeleteSong.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
    },
    [fetchDeleteSong.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default songSlice.reducer;
