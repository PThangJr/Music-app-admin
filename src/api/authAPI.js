import axiosClient from './axiosClient';
const authAPI = {
  login(data) {
    const url = '/auths/login';
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = '/auths/register';
    return axiosClient.post(url, data);
  },
  changePassword(data) {
    const url = '/auths/password';
    return axiosClient.put(url, data);
  },
  updateAvatar(data) {
    const url = `/auths/information`;
    console.log(data);
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateInfoUser(data) {
    const url = `/auths/information`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
export default authAPI;
