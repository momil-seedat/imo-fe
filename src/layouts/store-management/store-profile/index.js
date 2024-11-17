
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import SaveChangesBanner from "components/MDBanner/SaveChangesBanner";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { Modal,Box,TextField } from '@mui/material';
// Overview page components
import Header from "layouts/store-management/Header";
import Icon from "@mui/material/Icon";

// Billing page components

import { useMaterialUIController } from "context";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {


  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,

} from '@mui/material';


// Images

function StoreProfile() {
  const token = localStorage.getItem("token");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [projects, setProjects] = useState([]);
  const [store, setStore] = useState([]);
  const [storeContacts, setStoreContact] = useState([]);
  const userGroup = localStorage.getItem("user_group");
  let { store_id } = useParams();
  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [updateContact, setUpdateContact] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const [bannerOpen, setBannerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');


  const generatePDF = async (store) => {

  };

  const handleCloseBanner = () => {
    setBannerOpen(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddContact = () => {
    setStoreContact([...storeContacts, newContact]);
    setNewContact({ name: '', email: '', phone: '' });
    handleClose();
    setUpdateContact(true)
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = storeContacts.filter((_, i) => i !== index);
    setStoreContact(updatedContacts);
    setUpdateContact(true)
  };

  const handleupdateContact = async() => {
    try {
      console.log(storeContacts)
      const url = apiBaseUrl + `/store/${store_id}/contacts/update/`;
      console.log(url)
      const response =  await axios.put(url, storeContacts, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setSuccess(true);
        setBannerOpen(true);

       console.log("ok")


      } else {
        console.error('Error:', response.data);
        setSuccess(false);
      setBannerOpen(true);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccess(false);
      setBannerOpen(true);
    
      // Handle error
    }
    setUpdateContact(false)
  };
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
  const fetchStoreContacts = async () => {

    try {

      const url = apiBaseUrl + `/store/${store_id}/contacts/`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {


        setStoreContact(response.data)


      } else {
        console.error('Error:', response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };


  const fetchProject = async () => {

    try {

      const url = apiBaseUrl + `/api/projects/store/${store_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {


        setProjects(response.data.projects)


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
    // Fetch notifications when the component mounts
    fetchStore();
    fetchProject();
    fetchStoreContacts();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>



        <MDBox mt={5} mb={3}>


          <MDBox pt={3} px={2} bgColor={darkMode ? "transparent" : "grey-100"}>
            <MDTypography variant="h6" fontWeight="medium">
              {/* Store Information */}
              店铺信息
            </MDTypography>
            {/* <button onClick={() => generatePDF(store)}>Export as PDF</button> */}
          </MDBox>
          <MDBox pt={1} pb={2} px={2} bgColor={darkMode ? "transparent" : "grey-100"}>
            <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>

              <MDBox width="100%" display="flex" flexDirection="column">
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  flexDirection={{ xs: "column", sm: "row" }}
                  mb={2}
                >

                  {/* <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                    {name}
                  </MDTypography> */}

                  <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                    <MDBox mr={1}>
                      {/* <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton> */}
                    </MDBox>
                    <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                    <Link to={`/store-management/update-store/${store.id}`}>
                      <Icon>edit</Icon>&nbsp;编辑
                      </Link>
                    </MDButton>
                  </MDBox>

                </MDBox>

                <Table >
                  <TableBody sx={{ border: 'none' }}>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* Name */}
                        店家名稱
                      </TableCell>
                      <TableCell align="left" >
                        {store.shop_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* Address */}
                        地址
                      </TableCell>
                      <TableCell align="left" >
                        {store.address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* Brands */}
                        品牌
                      </TableCell>
                      <TableCell align="left" >

                        {store.brands}


                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* Owner */}
                        擁有者
                      </TableCell>
                      <TableCell align="left" >
                        {store.owner_name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* Purchase Data */}
                        購買數據
                      </TableCell>
                      <TableCell align="left" >
                        {store.purchase_data}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* floors */}
                        樓層
                      </TableCell>
                      <TableCell align="left" >
                        {store.floors}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* floors */}
                        商店區
                      </TableCell>
                      <TableCell align="left" >
                        {store.store_area}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head" >
                        {/* no_of_rooms */}
                        房間的數量
                      </TableCell>
                      <TableCell align="left" >
                        {store.no_of_rooms}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left" variant="head">
                        {/* Sales */}
                        銷售量
                      </TableCell>
                      <TableCell align="left" >
                        {store.sales}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" variant="head">
                        {/* Email */}
                        電子郵件
                      </TableCell>
                      <TableCell align="left" >
                        {store.email}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {/* <button onClick={generatePDF}>Generate PDF</button> */}
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox pt={1} pb={2} px={2} bgColor={darkMode ? "transparent" : "grey-100"}>
      <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        <MDTypography variant="h6" fontWeight="medium">
          {/* Store Contacts */}
          存储联系人
        </MDTypography>
        
        <MDBox display="flex" alignItems="center" justifyContent="flex-end" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                   
                    <MDButton variant="text" color="info" onClick={handleOpen}>
                      <Icon>edit</Icon>&nbsp;编辑
                    </MDButton>
                  </MDBox>
    
        <Table>
          <TableBody sx={{ border: 'none' }}>
            <TableRow>
               {/* name */}
              <TableCell align="left" variant="head">姓名</TableCell>
                {/* email */} 
              <TableCell align="left" variant="head">電子郵件</TableCell>
                 {/* phone */} 
              <TableCell align="left" variant="head">電話</TableCell>
                 {/* actions */} 
              <TableCell align="left" variant="head">行動</TableCell>
            </TableRow>
            {storeContacts && storeContacts.map((contact, index) => (
              <TableRow key={index}>
               
                <TableCell align="left">{contact.name}</TableCell>
                <TableCell align="left">{contact.email}</TableCell>
                <TableCell align="left">{contact.phone}</TableCell>
                <TableCell align="left">
                  <MDButton variant="text" color="primary" onClick={() => handleDeleteContact(index)}>
                  <Icon>delete</Icon>&nbsp;删除
                  </MDButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {updateContact &&(
        <MDButton variant="contained" color="info" onClick={handleupdateContact}>
                      <Icon>save</Icon>&nbsp;节省
                    </MDButton>)}

      <SaveChangesBanner open={bannerOpen} onClose={handleCloseBanner} success={success} message={message} />
      </MDBox>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <MDTypography variant="h6" component="h2">
          新增联系信息   {/* Add new Contact */} 
          </MDTypography>
          <TextField
            label="姓名"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="電子郵件"
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="電話"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            fullWidth
            margin="normal"
          />
          <MDButton variant="contained" color="primary" onClick={handleAddContact}>
            {/* Add Contact */} 增加聯繫人
          </MDButton>
        </Box>
      </Modal>
    </MDBox>
        {userGroup != "WORKER" && (
          <div>
            <MDBox pt={2} px={2} lineHeight={1.25}>
              <MDTypography variant="h6" fontWeight="medium">
                {/* Projects */}
                專案
              </MDTypography>
              <MDBox mb={1}>
                <MDTypography variant="button" color="text">
                  {/* designs */}
                  設計
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox p={2}>
              <Grid container spacing={6}>
                {projects.map((project, index) => (
                  <Grid key={index} item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      label={`專案 #${index + 1}`}
                      title={project.project_serial_no} // Replace with the field from your project data for the title
                      description={project.title} // Replace with the field from your project data for the description
                      action={{
                        type: 'internal',
                        route: `/project-management/project-profile/${project.id}`,
                        color: 'info',
                        // label: 'View Project',
                        label: '查看項目',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

            </MDBox>
          </div>
        )}

      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default StoreProfile;
