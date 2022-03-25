import { Button, Grid, Input, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BoxAlbumGroups from '../../../components/BoxAlbumGroups';
import { fetchCreateAlbum, fetchUpdateAlbum } from '../albumGroupsSlice';

const FormAlbumGroup = ({ data }) => {
  //************Declaration***********
  const dispatch = useDispatch();

  //************Initial state*********
  const [inputData, setInputData] = useState({ name: '' });
  const [imageFile, setImageFile] = useState();
  //************Side effect***********
  useEffect(() => {
    if (data) {
      setInputData({ name: data.name });
    }
  }, [data]);
  //***********Get data from store*****************

  //***********Handle event**************

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    if (imageFile) {
      dataForm.append('avatar', imageFile);
    }
    dataForm.append('name', inputData.name);

    if (data) {
      console.log('updated');
      dispatch(fetchUpdateAlbum({ id: data._id, data: dataForm }));
    } else {
      dispatch(fetchCreateAlbum(dataForm));
    }
  };
  const handleChangeInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const handleChangeImage = (e) => {
    e.preventDefault();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setImageFile(file);
    }
  };

  //***********Render UI*****************

  return (
    <Box component="form" sx={{ padding: '0 20px' }} onSubmit={handleSubmitForm}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xl={6}>
          <TextField
            sx={{ marginBottom: '20px' }}
            required
            id="name"
            label="Name"
            name="name"
            value={inputData.name || ''}
            fullWidth
            onChange={handleChangeInputValue}
          />
          <BoxAlbumGroups />
          <label htmlFor="contained-button-image">
            <Input accept="image/*" id="contained-button-image" onChange={handleChangeImage} multiple type="file" />
            <Button variant="contained" component="span">
              Image
            </Button>
          </label>
          <Button sx={{ marginTop: '15px' }} type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormAlbumGroup;
