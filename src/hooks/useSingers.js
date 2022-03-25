import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingers } from '../pages/singers/singersSlice';
import { fetchSongs } from '../pages/songs/songsSlice';
const useSingers = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchSingers({
        params: { limit: props?.params?.limit || 20, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const singers = useSelector((state) => state.singers);
  //***********Handle event**************

  //***********Render UI*****************

  return singers || { data: [] };
};

export default useSingers;
