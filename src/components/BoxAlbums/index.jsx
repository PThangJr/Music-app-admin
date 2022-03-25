import { Box, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useAlbums from '../../hooks/useAlbums';

const BoxAlbums = ({ onChange, albumsData }) => {
  //************Declaration***********
  const timeoutTypingRef = useRef();

  //************Initial state*********
  const [search, setSearch] = useState('');

  //************Side effect***********
  const albums = useAlbums({ params: { sort: 'slug', search } });

  //***********Get data from store*****************

  //***********Handle event**************
  const handleChangeSearch = (e) => {
    if (timeoutTypingRef.current) {
      clearTimeout(timeoutTypingRef.current);
    }
    timeoutTypingRef.current = setTimeout(() => {
      setSearch(e.target.value.trim());
    }, 500);
  };
  const handleChangeCheckbox = (e, _id, name) => {
    if (onChange) {
      onChange({ _id, name });
    }
  };
  const handleDelete = (_id, name) => {
    onChange({ _id, name });
  };
  //***********Render UI*****************
  return (
    <Box sx={{ border: '1px solid grey', padding: 2, mt: 2 }}>
      <Stack direction="row" spacing={1}>
        <Typography>Albums:</Typography>
        {albumsData.map((album) => (
          <Chip key={album._id} label={album.name} onDelete={() => handleDelete(album._id, album.name)} />
        ))}
      </Stack>
      <TextField
        margin="normal"
        fullWidth
        id="search_album"
        label="Search albums..."
        name="search_album"
        autoComplete="search_album"
        onChange={handleChangeSearch}
      />
      {albums?.data?.map((album) => (
        <FormControlLabel
          key={album._id}
          name="albums"
          onChange={(e) => handleChangeCheckbox(e, album._id, album.name)}
          checked={Boolean(albumsData.find((s) => s._id === album._id))}
          // checked={Boolean(dataForm.albums.find((sing) => sing === album._id)) || false}
          value={album}
          control={<Checkbox />}
          label={album.name}
        />
      ))}
    </Box>
  );
};

export default React.memo(BoxAlbums);
