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
// Overview page components
import Header from "layouts/store-management/Header";



const AddStore = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showContacts, setShowContacts] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const token = localStorage.getItem("token");
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
    })
    setContacts(null);
    setErrors({
      titleError: false,
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  // const getStoreData = async () => {
  //   const response = await AuthService.getProfile();
  //   if (response.data.id == 1) {
  //     setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  //   }
  //   setStore((prevstore) => ({
  //     ...prevstore,
  //     ...response.data.attributes,

  //   }));
  // };

  const [contacts, setContacts] = useState([
 
  ]);

  const handleAddContact = () => {
    const newContact = { name: '', email: '', phone: '' };
    setContacts([...contacts, newContact]);
    setShowContacts(true);

  };

  const handleRemoveContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  // useEffect(() => {
  //   getStoreData();
  // }, []);

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

    if (store.name.trim().length === 0) {
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

      shop_name: store.name,
      email: store.email,
      owner_name: store.owner_name,
      installation_time: store.installation_time,
      sales: store.sales,
      contacts: contacts,
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
    const response = await axios.post(apiBaseUrl + '/api/store/', storeData, {
      headers: {
        Authorization: `Token ${token}`,  // Replace with your authentication token
      },
    });
    // call api for update

    console.log('Store submitted successfully:', response.data);

    if (response && response.status === 201) {
     console.log("success")
     
      setErrorMessage("");
      resetForm();
      setSuccessMessage('Store added successfully');
      setNotification(true);
     
      // Reset form values upon successful submission
    } else {
      
      setErrorMessage('Failed to add store'); // Display error message if response status is not 200
    }
  }
  catch (error) {
    setErrorMessage('Unable to add store');
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
            {/* Add New Store */}
            新增商店
          </MDTypography>
        </MDBox>

        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >

<Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              店家名稱
            </MDTypography>
            <MDInput
              type="name"
              fullWidth
              name="name"
              value={store.name}
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
              error={errors.storeError}
            />
            {errors.ownerError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                所有者名稱不能為空
              </MDTypography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              安裝日期時間
            </MDTypography>
            <MDBox mb={2} width="100%" display="flex">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateTimeChange}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                placeholderText="Select a Installation Time"
                fullWidth
              />
              <CalendarTodayIcon style={{ marginLeft: '8px', alignSelf: 'center', color: '#888' }} />
            </MDBox>
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
<br/>
          <div>
            <h4>
              {/* Add Contacts */}
              新增聯絡人
              </h4>
            {showContacts && contacts.map((contact, index) => (
              <MDBox key={index} mb={3} display="flex">
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    {/* Contact Name */}
                    聯絡人姓名
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      id={`contactName${index}`}
                      type="text"
                      name="contact_name"
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                      error={errors.nameError}
                    />
                  </MDBox>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    {/* Email */}
                    電子郵件
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      id={`contactEmail${index}`}
                      type="email"
                      name="contact_email"
                      value={contact.email}
                      onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                      error={errors.emailError}
                    />
                  </MDBox>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                    {/* Phone */}
                    電話
                  </MDTypography>
                  <MDBox mb={2} width="100%">
                    <MDInput
                      id={`contactPhone${index}`}
                      type="tel"
                      name="contact_phone"
                      value={contact.phone}
                      onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                      error={errors.phoneError}
                    />
                  </MDBox>
                </div>
                <MDButton variant="text" color="error" type="button" onClick={handleRemoveContact}>
                  <Icon>delete</Icon>&nbsp;刪除
                  {/* delete */}
                </MDButton>

              </MDBox>
            ))}



            <MDButton variant="gradient" color="dark" size="small" type="button" onClick={handleAddContact}>
              {/* Add Contact */}
              增加聯繫人
            </MDButton>

            {/* ...rest of your component */}
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <MDButton variant="gradient" color="info" type="submit" onClick={submitHandler}>
              {/* Save changes */}
              儲存變更
            </MDButton>
          </div>
        </MDBox>

      </Header>

    </DashboardLayout>
  );
};

export default AddStore;
