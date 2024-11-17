

import { useState ,useContext} from "react";
import axios from 'axios';

// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import AuthService from "services/auth-service"
import { useUserContext } from 'context/UserContext';
import qs from 'qs';
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { AuthContext } from "context";
function Basic() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      // Call the login function with username and password
      const payload = {
        username,
        password,
      };
      const formData = qs.stringify(payload);
      const apiEndpoint = apiBaseUrl+'/accounts/login/'; // Replace with the actual API endpoint

    // Make the POST request with the URL-encoded form data
    const response = await axios.post(apiEndpoint, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    console.log(response);
    

      // const response = await AuthService.login(formData);
      // Check the response and redirect if successful
      if (response && response.status == 200) {
        // Redirect to the dashboard
        setUser(response.data);
        localStorage.setItem("user", response.data.userId);
        localStorage.setItem("user_group", response.data.user_group[0]);
        localStorage.setItem("permissions", response.data.user_permissions);
        localStorage.setItem("token", response.data.token);
        authContext.login(response.data.token);
        navigate("/dashboard");
        setError('');
     //   navigate("/dashboard"); // Use React Router history to navigate
      } else {
         setError('Invalid username or password');
        console.error('Error:', error);
         console.error('looo',error);
        // Handle login failure, show an error message, etc.
      }
    } catch (res) {
       setError('Invalid username or password');
      
  }
  finally {
    // Set loading back to false after the response is received
    setLoading(false);
  }
};

 
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="username"
                label="Username"
                fullWidth
                value={username}
                onChange={handleUsernameChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignIn}
                 disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </MDButton>
            </MDBox>
{error && (
  <MDTypography variant="body2" color="error" textAlign="center" mt={2}>
    {error}
  </MDTypography>
)}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
