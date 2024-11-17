
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link } from 'react-router-dom';

// Images
import team2 from "assets/images/team-2.jpg";


import axios from 'axios';
import { useState, useEffect, useContext } from "react";

export default function Data() {

  
  const [stores, setStores] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const userId=localStorage.getItem("user");
  const userGroup=localStorage.getItem("user_group");
  const fetchStores = async () => {
    try {
      // Make an API call to fetch notifications
      const response = await axios.get(apiBaseUrl+'/api/store/', {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setStores(response.data);
        setAllStores(response.data);
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
    fetchStores();
  }, []); 

  const filterStores = (searchQuery) => {
 
   const filtered = allStores.filter(store =>
    store.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.owner_name.toLowerCase().includes(searchQuery.toLowerCase())
    // Add more fields as needed for filtering
   
  );
  setStores(filtered)
   
  };
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    filterStores,
    columns: [
      { Header: "店铺名称", accessor: "shop_name", width: "35%", align: "left" },
      { Header: "店铺面积", accessor: "shop_address", align: "left" },
      { Header: "所有者名称", accessor: "owner_name", align: "center" },
      { Header: "年级", accessor: "grade", align: "center" },
      { Header: "渠道", accessor: "channel", align: "center" },
      { Header: "编辑", accessor: "edit", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows:  stores.map((store, index) => ({
      shop_name: (
          <Link to={`/store-management/store-profile/${store.id}`}>
            <Author component="a" href="/store-profile" image={team2} name={store.shop_name} email={store.email}/>
          </Link>
        ),
        shop_address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {store.address}
          </MDTypography>
        ),
        
        owner_name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {store.owner_name}
          </MDTypography>
        ),
        grade: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {store.grade}
          </MDTypography>
        ),
        channel: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {store.channel}
          </MDTypography>
        ),
        edit: (
          <div>{userGroup != "WORKER" && (
           <Link to={`/store-management/update-store/${store.id}`}>
           <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
           
            编辑
          </MDTypography>
        </Link> )}
        </div>
         ),
        // action: (
        //   <MDBox ml="auto" lineHeight={0} color= "dark">
        //   <Tooltip title="Edit Card" placement="top">
        //     <Icon sx={{ cursor: "pointer" }} fontSize="small">
        //       edit
        //     </Icon>
        //   </Tooltip>
        // </MDBox>
        // ),
      }))
  };
}
