import SearchIcon from '@mui/icons-material/Search';
import queryString from 'query-string';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FormData from '../../components/FormData';
import TableData from '../../components/TableData';
import useCategories from '../../hooks/useCategories';
import { Search, SearchIconWrapper, StyledInputBase } from '../songs/style';
import categoryHeadCells from './categoryHeadCells';
import FormCategories from './FormCategories';
import mapDataCategories from './mapDataCategories';
const CategoriesPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  //************Initial state*********
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState();
  //************Side effect***********
  const categories = useCategories({ params: { search: queryParams.search, sort: '-createdAt' } });

  //***********Get data from store*****************

  //***********Handle event**************
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      // setSearch(e.target.value.trim());
      navigate(`?search=${value}`);
    }, 500);
  };
  const handleShowFormUpdate = (data) => {
    setIsOpen(true);
    setIsUpdate(true);
    setData(data);
  };
  const handleShowFormCreate = () => {
    setIsOpen(true);
    setData();
  };
  const handleDeleteCate = (data) => {
    if (window.confirm('Bạn có muốn xoá bài hát này không?')) {
    }
  };
  const handleSubmitForm = useCallback(() => {
    setIsOpen(false);
    setData();
  }, []);
  //***********Render UI*****************

  //***********HandleLogic*****************
  const dataTable = useMemo(() => {
    return mapDataCategories(categories?.data || []);
  }, [categories?.data]);

  return (
    <>
      {isUpdate ? (
        <FormData title="Update Song" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* <FormSongs data={data} onSubmit={handleSubmitForm} /> */}
        </FormData>
      ) : (
        <FormData title="Create Category" onSubmit={handleSubmitForm} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* <FormSongs onSubmit={handleSubmitForm} /> */}
          <FormCategories />
        </FormData>
      )}

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase onChange={handleChangeSearch} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <TableData
        data={categories.data}
        onUpdate={handleShowFormUpdate}
        onCreate={handleShowFormCreate}
        onDelete={handleDeleteCate}
        dataTable={dataTable}
        headCells={categoryHeadCells}
      ></TableData>
    </>
  );
};

export default CategoriesPage;
