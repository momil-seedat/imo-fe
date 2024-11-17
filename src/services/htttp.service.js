import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
Axios.defaults.baseURL = API_URL;

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  post = async (url, data) => await this.axiosRequest('post', url, data);

  // Updated put function with URL-encoded form data
  put = async (url, data) => await this.axiosRequest('put', url, data);

  // Updated patch function with URL-encoded form data
  patch = async (url, data) => await this.axiosRequest('patch', url, data);

  // Updated delete function
  delete = async (url) => await this.axiosRequest('delete', url);

  // Common function for making Axios requests
  axiosRequest(method, url, data) {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // Serialize the payload to URL-encoded form data using qs
      data: data,
    };

    return new Promise((resolve, reject) => {
      this._axios
        .request(config)
        .then((res) => resolve(res.data))
        .catch((ex) => reject(ex.response.data));
    });
  }

  // ...
}




export default new HttpService();
