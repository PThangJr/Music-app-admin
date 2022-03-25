const mapDataAlbum = (data) => {
  return data.map((item) => ({
    id: item?._id,
    image: () => <img src={item?.image?.secure_url} style={{ width: '70px' }} />,
    name: item?.name,
    singers: item?.singers?.[0]?.name,
  }));
};

export default mapDataAlbum;
