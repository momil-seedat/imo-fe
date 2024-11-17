
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Link, useNavigate ,useParams} from 'react-router-dom';


import axios from 'axios';
import { useState, useEffect} from "react";
export default function Data() {

const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const userId=localStorage.getItem("user")
  let { store_id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const fetchStore = async () => {
     
    try {

        const url = apiBaseUrl+`/api/store/${store_id}`;
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


  const fetchProject= async () => {
     
    try {

        const url = apiBaseUrl+`/api/projects/store/${store_id}`;
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
   
    fetchProject();
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

 
  const navigate=useNavigate();
  const handleEditCard = () => {
    // Your logic for handling the edit card click event
    console.log("Edit card clicked");
    navigate('/task-mangement/view-submission')
    // Add your custom logic here
  };
  
  return {
    columns: [
      { Header: "serial no", accessor: "task_serial", align: "left" },
      { Header: "project", accessor: "project", align: "left" },
      { Header: "assigned to", accessor: "assigned_to", align: "left" },
     
      { Header: "status", accessor: "status", align: "center" },
      { Header: "created date", accessor: "created_date", align: "center" },

    ],

    rows:  tasks.map((task, index) => ({
      task_serial: (
        <Link to={`/task-mangement/task_profile/${task.task_id}`}>
        <Author component="a" name={task.task_serial} />
      </Link>
         
        ),
        project: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {project.project_serial_no}
          </MDTypography>
        ),
        assigned_to: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {task.assigned_to}
          </MDTypography>
        ),
        
  
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {task.status}
       </MDTypography>
          // <MDBox ml={-1}>
          //   <MDBadge badgeContent="active" color="success" variant="gradient" size="sm" />
          // </MDBox>
        ),
        created_date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {task.created_at}
          </MDTypography>
        ),
      
      }))
  };
}
