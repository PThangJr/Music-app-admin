import SearchIcon from '@mui/icons-material/Search';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormData from '../../components/FormData';
import TableData from '../../components/TableData';
import useSingers from '../../hooks/useSingers';
import { Search, SearchIconWrapper, StyledInputBase } from '../songs/style';
import FormSingers from './FormSingers';
import mapDataSinger from './mapDataSinger';
import singerHeadCells from './singerHeadCells';
import { fetchDeleteSinger } from './singersSlice';
const SingersPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);
  //************Initial state*********
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState();
  //************Side effect***********
  const singers = useSingers({ params: { search, limit: 20, sort: '-createdAt' } });

  //***********Get data from store*****************

  //***********Handle event**************
  const handleChangeSearch = (e) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearch(e.target.value.trim());
    }, 500);
  };
  const handleShowFormUpdate = (data) => {
    setIsOpen(true);
    setIsUpdate(true);
    setData(data);
    setSearch(search, +' ');
  };
  const handleDeleteSong = (data) => {
    if (window.confirm('Bạn có muốn xoá ca sĩ này không?')) {
      dispatch(fetchDeleteSinger(data._id));
    }
  };

  //***********Render UI*****************

  //***********HandleLogic*****************
  const dataTable = useMemo(() => {
    return mapDataSinger(singers?.data || []);
  }, [singers?.data]);
  // const dataTable = mapDataSong(songs?.data || []);

  return (
    <>
      {isUpdate ? (
        <FormData title="Update Singer" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* <FormSongs data={data} /> */}
          <FormSingers data={data} />
        </FormData>
      ) : (
        <FormData title="Create Singer" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* <FormSongs /> */}
          <FormSingers />
        </FormData>
      )}

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase onChange={handleChangeSearch} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <TableData
        data={singers.data}
        onUpdate={handleShowFormUpdate}
        onCreate={() => setIsOpen(true)}
        onDelete={handleDeleteSong}
        dataTable={dataTable}
        headCells={singerHeadCells}
      ></TableData>
    </>
  );
};

export default SingersPage;
