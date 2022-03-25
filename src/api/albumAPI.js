import axiosClient from './axiosClient';

const albumAPI = {
  getAlbums(payload = {}) {
    const { params } = payload;
    const url = `/albums`;
    return axiosClient.get(url, { params });
  },
  createAlbum(data) {
    const url = `/albums`;
    return axiosClient.post(url, data);
  },
  updateAlbum(payload) {
    const id = payload?.id;
    const data = payload?.data;
    const url = `/albums/${id}`;
    return axiosClient.put(url, data);
  },
  deleteAlbum(id) {
    const url = `/albums/${id}`;
    return axiosClient.delete(url);
  },
};
export default albumAPI;
