import { configureStore } from '@reduxjs/toolkit';
import albumsReducer from '../pages/albums/albumsSlice';
import albumGroupsReducer from '../pages/album_groups/albumGroupsSlice';
import authorsReducer from '../pages/authors/authorSlice';
import authsReducer from '../pages/auths/authSlice';
import categoriesReducer from '../pages/categories/categorySlice';
import singersReducer from '../pages/singers/singersSlice';
import songsReducer from '../pages/songs/songsSlice';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    albums: albumsReducer,
    singers: singersReducer,
    auths: authsReducer,
    authors: authorsReducer,
    categories: categoriesReducer,
    albumGroups: albumGroupsReducer,
  },
});
export default store;
