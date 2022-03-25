import { Box, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useSingers from '../../hooks/useSingers';

const BoxSingers = ({ onChange, singersData }) => {
  //************Declaration***********
  const timeoutTypingRef = useRef();

  //************Initial state*********
  const [searchSinger, setSearchSinger] = useState('');

  //************Side effect***********
  const singers = useSingers({ params: { sort: '-slug', search: searchSinger } });

  //***********Get data from store*****************

  //***********Handle event**************
  const handleChangeInputSinger = (e) => {
    if (timeoutTypingRef.current) {
      clearTimeout(timeoutTypingRef.current);
    }
    timeoutTypingRef.current = setTimeout(() => {
      setSearchSinger(e.target.value.trim());
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
        <Typography>Singers:</Typography>
        {singersData.map((singer) => (
          <Chip key={singer._id} label={singer.name} onDelete={() => handleDelete(singer._id, singer.name)} />
        ))}
      </Stack>
      <TextField
        margin="normal"
        fullWidth
        id="search_singer"
        label="Search singers..."
        name="search_singer"
        autoComplete="search_singer"
        onChange={handleChangeInputSinger}
      />
      {singers.data.map((singer) => (
        <FormControlLabel
          key={singer._id}
          name="singers"
          onChange={(e) => handleChangeCheckbox(e, singer._id, singer.name)}
          checked={Boolean(singersData.find((s) => s._id === singer._id))}
          value={singer}
          control={<Checkbox />}
          label={singer.name}
        />
      ))}
    </Box>
  );
};

export default React.memo(BoxSingers);
