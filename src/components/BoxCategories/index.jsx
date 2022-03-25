import { Box, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import useCategories from '../../hooks/useCategories';

const BoxCategories = ({ onChange, categoriesData }) => {
  //************Declaration***********
  const timeoutTypingRef = useRef();

  //************Initial state*********
  const [search, setSearch] = useState('');

  //************Side effect***********
  const categories = useCategories({ params: { sort: 'slug', search } });

  //***********Get data from store*****************

  //***********Handle event**************
  const handleSearch = (e) => {
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
        <Typography>Categories:</Typography>
        {categoriesData.map((category) => (
          <Chip key={category._id} label={category.name} onDelete={() => handleDelete(category._id, category.name)} />
        ))}
      </Stack>
      <TextField
        margin="normal"
        fullWidth
        id="search_category"
        label="Search Category..."
        name="search_category"
        autoComplete="search_category"
        onChange={handleSearch}
      />
      {categories?.data?.map((category) => (
        <FormControlLabel
          key={category._id}
          name="category"
          onChange={(e) => handleChangeCheckbox(e, category._id, category.name)}
          checked={Boolean(categoriesData.find((s) => s._id === category._id))}
          // checked={Boolean(dataForm.categorys.find((sing) => sing === category._id)) || false}
          value={category}
          control={<Checkbox />}
          label={category.name}
        />
      ))}
    </Box>
  );
};

export default React.memo(BoxCategories);
