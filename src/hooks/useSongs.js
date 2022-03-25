import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../pages/songs/songsSlice';
const useSongs = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchSongs({
        params: { limit: props?.params?.limit || 10, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const songs = useSelector((state) => state.songs);
  //***********Handle event**************

  //***********Render UI*****************

  return songs || {};
};

export default useSongs;
