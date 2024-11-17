import HttpService from "./htttp.service";
import axios from 'axios';
class AuthService {
  // authEndpoint = process.env.API_URL;

  login = async (payload) => {
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
    const loginEndpoint = apiBaseUrl+'/accounts/login/';
    return await HttpService.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = 'register';
    return await HttpService.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
    const logoutEndpoint = apiBaseUrl+'/accounts/logout/';
     const token = localStorage.getItem("token");
    const auth_token = `Token ${token}`;
    // Make the POST request with the URL-encoded form data
    const response = await axios.post(logoutEndpoint, null,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':auth_token
      },
    });
    return response;
  };

  forgotPassword = async (payload) => {
    const forgotPassword = 'password-forgot';
    return await HttpService.post(forgotPassword, payload);
  }

  resetPassword = async (credentials) => {
    const resetPassword = 'password-reset';
    return await HttpService.post(resetPassword, credentials);
  }


  

  getProfile = async() => {
    const getProfile = 'me';
    return await HttpService.get(getProfile);
  }

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return await HttpService.patch(updateProfile, newInfo);
  }
}

export default new AuthService();
