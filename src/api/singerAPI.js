import axiosClient from './axiosClient';

const singerAPI = {
  getSingers(payload = {}) {
    let { params = {} } = payload;
    params = { ...params, sort: params?.sort ? params.sort : '' };

    const url = `/singers`;
    return axiosClient.get(url, { params });
  },
  createSinger(data) {
    const url = `/singers/`;
    return axiosClient.post(url, data);
  },
  updateSinger(payload = {}) {
    const id = payload.id;
    const data = payload.data;
    const url = `/singers/${id}`;
    return axiosClient.put(url, data);
  },
  deleteSinger(id) {
    const url = `/singers/${id}`;
    return axiosClient.delete(url);
  },
};
export default singerAPI;
