import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumGroups } from '../pages/album_groups/albumGroupsSlice';
const useAlbumGroups = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchAlbumGroups({
        params: { limit: props?.params?.limit || 20, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const albumGroups = useSelector((state) => state.albumGroups);
  //***********Handle event**************

  //***********Render UI*****************

  return albumGroups || { data: [] };
};

export default useAlbumGroups;
