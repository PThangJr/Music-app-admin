const mapDataSinger = (data) => {
  return data.map((item) => ({
    id: item?._id,
    name: item?.name,
    image: () => <img src={item?.avatar?.secure_url} style={{ width: '70px' }} />,
  }));
};

export default mapDataSinger;
