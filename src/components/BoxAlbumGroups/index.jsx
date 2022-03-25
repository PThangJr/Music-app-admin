import { Box, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useAlbumGroups from '../../hooks/useAlbumGroups';

const BoxAlbumGroups = ({ onChange, albumGroupsData }) => {
  //************Declaration***********
  const timeoutTypingRef = useRef();

  //************Initial state*********
  const [search, setSearch] = useState('');

  //************Side effect***********
  const albumGroups = useAlbumGroups({ params: { sort: 'slug', search } });
  // console.log(albumGroups);
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
        <Typography>Album Groups:</Typography>
        {albumGroupsData?.map((album) => (
          <Chip key={album._id} label={album.name} onDelete={() => handleDelete(album._id, album.name)} />
        ))}
      </Stack>
      <TextField
        margin="normal"
        fullWidth
        id="search_album_group"
        label="Search album group..."
        name="search_album_group"
        autoComplete="search_album_group"
        onChange={handleChangeSearch}
      />
      {albumGroups?.data?.map((albumGroup) => (
        <FormControlLabel
          key={albumGroup._id}
          name="album_groups"
          onChange={(e) => handleChangeCheckbox(e, albumGroup._id, albumGroup.name)}
          checked={Boolean(albumGroupsData?.find((s) => s._id === albumGroup._id))}
          // checked={Boolean(dataForm.albumGroups.find((sing) => sing === albumGroup._id)) || false}
          value={albumGroup}
          control={<Checkbox />}
          label={albumGroup.name}
        />
      ))}
    </Box>
  );
};

export default React.memo(BoxAlbumGroups);
