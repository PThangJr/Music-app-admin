import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import songAPI from '../../api/songAPI';
import {toast} from 'react-toastify'

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
    [fetchCreateSong.pending](state, action) {
      state.isLoading = true;
      toast.loading('Create song is proccessing', {toastId: 'create-song'})
    },
    [fetchCreateSong.fulfilled](state, action) {
      console.log(action.payload);
      state.data.unshift(action.payload.data);
      state.isLoading = false;
      toast.success('Create new song successfully')
      toast.dismiss("create-song")
    },
    [fetchCreateSong.rejected](state, action) {
      state.isLoading = false;
      console.log(action.payload)
      toast.error("Create song failed")
      toast.dismiss("create-song")
    },
    [fetchUpdateSong.pending](state, action) {
      state.isLoading = true;
      toast.loading('Update song is proccessing', {toastId: 'update-song'})
    },
    [fetchUpdateSong.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
      toast.success('Update song successfully')
      toast.dismiss("update-song")
    },
    [fetchUpdateSong.rejected](state, action) {
      state.isLoading = false;
      console.log("Update song failed", action.payload)
      toast.error("Update song failed")
      toast.dismiss("update-song")
    },

    [fetchDeleteSong.pending](state, action) {
      state.isLoading = true;
      toast.loading('Delete song is proccessing', {toastId: 'delete-song'})
    },
    [fetchDeleteSong.fulfilled](state, action) {
      console.log(action.payload);
      state.isLoading = false;
      toast.success('Delete song successfully')
      toast.dismiss('delete-song')
    },
    [fetchDeleteSong.rejected](state, action) {
      state.isLoading = false;
      console.log("Delete song failed", action.payload)
      toast.error("Delete song failed")
      toast.dismiss('delete-song')
    },
  },
});
export default songSlice.reducer;
