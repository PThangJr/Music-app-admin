import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../pages/albums/albumsSlice';
import { fetchAuthors } from '../pages/authors/authorSlice';
const useAlbums = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchAlbums({
        params: { limit: props?.params?.limit || 20, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const albums = useSelector((state) => state.albums);
  //***********Handle event**************

  //***********Render UI*****************

  return albums || { data: [] };
};

export default useAlbums;
