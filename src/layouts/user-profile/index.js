import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import axios from 'axios';
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RolesDropDown from "examples/DropDowns/RolesDropDown";
import UserGroupDropdown from "examples/DropDowns/UserGroupDown";
import LocationDropDown from "examples/DropDowns/LocationDropDown";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user-profile/Header";
import Grid from "@mui/material/Grid";
import AuthService from "../../services/auth-service";

const UserProfile = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [role, setSelectedRole] = useState("");
  const [region, setSelectedRegion] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const [user, setUser] = useState({
    name: "",
    mobileNo: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    firstName:"",
    lastName:""
  });

  const [errors, setErrors] = useState({
    nameError: false,
    firstNameError:false,
    lastNameError:false,
    mobileNoError: false,
    emailError: false,
    newPassError: false,
    confirmPassError: false,
  });

  const handleDropDownRolesSelect = selectedValue => {
    setSelectedRole(selectedValue);
  };

  const handleDropDownRegionSelect = selectedValue => {
    setSelectedRegion(selectedValue);
  };
  const getUserData = async () => {
    // const response = await AuthService.getProfile();
    // if (response.data.id == 1) {
    //   setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
    // }
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...response.data.attributes,
    //   currentPassword: "",
    //   newPassword: "",
    //   confirmPassword: "",
    // }));
  };

  useEffect(() => {
    getUserData();
  }, []);


  

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,

    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }
    if (user.firstName.trim().length === 0) {
      setErrors({ ...errors, firstNameError: true });
      return;
    }

    if (user.lastName.trim().length === 0) {
      setErrors({ ...errors, lastNameError: true });
      return;
    }
    if (user.mobileNo.trim().length === 0) {
      setErrors({ ...errors, mobileNoError: true });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (user.confirmPassword || user.newPassword) {
      // in the api the confirmed password should be the same with the current password, not the new one
      if (user.confirmPassword.trim() !== user.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true });
        return;
      }
      if (user.newPassword.trim().length < 8) {
        setErrors({ ...errors, newPassError: true });
        return;
      }
    }

    try {

      let userData = {

        username: user.name,
        mobile_no: user.mobileNo,
        email: user.email,
        password: user.newPassword,     
        district:region,
        user_group:role,
        first_name: user.firstName,
        last_name: user.lastName,
        

      };
      console.log(userData);

      const response = await axios.post(apiBaseUrl+'/api/user/', userData, {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // call api for update

      console.log('Task submitted successfully:', response.data);

      if (response && response.status === 201) {
        setSuccessMessage('Task added successfully');

        setUser({
          name: "",
          mobileNo: "",
          email: "",
          newPassword: "",
          confirmPassword: "",
          firstName:"",
          lastName:""
        });

    // reset errors
    setErrors({
      nameError: false,
      firstNameError:false,
      lastNameError:false,
      mobileNoError: false,
      emailError: false,
      newPassError: false,
      confirmPassError: false,
    });
    setErrorMessage('');

     // Reset form values upon successful submission
      } else {
        setErrorMessage('Error occur while saving user');
        setSuccessMessage('');
        // Display error message if response status is not 200
      }

    } catch (error) {
      setErrorMessage('Error occur while saving user');
      setSuccessMessage('');
      
      // Handle error submitting project
    }

    // call api for update


    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={user.name}>
        {notification && successMessage !=='' && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Your profile has been updated
            </MDTypography>
          </MDAlert>
        )}
         {notification && errorMessage !=='' && (
          <MDAlert color="error" mt="20px">
            <MDTypography variant="body2" color="white">
            儲存使用者時發生錯誤
              {/*Error occur while saving user */}
            </MDTypography>
          </MDAlert>
        )}
        <Grid container spacing={3} alignItems="center">
          <Grid item>
           {/* <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" /> */}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} mb={2} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              新增用戶
              {/* Add New User */}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
              新增用戶
                {/* Add User */}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
      <MDBox display="flex" flexDirection="row" >
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              名
                {/* First Name */}
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="firstName"
                  value={user.firstName}
                  onChange={changeHandler}
                  error={errors.firstNameError}
                />
                {errors.firstNameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The First name can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              姓
            
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="lastName"
                  value={user.lastName}
                  onChange={changeHandler}
                  error={errors.lastNameError}
                />
                {errors.lastNameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The Last name can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="row" >
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              用户名
                {/*username*/}
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="name"
                  value={user.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                />
                {errors.nameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    使用者名稱應該是唯一的且不為空
                    {/* The name can not be null */}
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                {/* Email */}
                電子郵件
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="email"
                  fullWidth
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  error={errors.emailError}
                  disabled={isDemo}
                />
                {errors.emailError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    電子郵件必須有效
                    {/* The email must be valid */}
                  </MDTypography>
                )}
              </MDBox>

            </MDBox>
          </MDBox>

        
            <MDBox display="flex" flexDirection="row" >
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                手機號碼
                  {/* 手機號碼 */}
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="mobileNo"
                    fullWidth
                    name="mobileNo"
                    value={user.mobileNo}
                    onChange={changeHandler}
                    error={errors.mobileNoError}
                  />
                  {errors.mobileNoError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      手機號碼不能為空
                      {/* The mobile number can not be null */}
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>

             
            
               
                  <UserGroupDropdown onSelectChange={handleDropDownRolesSelect} />

              
             
              



            
          </MDBox>
          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox display="flex" flexDirection="row">
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                新密碼
                  {/* New Password */}
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="newPassword"
                    placeholder="New Password"
                    value={user.newPassword}
                    onChange={changeHandler}
                    error={errors.newPassError}
                    disabled={isDemo}
                    inputProps={{
                      autoComplete: "new-password",
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                  {errors.newPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      密碼必須至少包含 8 個字符
                      {/* The password must be of at least 8 characters */}
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                ml={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                確認密碼
                  {/* Password Confirmation */}
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={changeHandler}
                    error={errors.confirmPassError}
                    disabled={isDemo}
                    inputProps={{
                      autoComplete: "confirmPassword",
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                  {errors.confirmPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      確認密碼必須與目前密碼一致
                      {/* The password confirmation must match the current password */}
                    </MDTypography>
                  )}
                </MDBox>
                
              </MDBox>

              
            </MDBox>
            <MDBox >
            <MDBox display="flex" flexDirection="row">
              
                  <LocationDropDown onSelectChange={handleDropDownRegionSelect}/>

            
              </MDBox>
       </MDBox>
           
            <MDBox mt={4} display="flex" justifyContent="end">
              <MDButton variant="gradient" color="info" type="submit">
              儲存變更
                {/* Save changes */}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default UserProfile;
