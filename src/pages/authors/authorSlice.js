import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authorAPI from '../../api/authorAPI';
import singerAPI from '../../api/singerAPI';

const initData = [
  {
    _id: '',
    name: '',
    image: { public_id: '', secure_url: '' },
    status: '',
    profile: '',
  },
];
const initialState = {
  data: initData,
  isLoading: false,
  message: '',
  error: null,
};
export const fetchAuthors = createAsyncThunk('/authors', async (payload, thunkAPI) => {
  try {
    const response = await authorAPI.getAuthors(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authorSlice = createSlice({
  name: 'authors',
  initialState,
  extraReducers: {
    [fetchAuthors.pending](state, action) {
      state.isLoading = true;
      state.data = initData;
    },
    [fetchAuthors.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [fetchAuthors.rejected](state, action) {
      state.isLoading = false;
    },
  },
});
export default authorSlice.reducer;
