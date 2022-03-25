import { Box, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useAuthors from '../../hooks/useAuthors';

const BoxAuthors = ({ onChange, authorsData }) => {
  //************Declaration***********
  const timeoutTypingRef = useRef();

  //************Initial state*********
  const [search, setSearch] = useState('');

  //************Side effect***********
  const authors = useAuthors({ params: { sort: 'slug', search } });

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
        <Typography>Authors:</Typography>
        {authorsData?.map((author) => (
          <Chip key={author._id} label={author.name} onDelete={() => handleDelete(author._id, author.name)} />
        ))}
      </Stack>
      <TextField
        margin="normal"
        fullWidth
        id="search_author"
        label="Search Author..."
        name="search_author"
        autoComplete="search_author"
        onChange={handleChangeSearch}
      />
      {authors?.data?.map((author) => (
        <FormControlLabel
          key={author._id}
          name="authors"
          onChange={(e) => handleChangeCheckbox(e, author._id, author.name)}
          checked={Boolean(authorsData.find((s) => s._id === author._id))}
          value={author}
          control={<Checkbox />}
          label={author.name}
        />
      ))}
    </Box>
  );
};

export default React.memo(BoxAuthors);
