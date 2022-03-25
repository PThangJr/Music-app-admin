import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import albumAPI from '../../api/albumAPI';
import albumGroupAPI from '../../api/albumGroupAPI';

const initData = [];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchAlbumGroups = createAsyncThunk('/album_groups', async (payload, thunkAPI) => {
  try {
    const response = await albumGroupAPI.getAlbumGroups(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const albumGroupSlice = createSlice({
  name: 'album_groups',
  initialState,
  extraReducers: {
    [fetchAlbumGroups.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchAlbumGroups.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchAlbumGroups.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default albumGroupSlice.reducer;
