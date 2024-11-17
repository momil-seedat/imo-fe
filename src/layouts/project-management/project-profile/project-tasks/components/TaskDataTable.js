
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

  
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const userId=localStorage.getItem("user")
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  let { project_id } = useParams();
  const fetchTasks = async () => {
    let taskData ={
        project_id: project_id
    };
    try {

      const response = await axios.post(apiBaseUrl+'/tasks/user/', taskData, {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // Make an API call to fetch notifications
     
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setTasks(response.data.tasks);
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
    fetchTasks();
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
   function getStatusTranslation(status) {
    const statusTranslations = {
        "COMPLETED": "完全的",
        "ON-HOLD": "暂停",
        "IN-PROGRESS": "处理中",
        "DISCARD": "已取消",
        "SUBMITTED": "已提交",
        "APPROVED": "已批准",
        "REJECTED": "已驳回",
        "BACKLOG": "未开始"
    };
  }
  return {
    columns: [
      { Header: "任务序列号", accessor: "task_serial", align: "left" },
      { Header: "项目序列号", accessor: "project", align: "left" },
      { Header: "分配给", accessor: "assigned_to", align: "left" },
     
      { Header: "状态", accessor: "status", align: "center" },
      { Header: "创建日期", accessor: "created_date", align: "center" },

    ],

    rows:  tasks.map((task, index) => ({
      task_serial: (
        <Link to={`/task-mangement/task_profile/${task.task_id}`}>
        <Author component="a" name={task.task_serial} />
      </Link>
         
        ),
        project: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {task.project_serial_no}
          </MDTypography>
        ),
        assigned_to: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {task.assigned_to}
          </MDTypography>
        ),
        
  
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {getStatusTranslation(task.status)}
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
