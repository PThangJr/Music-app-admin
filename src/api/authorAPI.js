import axiosClient from './axiosClient';

const authorAPI = {
  getAuthors(payload = {}) {
    let { params = {} } = payload;
    params = { ...params, sort: params?.sort ? params.sort : '' };
    const url = `/authors`;
    return axiosClient.get(url, { params });
  },
};
export default authorAPI;
