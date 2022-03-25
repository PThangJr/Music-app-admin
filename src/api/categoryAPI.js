import axiosClient from './axiosClient';

const categoryAPI = {
  getCategories(payload = {}) {
    const { params } = payload;
    const url = `/categories`;
    return axiosClient.get(url, { params });
  },
  createCategory(data) {
    const url = `/categories`;
    return axiosClient.post(url, data);
  },
  updateCategory(payload) {
    const id = payload?.id;
    const data = payload?.data;
    const url = `/categories/${id}`;
    return axiosClient.put(url, data);
  },
  deleteCategory(id) {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};
export default categoryAPI;
