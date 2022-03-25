import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../../api/authAPI';

const initInfoUser = {
  avatar: {
    public_id: '',
    secure_url: '',
  },
  username: '',
  email: '',
  role: '',
  gender: '',
  age: '',
  fullname: '',
};
const initialState = {
  isLoading: null,
  isAuthenticate: false,
  isUpdatedAvatarSuccess: false,
  isChangePasswordSuccess: false,
  user: initInfoUser,
  message: '',
  errors: {},
};

export const fetchLogin = createAsyncThunk('/auths/login', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.login(payload);
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    const { rejectWithValue } = thunkAPI;
    return rejectWithValue(error);
  }
});
export const fetchRegister = createAsyncThunk('/auths/register', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.register(payload);
    // console.log(response);
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    const { rejectWithValue } = thunkAPI;
    return rejectWithValue(error);
  }
});
export const fetchInfoAuth = createAsyncThunk('/information/auth', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.getInfoUser();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const fetchUpdateInfoUser = createAsyncThunk(
  '/information/update',
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.updateInfoUser(payload);
      return response;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);
export const fetchChangePassword = createAsyncThunk('/password', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.changePassword(payload);
    return response;
  } catch (error) {
    const { rejectWithValue } = thunkAPI;
    return rejectWithValue(error);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors(state, action) {
      state.errors = {};
    },
    setAuthenticate(state, action) {
      const user = JSON.parse(localStorage.getItem('user'));
      const accessToken = localStorage.getItem('access_token');
      // return state;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticate = user || accessToken ? true : false;
    },
    logout(state, action) {
      localStorage.clear();
      state.user = initInfoUser;
      state.isAuthenticate = false;
    },
    clearStatusSuccess(state) {
      state.isUpdatedAvatarSuccess = false;
      state.message = '';
      state.isChangePasswordSuccess = false;
    },
  },
  extraReducers: {
    // Login
    [fetchLogin.pending](state, action) {
      state.isLoading = true;
      state.isAuthenticate = false;
      state.message = '';
    },
    [fetchLogin.fulfilled](state, action) {
      // console.log(action);
      state.user = action.payload?.user;
      state.isLoading = false;
      state.isAuthenticate = true;
      state.message = 'Đăng nhập thành công!';

      // console.log(action);
    },
    [fetchLogin.rejected](state, action) {
      console.log(action.payload.data.error);
      localStorage.clear();
      state.isLoading = false;
      state.user = null;
      state.isAuthenticate = false;
      state.errors = action.payload.data.error;
      state.message = '';
    },

    // End Login
    //Register
    [fetchRegister.pending](state, action) {
      state.isLoading = true;
      state.isAuthenticate = false;
      state.errors = {};
      state.message = '';
    },
    [fetchRegister.fulfilled](state, action) {
      // console.log(action);
      state.isAuthenticate = true;
      state.user = action.payload?.user;
      state.isLoading = false;
      state.errors = {};
      state.message = 'Đăng ký thành công!';

      // console.log(action);
    },
    [fetchRegister.rejected](state, action) {
      // console.log(action);
      localStorage.clear();
      state.errors = action.payload.data.error;
      state.isLoading = false;
      state.user = initInfoUser;
      state.isAuthenticate = false;
      state.message = '';
    },
    // End Register

    // Information User
    [fetchInfoAuth.pending](state, action) {
      state.isLoading = true;
    },
    [fetchInfoAuth.fulfilled](state, action) {
      state.isLoading = false;
      // console.log(action);
      state.user = action.payload.infoUser;
    },
    [fetchInfoAuth.rejected](state, action) {
      state.isLoading = false;
      localStorage.clear();
      state.user = initInfoUser;
    },
    //End Information User
    //Update InfoUser
    [fetchUpdateInfoUser.pending](state, action) {
      state.isLoading = true;
      state.isUpdatedAvatarSuccess = false;
    },
    [fetchUpdateInfoUser.fulfilled](state, action) {
      console.log(action);
      localStorage.setItem('user', JSON.stringify(action.payload.userUpdated));
      state.isLoading = false;
      state.isUpdatedAvatarSuccess = true;

      // console.log('action');
      state.user = action.payload.userUpdated;
    },
    [fetchUpdateInfoUser.rejected](state, action) {
      state.isLoading = false;
      state.isUpdatedAvatarSuccess = false;

      localStorage.clear();
      state.user = initInfoUser;
    },
    //Change password
    [fetchChangePassword.pending](state, action) {
      state.isLoading = true;
      state.isChangePasswordSuccess = false;
    },
    [fetchChangePassword.fulfilled](state, action) {
      // console.log(action);
      // localStorage.setItem("user", JSON.stringify(action.payload.userUpdated));
      state.isLoading = false;
      state.isChangePasswordSuccess = true;

      state.message = action.payload.message;
    },
    [fetchChangePassword.rejected](state, action) {
      state.isLoading = false;
      state.isChangePasswordSuccess = false;

      // state.user = initInfoUser;
    },
  },
});
export default authSlice.reducer;
export const { clearErrors, setAuthenticate, logout, clearStatusSuccess } = authSlice.actions;
