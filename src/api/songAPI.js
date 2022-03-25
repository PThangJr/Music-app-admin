import axiosClient from './axiosClient';

const songAPI = {
  getSongs(payload = {}) {
    const { params } = payload;
    const url = `/songs`;
    return axiosClient.get(url, { params });
  },
  createSong(data) {
    const url = `/songs`;
    return axiosClient.post(url, data);
  },
  updateSong(payload) {
    const { id, data } = payload;
    const url = `/songs/${id}`;
    return axiosClient.put(url, data);
  },
  deleteSong(id) {
    const url = `/songs/${id}`;
    return axiosClient.delete(url);
  },
};
export default songAPI;
