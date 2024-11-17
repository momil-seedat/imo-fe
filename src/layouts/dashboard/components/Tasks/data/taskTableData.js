
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

import { Link, useNavigate } from 'react-router-dom';
import ComplexStatisticsCard from "examples/Cards/InfoCards/DefaultInfoCard"
// Images
import axios from 'axios';
import { useState, useEffect} from "react";
export default function Data() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const userId=localStorage.getItem("user");
  const userGroup=localStorage.getItem("user_group");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const fetchTasks = async () => {
    let taskData = {};

    if (userGroup === 'WORKER') {
      taskData = {
        ...taskData,
        assigned_to: userId,
      };
    } else {
      taskData = {
        ...taskData,
        assignee: userId,
       
      };
    }
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


  const fetchFilteredTasks = async (filterValues) => {
    // Your existing code to construct taskData based on userGroup and filterValues
  
    filterValues = {
      status : ['REJECTED','SUBMITTED'],
      user_id: userId
    };
    try {
      const response = await axios.post(apiBaseUrl+'/filtertasks/user/', filterValues, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  console.log(response)
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
  
  const fetchAdminTasks = async () => {
    
    try {

      const response = await axios.get(apiBaseUrl+'/api/tasks/', {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // Make an API call to fetch notifications
     
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setTasks(response.data);
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
    if (userGroup === 'ADMIN'){
      fetchFilteredTasks(null);
    }
    else{
      fetchFilteredTasks(null);
    }
  }, []); 

  // Function to truncate text and add ellipsis if it exceeds the max length
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`;
    }
    return text;
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
  const navigate=useNavigate();
  const handleEditCard = () => {
    // Your logic for handling the edit card click event
    console.log("Edit card clicked");
    navigate('/task-mangement/view-submission')
    // Add your custom logic here
  };
  
  function formatDate(utcTimestamp) {
    if(!utcTimestamp){
      return "---"
    }
    const date = new Date(utcTimestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
    const year = date.getUTCFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;

    return formattedDate;
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'SUBMITTED':
        return 'info';
      default:
        return 'text';
    }
  };
 
  const formatUpdatedTime = (updatedTime) => {
    const updatedDate = new Date(updatedTime);
    const now = new Date();
    const timeDiffInSeconds = Math.floor((now - updatedDate) / 1000);
    const hoursDiff = Math.floor(timeDiffInSeconds / 3600);
    const minutesDiff = Math.floor((timeDiffInSeconds % 3600) / 60);
    const secondsDiff = timeDiffInSeconds % 60;
  
    if (hoursDiff < 12) {
      if (hoursDiff > 0) {
        return `${hoursDiff} hours ago`;
      } else if (minutesDiff > 0) {
        return `${minutesDiff} minutes ago`;
      } else {
        return `${secondsDiff} seconds ago`;
      }
    } else {
      return `${String(updatedDate.getDate()).padStart(2, '0')}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${updatedDate.getFullYear()}`;
    }
  };

  const truncatedTextStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px', // Adjust this value based on your requirement
    display: 'inline-block',
    verticalAlign: 'bottom',
  };
  function getStatusTranslation(status) {
    const statusTranslations = {
        "ON-HOLD": "暂停",
        "IN-PROGRESS": "处理中",
        "DISCARD": "已取消",
        "SUBMITTED": "已提交",
        "APPROVED": "已批准",
        "REJECTED": "已驳回",
        "BACKLOG": "未开始"
    };

    // Return the value for the provided key (status), or the key itself if not found
    return statusTranslations[status] || status;
}
  return {

    fetchFilteredTasks,
    columns: [
      { Header: "序號", accessor: "task_serial", align: "left" },
      { Header: "專案", accessor: "project", align: "left" },
      { Header: "分配給", accessor: "assigned_to", align: "left" },
     
      { Header: "地位", accessor: "status", align: "center" },
      { Header: "建立日期", accessor: "created_date", align: "center" },
      { Header: "最后更新", accessor: "last_updated_at", align: "center" },
      { Header: "结束日期", accessor: "end_date", align: "center" },
      { Header: "编辑", accessor: "edit", align: "center" },
      { Header: "行動", accessor: "action", align: "center" },
    ],

    

    rows:  tasks 
    .map((task, index) => ({
      task_serial: (
        <Link to={userGroup === 'ADMIN' ? `/task-mangement/task_profile/${task.id}` : `/task-mangement/task_profile/${task.task_id}`}>
         <Author  title={task.name} component="a" name={(userGroup === 'ADMIN' && task.task_serial_no) ?truncateText(task.name,26):truncateText(task.name,28)} /> 
      
      </Link>
         
        ),
        project: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {(userGroup === 'ADMIN' && task.project) ? truncateText(task.project.title,26) : task.project_title}
          </MDTypography>
        ),
        assigned_to: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {(userGroup === 'ADMIN' && task.task_assigned_to) ?task.task_assigned_to.username:task.assigned_to}
          </MDTypography>
        ),
        
  
        status: (
          <MDTypography component="a" href="#" variant="caption" color={getStatusColor(task.status)} fontWeight="medium">
          {getStatusTranslation(task.status)}
       </MDTypography>
          // <MDBox ml={-1}>
          //   <MDBadge badgeContent="active" color="success" variant="gradient" size="sm" />
          // </MDBox>
        ),
        created_date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {(userGroup === 'ADMIN' && task.start_date) ?formatDate(task.start_date):task.created_at}
          </MDTypography>
        ),
        last_updated_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {formatUpdatedTime(task.updated_at)}
          </MDTypography>
        ),
        end_date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {userGroup === 'ADMIN' ?formatDate(task.end_date):task.end_date}
          </MDTypography>
        ),

        edit: (
         <div>{userGroup != "WORKER" && (
          <Link to={userGroup === 'ADMIN' ? `/task-management/update-task/${task.task_id}` : `/task-management/update-task/${task.task_id}`}>
          <MDTypography component="a" href="#" variant="caption" color="dark" fontWeight="medium">
           {/* Add Submission */}
        
编辑
         </MDTypography>
       </Link> )}
       </div>
        ),

        action: (
//           <MDBox ml="auto" lineHeight={0} color="dark" onClick={handleEditCard}>
//   <Tooltip title="Edit Card" placement="top">
//     <Icon sx={{ cursor: "pointer" }} fontSize="small">
//       view
//     </Icon>
//   </Tooltip>
// </MDBox>
<div>
      {userGroup === 'WORKER' && task.status != "APPROVED" ? (
        <div>
         <Link to={`/task-submission/add-task-submission/${task.id}`}>
         <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
          {/* Add Submission */}
          添加提交
        </MDTypography> |
      </Link>
        <Link to={userGroup === 'ADMIN' ? `/task-submission/view-submission/${task.id}` : `/task-submission/view-submission/${task.id}`}>
        <MDTypography component="a" href="#" variant="caption" color="info" fontWeight="medium">
         {/* View Submission */}
         查看提交內容
       </MDTypography>
     </Link>
     </div>
      
      ) : (
        <Link to={userGroup === 'ADMIN' ? `/task-submission/view-submission/${task.id}` : `/task-submission/view-submission/${task.id}`}>
           <MDTypography component="a" href="#" variant="caption" color="success" fontWeight="medium">
            {/* View Submission */}
            查看提交內容
          </MDTypography>
        </Link>
      )}
    </div>

        ),
      }))
  };
}
