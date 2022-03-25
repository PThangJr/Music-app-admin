import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../pages/authors/authorSlice';
const useAuthors = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchAuthors({
        params: { limit: props?.params?.limit || 15, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const authors = useSelector((state) => state.authors);
  //***********Handle event**************

  //***********Render UI*****************

  return authors || { data: [] };
};

export default useAuthors;
