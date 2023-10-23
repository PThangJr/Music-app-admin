import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormData from '../../components/FormData';
import TableData from '../../components/TableData';
import useSongs from '../../hooks/useSongs';
import FormSongs from './FormSongs';
import mapDataSong from './mapDataSong';
import songHeadCells from './songheadCells';
import { fetchDeleteSong } from './songsSlice';
import { Search, SearchIconWrapper, StyledInputBase } from './style';
import queryString from 'query-string';
const SongsPage = () => {
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
  const songs = useSongs({ params: { search: queryParams.search, limit: 30, sort: '-createdAt' } });

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
  const handleDeleteSong = (data) => {
    if (window.confirm('Bạn có muốn xoá bài hát này không?')) {
      dispatch(fetchDeleteSong(data._id));
    }
  };
  const handleSubmitForm = useCallback(() => {
    setIsOpen(false);
    setData();
  }, []);
  //***********Render UI*****************

  //***********HandleLogic*****************
  const dataTable = useMemo(() => {
    return mapDataSong(songs?.data || []);
  }, [songs?.data]);
  // const dataTable = mapDataSong(songs?.data || []);

  return (
    <>
      {isUpdate ? (
        <FormData title="Update Song" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <FormSongs data={data} onSubmit={handleSubmitForm} />
        </FormData>
      ) : (
        <FormData title="Create Song" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <FormSongs onSubmit={handleSubmitForm} />
        </FormData>
      )}

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase onChange={handleChangeSearch} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <TableData
        data={songs.data}
        onUpdate={handleShowFormUpdate}
        onCreate={handleShowFormCreate}
        onDelete={handleDeleteSong}
        dataTable={dataTable}
        headCells={songHeadCells}
      ></TableData>
    </>
  );
};

export default SongsPage;
