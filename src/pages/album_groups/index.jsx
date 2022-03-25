import SearchIcon from '@mui/icons-material/Search';
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormData from '../../components/FormData';
import TableData from '../../components/TableData';
import useAlbums from '../../hooks/useAlbums';
import { Search, SearchIconWrapper, StyledInputBase } from '../songs/style';
import albumHeadCells from './albumHeadCells';
import mapDataAlbum from './mapDataAlbum';
import FormAlbumGroups from './FormAlbumGroups';
const AlbumGroupsPage = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);
  //************Initial state*********
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [data, setData] = useState();
  //************Side effect***********
  const albums = useAlbums({ params: { search, limit: 20, sort: '-createdAt' } });

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
    }
  };

  //***********Render UI*****************

  //***********HandleLogic*****************
  const dataTable = useMemo(() => {
    return mapDataAlbum(albums?.data || []);
  }, [albums?.data]);
  // const dataTable = mapDataSong(songs?.data || []);

  return (
    <>
      {isUpdate ? (
        <FormData title="Update Album" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <FormAlbumGroups />
        </FormData>
      ) : (
        <FormData title="Create Album" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <FormAlbumGroups />
        </FormData>
      )}

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase onChange={handleChangeSearch} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <TableData
        data={albums.data}
        onUpdate={handleShowFormUpdate}
        onCreate={() => setIsOpen(true)}
        onDelete={handleDeleteSong}
        dataTable={dataTable}
        headCells={albumHeadCells}
      ></TableData>
    </>
  );
};

export default AlbumGroupsPage;
