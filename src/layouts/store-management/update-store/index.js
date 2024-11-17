import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import the calendar icon

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from 'axios';
import Icon from "@mui/material/Icon";
import { Grid } from '@mui/material';
import SaveChangesBanner from "components/MDBanner/SaveChangesBanner";
import { useParams } from 'react-router-dom';
// Overview page components
import Header from "layouts/store-management/Header";



const UpdateStore = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bannerOpen, setBannerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const token = localStorage.getItem("token");
  let { store_id } = useParams();
  const [store, setStore] = useState({
    name: "",
    email: "",
    owner_name: "",
    installation_time: "",
    grade: "",
    channel: "",
    description: "",
    address: "",
    store_area:"",
    floors:"",
    no_of_rooms:""
  });



  const handleCloseBanner = () => {
    setBannerOpen(false);
    window.location.href = `/store-management/store-profile/${store_id}`;
  

  };
  

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateTimeChange = (date) => {
    // Update the state with the selected datetime
    setSelectedDate(date);
  };

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    ownerError: false,
    installation_time: false,

  });
  const resetForm = () => {
    setStore({
    shop_name: "",
    email: "",
    owner_name: "",
    installation_time: "",
    grade: "",
    channel: "",
    description: "",
    address: "",
    store_area:"",
    floors:"",
    no_of_rooms:""
    })
 
    setErrors({
      titleError: false,
    });
    setSuccessMessage('');
    setErrorMessage('');
    setMessage('');
  };

 
  const fetchStore = async () => {

    try {

      const url = apiBaseUrl + `/api/store/${store_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {


        setStore(response.data)


      } else {
        console.error('Error:', response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };



  
  useEffect(() => {
    fetchStore();
  }, []);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors,  nameError: false,
      emailError: false,
      ownerError: false, });
   
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    const mailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (store.shop_name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }
    
    if (store.email.trim().length > 0 && !store.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (store.owner_name.trim().length === 0) {
      setErrors({ ...errors, ownerError: true });
      return;
    }



    let storeData = {

      shop_name: store.shop_name,
      email: store.email,
      owner_name: store.owner_name,
      sales: store.sales,
      address: store.address,
      description: store.description,
      store_area:store.store_area,
      floors:store.floors,
      no_of_rooms:store.no_of_rooms,
      grade:store.grade,
      channel:store.channel,
      

    }
try{
    console.log(storeData);
    const url = apiBaseUrl + `/api/store/${store_id}/`;
    const response = await axios.put(url, storeData, {
      headers: {
        Authorization: `Token ${token}`,  // Replace with your authentication token
      },
    });
    // call api for update

    console.log('Store submitted successfully:', response.data);

    if (response && response.status === 200) {
     console.log("success")
     
      setErrorMessage("");
      resetForm();
      //Store changes saved successfully
      setSuccessMessage('存儲已成功保存的更改');
      setSuccess(true);
      setBannerOpen(true);
      setNotification(true);
      setMessage("存儲已成功保存的更改")
     
      // Reset form values upon successful submission
    } else {
        setSuccess(false);
        setBannerOpen(true);
        setMessage("保存存儲更改時發生錯誤")
      setErrorMessage('Failed to add store'); // Display error message if response status is not 200
    }
  }
  catch (error) {
    setErrorMessage('Unable to add store');
    setSuccess(false);
    setBannerOpen(true);
    //There is an error in saving store changes
    setMessage("保存存儲更改時發生錯誤")
    // Handle error submitting project
  }
    // call api for update
    // const response = await AuthService.updateProfile(JSON.stringify(storeData));

    // reset errors
 

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header >
      {notification && successMessage && (
          <MDAlert color="success" mt="20px">
            <MDTypography variant="body2" color="white">
              {successMessage}
            </MDTypography>
          </MDAlert>
        )}

{notification && errorMessage && (
          <MDAlert color="error" mt="20px">
            <MDTypography variant="body2" color="white">
              {errorMessage}
            </MDTypography>
          </MDAlert>
        )}

<MDBox height="100%" mt={1.5} lineHeight={1.5}>
      <MDTypography variant="h4" fontWeight="medium">
        更新存儲數據
      </MDTypography>
      <MDBox component="form" role="form" onSubmit={submitHandler} mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              店家名稱
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="shop_name"
              value={store.shop_name}
              onChange={changeHandler}
              error={errors.nameError}
            />
            {errors.nameError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                商店不能為空
              </MDTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              輸入銷售額
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="sales"
              value={store.sales}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              商店區
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="store_area"
              value={store.store_area}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              樓層
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="floors"
              value={store.floors}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              房間數
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="no_of_rooms"
              value={store.no_of_rooms}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              頻道
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="channel"
              value={store.channel}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              輸入年級
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="grade"
              value={store.grade}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              輸入地址
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="address"
              value={store.address}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              輸入描述
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="description"
              value={store.description}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              業主姓名
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="owner_name"
              value={store.owner_name}
              onChange={changeHandler}
              error={errors.ownerError}
            />
            {errors.ownerError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                所有者名稱不能為空
                {/* Owner name cannot be empty */}
              </MDTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              電子郵件
            </MDTypography>
            <MDInput
              type="email"
              fullWidth
              name="email"
              value={store.email}
              onChange={changeHandler}
              error={errors.emailError}
              disabled={isDemo}
            />
            {errors.emailError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                電子郵件必須有效
              </MDTypography>
            )}
          </Grid>
        </Grid>

        <MDBox mt={3} display="flex" justifyContent="flex-end">
          <MDButton variant="gradient" color="info" type="submit" onClick={submitHandler}>
            儲存變更
            {/* Save changes */}
          </MDButton>
        </MDBox>
      </MDBox>
      <SaveChangesBanner open={bannerOpen} onClose={handleCloseBanner} success={success} message={message} />
    </MDBox>
      </Header>

    </DashboardLayout>
  );
};

export default UpdateStore;
