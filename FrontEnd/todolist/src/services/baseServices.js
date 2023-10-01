import axios from 'axios';

const API_URL = 'http://localhost:4491/api/';

const request = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${url}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const get = async (url, headers = {}) => request('GET', url, null, headers);

const post = async (url, data, headers = {}) => request('POST', url, data, headers);

const put = async (url, data, headers = {}) => request('PUT', url, data, headers);

const del = async (url, headers = {}) => request('DELETE', url, null, headers);

const baseService = {
  get,
  post,
  put,
  del,

};

export default baseService;
