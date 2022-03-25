const mapDataCategories = (data) => {
  return data.map((item) => ({
    id: item?._id,
    name: item?.name,
    image: () => <img src={item?.image?.secure_url} style={{ width: '70px' }} />,
    singers: item.singers?.[0]?.name,
  }));
};

export default mapDataCategories;
