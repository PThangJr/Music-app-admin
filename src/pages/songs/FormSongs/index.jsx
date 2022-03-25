import { Button, Grid, Input, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import BoxAlbums from '../../../components/BoxAlbums';
import BoxAuthors from '../../../components/BoxAuthors';
import BoxCategories from '../../../components/BoxCategories';
import BoxSingers from '../../../components/BoxSingers';
import { useDispatch } from 'react-redux';
import { fetchCreateSong, fetchUpdateSong } from '../songsSlice';
const FormSongs = ({ data, onSubmit }) => {
  //************Declaration***********
  const dispatch = useDispatch();
  // console.log('render');

  //************Initial state*********
  // const [data, setData] = useState({ name: '', singers: [], authors: [], categories: [], albums: [] });
  const [inputData, setInputData] = useState({ name: '', videoId: '', karaokeId: '' });
  const [imageFile, setImageFile] = useState();
  const [audioFile, setAudioFile] = useState();

  const [singersData, setSingersData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  //************Side effect***********
  useEffect(() => {
    if (data) {
      setInputData({ ...inputData, name: data.name, videoId: data.videoId, karaokeId: data.karaokeId });
      // setSingersData(data.singers.map((singer) => ({ _id: singer._id, name: singer.name })));
      // setAuthorsData(data.authors.map((author) => ({_id: author._id, name: author.name})));
      // setAlbumsData(data.albums.map((album) => album._id));
      // setCategoriesData(data.categories.map((category) => category._id));
      setSingersData(data.singers);
      setAuthorsData(data.authors);
      setAlbumsData(data.albums);
      setCategoriesData(data.categories);
    }
  }, [data]);
  // console.log({
  //   ...inputData,
  //   singersData,
  //   authorsData,
  //   albumsData,
  //   categoriesData,
  // });
  //***********Get data from store*****************

  //***********Handle event**************
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    if (audioFile) {
      dataForm.append('audio', audioFile);
    }
    if (imageFile) {
      dataForm.append('image', imageFile);
    }
    dataForm.append('name', inputData.name);
    for (let i = 0; i < singersData.length; i++) {
      dataForm.append('singers[]', singersData[i]._id);
    }
    for (let i = 0; i < authorsData.length; i++) {
      dataForm.append('authors[]', authorsData[i]._id);
    }
    for (let i = 0; i < categoriesData.length; i++) {
      dataForm.append('categories[]', categoriesData[i]._id);
    }
    for (let i = 0; i < albumsData.length; i++) {
      dataForm.append('albums[]', albumsData[i]._id);
    }
    dataForm.append('videoId', inputData.videoId);
    dataForm.append('karaokeId', inputData.karaokeId);

    if (data) {
      dispatch(fetchUpdateSong({ id: data._id, data: dataForm }));
    } else {
      dispatch(fetchCreateSong(dataForm));
    }
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleChangeAudio = (e) => {
    e.preventDefault();
    const allowedTypes = ['audio/mp3', 'audio/m4a', 'audio/mp4', 'audio/mpeg', 'audio/x-m4a'];
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setAudioFile(file);
    }
  };
  const handleChangeImage = (e) => {
    e.preventDefault();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setImageFile(file);
    }
  };
  const handleChangeInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const handleChangeCheckboxSinger = useCallback(
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
  const handleChangeCheckboxAuthor = useCallback(
    ({ _id, name }) => {
      const find = authorsData.find((author) => author._id === _id);
      if (find) {
        setAuthorsData(authorsData.filter((author) => author._id !== _id));
      } else {
        setAuthorsData([...authorsData, { _id, name }]);
      }
    },
    [authorsData]
  );
  const handleChangeCheckboxCategories = useCallback(
    ({ _id, name }) => {
      const find = categoriesData.find((category) => category._id === _id);
      if (find) {
        setCategoriesData(categoriesData.filter((category) => category._id !== _id));
      } else {
        setCategoriesData([...categoriesData, { _id, name }]);
      }
    },
    [categoriesData]
  );
  const handleChangeCheckboxAlbums = useCallback(
    ({ _id, name }) => {
      const find = albumsData.find((album) => album._id === _id);
      if (find) {
        setAlbumsData(albumsData.filter((album) => album._id !== _id));
      } else {
        setAlbumsData([...albumsData, { _id, name }]);
      }
    },
    [albumsData]
  );

  //***********Render UI*****************
  return (
    <Box component="form" sx={{ padding: '0 20px' }} onSubmit={handleSubmitForm}>
      <Grid container spacing={3}>
        <Grid item xl={6}>
          <TextField
            sx={{ marginBottom: '20px' }}
            required
            id="name"
            label="Name"
            name="name"
            // defaultValue="Tên bài hát..."
            autoFocus
            value={inputData.name || ''}
            fullWidth
            onChange={handleChangeInputValue}
          />
          <BoxSingers onChange={handleChangeCheckboxSinger} singersData={singersData} />
          <BoxAuthors onChange={handleChangeCheckboxAuthor} authorsData={authorsData} />
          <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: '15px' }}>
            <label htmlFor="contained-button-image">
              <Input accept="image/*" id="contained-button-image" onChange={handleChangeImage} multiple type="file" />
              <Button variant="contained" component="span">
                Image
              </Button>
            </label>
            <label htmlFor="contained-button-audio">
              <Input accept="audio/*" id="contained-button-audio" onChange={handleChangeAudio} multiple type="file" />
              <Button variant="contained" component="span">
                Audio
              </Button>
            </label>
          </Stack>
        </Grid>
        <Grid item xl={6}>
          <Grid container>
            <Grid item xl={6}>
              <TextField
                sx={{ marginBottom: '20px' }}
                id="video_id"
                label="Video Id"
                name="videoId"
                fullWidth
                onChange={handleChangeInputValue}
                value={inputData.videoId || ''}
              />
            </Grid>
            <Grid item xl={6}>
              <TextField
                sx={{ marginBottom: '20px' }}
                id="karaoke_id"
                label="Karaoke Id"
                name="karaokeId"
                fullWidth
                onChange={handleChangeInputValue}
                value={inputData.karaokeId || ''}
              />
            </Grid>
          </Grid>
          <BoxCategories onChange={handleChangeCheckboxCategories} categoriesData={categoriesData} />
          <BoxAlbums onChange={handleChangeCheckboxAlbums} albumsData={albumsData} />
        </Grid>
        {data ? (
          <Button sx={{ marginTop: '15px' }} type="submit" variant="contained" fullWidth>
            Update
          </Button>
        ) : (
          <Button sx={{ marginTop: '15px' }} type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        )}
      </Grid>
    </Box>
  );
};

export default React.memo(FormSongs);
