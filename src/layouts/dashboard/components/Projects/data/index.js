
// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

import Icon from "@mui/material/Icon";


import MDBadge from "components/MDBadge";
import { Link } from 'react-router-dom';
// Images

import axios from 'axios';
import { useState, useEffect, useContext } from "react";

export default function Data() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");
  const [allProjects, setAllProjects] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const fetchProjects = async () => {
    try {
      // Make an API call to fetch notifications
      const response = await axios.get(apiBaseUrl+'/api/projects/', {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setProjects(response.data);
        setAllProjects(response.data);
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
    fetchProjects();
  }, []); 
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

  function formatDate(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const year = date.getUTCFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;

    return formattedDate;
  }

  const filterStores = (searchQuery) => {
 console.log(searchQuery);
 const filtered = allProjects.filter(project => {
  // Check if project_serial_no is not null and perform the filtering accordingly
  if (project.project_serial_no !== null) {
    return project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           project.project_serial_no.toLowerCase().includes(searchQuery.toLowerCase());
  } else {
    return project.title.toLowerCase().includes(searchQuery.toLowerCase());
  }
});
   setProjects(filtered)
    
   };
  return {
    filterStores,
    columns: [
      { Header: "项目名称", accessor: "project", width: "45%", align: "left" },
      { Header: "店铺", accessor: "store", align: "left" },
      { Header: "项目负责人", accessor: "main_project", align: "left" },
      { Header: "项目序列号", accessor: "project_serial_no", align: "center" },
      { Header: "创建日期", accessor: "created_date", align: "center" },
      { Header: "行动", accessor: "action", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows :  projects.map((project, index) => ({
      project: (
        <Link to={`/project-management/project-profile/${project.id}`} key={index}>
          <Author component="a" href="/project-profile" name= {project.title}  />
           
             
        </Link>
      ),
      store: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.store.shop_name}
        </MDTypography>
      ),
      main_project: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.created_by.username}
        </MDTypography>
      ),
      project_serial_no: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.project_serial_no}
        </MDTypography>
      ),
      created_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
         
          {formatDate(project.created_at)}
        </MDTypography>
      ),
      action: (
      
        <div>
            
                 <Link to={`/project-management/update-project/${project.id}`}>
                 <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
                  {/* Add Submission */}
                  编辑
                </MDTypography>
              </Link>
           </div>)  
      // action: (
      //   <MDBox ml="auto" lineHeight={0} color="dark" key={index}>
      //     <Tooltip title="Edit Card" placement="top">
      //       <Icon sx={{ cursor: "pointer" }} fontSize="small">
      //         edit
      //       </Icon>
      //     </Tooltip>
      //   </MDBox>
      // ),
    }))

    
    // 'rows' is now an array of objects that can be used within your application.
    
  }
}