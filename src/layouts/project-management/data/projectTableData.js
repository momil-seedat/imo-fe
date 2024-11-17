import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import Switch from "@mui/material/Switch";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
// Images


export default function Data() {
  const [projects, setProjects] = useState([]);
  const [newLaunches, setNewLaunches] = useState(false);
  const [store, setStore] = useState([]);
  const token = localStorage.getItem("token");
  const userId=localStorage.getItem("user")
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

  const fetchProjects = async (filterValues) => {
  
      let projectData ={
        user_id: localStorage.getItem("user"),
      };
      if (filterValues) {
        projectData.project_serial_no = filterValues.project_serial_no;
        projectData.start_date = filterValues.start_date;
        projectData.end_date = filterValues.end_date;
        projectData.status = filterValues.status;
        
    }
    try {
      // Make an API call to fetch notifications
      const response = await axios.post(apiBaseUrl+'/assign/permission', projectData,{
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setProjects(response.data.assigned_projects);
       
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

  function translateStatusToChinese(status) {
    const statusTranslations = {
        "BACKLOG": "未开始",
        "IN-PROGRESS": "处理中",
        "COMPLETED": "完全的",
        "ON-HOLD": "暂停",
        "DISCARD": "已取消"
    };

    return statusTranslations[status] || "未知状态"; // Returns "未知状态" (Unknown Status) if status is not found
}
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

    fetchProjects,

    columns: [
      { Header: "项目序列号", accessor: "project", width: "45%", align: "left" },
      { Header: "店鋪", accessor: "store", align: "left" },
      { Header: "由...製作", accessor: "created_by", align: "left" },
      { Header: "项目名称", accessor: "title", align: "left" },
      { Header: "进步", accessor: "progress", align: "center" },
    
      { Header: "建立日期", accessor: "created_date", align: "center" },
      { Header: "结束日期", accessor: "end_date", align: "center" },
      { Header: "状态", accessor: "status", align: "center" },

       { Header: "行动", accessor: "action", align: "center" },
    ],

    rows :  projects.map((project, index) => ({
      project: (
        <Link to={`/project-management/project-profile/${project.project_id}`} key={index}>
          <Author component="a" href="/project-profile" name= {project.project_serial_no}  />            
        </Link>
      ),
      store: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
      {project.store}
        </MDTypography>
      ),
      
      created_by: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
      {project.created_by}
        </MDTypography>
      ),
      title: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.title}
        </MDTypography>
      ),
    
      created_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.created_at}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {translateStatusToChinese(project.status)}
        </MDTypography>
      ),
      end_date: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" key={index}>
          {project.end_date}
        </MDTypography>
      ),
      progress: (
        <MDBox display="block" alignItems="center">
     
     <div>
     <MDTypography variant="block" color="text" fontWeight="small">
     {project.progress?project.progress:0}%
      </MDTypography>
     </div>
      <MDBox ml={0.5} width="6rem">
        <MDProgress variant="gradient" color="success" value= {project.progress?project.progress:0} />
      </MDBox>
     
    </MDBox>),
      // action: (
      //   <MDBox ml="auto" lineHeight={0} color="dark" key={index}>
      //     <Tooltip title="Edit Card" placement="top">
      //       <Icon sx={{ cursor: "pointer" }} fontSize="small">
      //         edit
      //       </Icon>
      //     </Tooltip>
      //   </MDBox>
      // ),
      
        action: (
//           <MDBox ml="auto" lineHeight={0} color="dark" onClick={handleEditCard}>
//   <Tooltip title="Edit Card" placement="top">
//     <Icon sx={{ cursor: "pointer" }} fontSize="small">
//       view
//     </Icon>
//   </Tooltip>
// </MDBox>
<div>
    
         <Link to={`/project-management/update-project/${project.project_id}`}>
         <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
          {/* Add Submission */}
       {/* Edit */}
       编辑
        </MDTypography>
      </Link>
   </div>)   
    }))

    
    // 'rows' is now an array of objects that can be used within your application.
    
  }
}