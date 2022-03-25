import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../pages/categories/categorySlice';
const useCategories = (props) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  //************Side effect***********
  useEffect(() => {
    dispatch(
      fetchCategories({
        params: { limit: props?.params?.limit || 15, search: props?.params?.search, sort: props?.params?.sort },
      })
    );
  }, [dispatch, props?.params?.limit, props?.params?.search, props?.params?.sort]);
  //***********Get data from store*****************
  const categories = useSelector((state) => state.categories);
  //***********Handle event**************

  //***********Render UI*****************

  return categories || { data: [] };
};

export default useCategories;
