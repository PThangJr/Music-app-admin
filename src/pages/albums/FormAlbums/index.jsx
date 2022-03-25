import { Button, Grid, Input, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BoxAlbumGroups from '../../../components/BoxAlbumGroups';
import BoxSingers from '../../../components/BoxSingers';
import { fetchCreateAlbum, fetchUpdateAlbum } from '../albumsSlice';

const FormAlbums = ({ data }) => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********
  const [inputData, setInputData] = useState({ name: '' });
  const [imageFile, setImageFile] = useState();
  const [albumGroupsData, setAlbumGroupsData] = useState([]);
  const [singersData, setSingersData] = useState([]);
  //************Side effect***********
  useEffect(() => {
    if (data) {
      setInputData({ name: data.name });
      setAlbumGroupsData(data.album_groups);
      console.log(data);
    }
  }, [data]);
  //***********Get data from store*****************
  //***********Handle event**************
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    if (imageFile) {
      dataForm.append('image', imageFile);
    }
    dataForm.append('name', inputData.name);
    for (let i = 0; i < albumGroupsData.length; i++) {
      dataForm.append('album_groups[]', albumGroupsData[i]._id);
    }
    for (let i = 0; i < singersData.length; i++) {
      dataForm.append('singers[]', singersData[i]._id);
    }

    if (data) {
      console.log('updated');
      dispatch(fetchUpdateAlbum({ id: data._id, data: dataForm }));
    } else {
      console.log('create');
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
  const handleChangeCheckBox = useCallback(
    ({ _id, name }) => {
      const find = albumGroupsData.find((alg) => alg._id === _id);
      if (find) {
        setAlbumGroupsData(albumGroupsData.filter((alg) => alg._id !== _id));
      } else {
        setAlbumGroupsData([...albumGroupsData, { _id, name }]);
      }
    },
    [albumGroupsData]
  );
  const handleChangeCheckboxSingers = useCallback(
    ({ _id, name }) => {
      const find = singersData.find((singer) => singer._id === _id);
      if (find) {
        setSingersData(singersData.filter((singer) => singer._id !== _id));
      } else {
        setSingersData([...singersData, { _id, name }]);
      }
    },
    [singersData]
  );

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
          <BoxAlbumGroups onChange={handleChangeCheckBox} albumGroupsData={albumGroupsData} />
          <BoxSingers onChange={handleChangeCheckboxSingers} singersData={singersData} />
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

export default FormAlbums;
