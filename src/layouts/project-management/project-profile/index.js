
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";

import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import ProjectTasks from "./project-tasks";
// Billing page components
import { Modal, Box,TableHead } from '@mui/material';
import { useMaterialUIController } from "context";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import {


    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,

} from '@mui/material';


function ProjectProfile() {

    const [project, setProject] = useState([]);
    const [store, setStore] = useState([]);
    const [createdby, setCreatedby] = useState([]);
    const token = localStorage.getItem("token");
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const userGroup = localStorage.getItem("user_group");
    let { project_id } = useParams();
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
    const [currentStatus, setCurrentStatus] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [projectUsers, setProjectUsers] = useState([]);

    const fetchProjectUsers = async () => {

        try {
            const response = await axios.get(`http://localhost:8000/users/by-project/${project_id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            if (!response) {
                throw new Error('Failed to fetch assigned users');
            }

            setProjectUsers(response.data);
        } catch (error) {
            console.error('Error fetching project users:', error);
        }
    };

    const handleOpenModal = () => {
        fetchProjectUsers();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Extract the year, month, and day from the Date object
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const day = String(date.getDate()).padStart(2, '0');

        // Format the date as yyyy-mm-dd
        return `${year}-${month}-${day}`;
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        console.log(newStatus);
        setCurrentStatus(newStatus);
        const requestData = {
            status: newStatus,

        };
        console.log(requestData);

        try {

            const url = apiBaseUrl + `/projects/${project_id}/change-status/`;

            const response = axios.patch(url, requestData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json', // Set the content type if sending JSON data
                },
            });
            // Make an API call to fetch notifications

            console.log(response)

            // Check the response and update the state with the fetched notifications
            if (response && response.status === 200) {

                setProject(response.data)


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

            const url = apiBaseUrl + `/api/projects/${project_id}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            // Make an API call to fetch notifications

            console.log(response)

            // Check the response and update the state with the fetched notifications
            if (response && response.status === 200) {

                setProject(response.data)
                setStore(response.data.store)
                setCreatedby(response.data.created_by)
                setCurrentStatus(response.data.status);

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
    const statusTranslations = {
        "COMPLETED": "完全的",
        "ON-HOLD": "暂停",
        "IN-PROGRESS": "处理中",
        "DISCARD": "已取消",
        "BACKLOG":"未开始"
       
    };
    const statusOptions = ['COMPLETED', 'ON-HOLD', 'IN-PROGRESS', 'DISCARD', 'BACKLOG'];
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={8} width="80%">

                <MDBox display="flex" justifyContent="flex-end">
                    <MDButton variant="text" color="info" onClick={handleOpenModal}>
                        {/* view project users */}
                        查看項目使用者
                    </MDButton>
                </MDBox>

                <MDBox pt={3} px={2} bgColor={darkMode ? "transparent" : "grey-100"}>

                    {userGroup != "WORKER" && (
                        <div style={{ paddingLeft: '80%' }}>
                            <MDTypography variant="h6" fontWeight="light">
                                {/* Project Information */}
                                {/* status */}
                                状态
                            </MDTypography>
                            <select
                                value={currentStatus}
                                onChange={handleStatusChange}
                                style={{
                                    width: '100%',
                                    padding: '5px',

                                    border: '2px solid #ccc',
                                    borderRadius: '35px',

                                    fontSize: '0.9rem',
                                    outline: 'none',
                                }}
                            >
                                <option key={project.status} value={project.status}>
                                {statusTranslations[project.status]} 
                                </option>
                                {/* Render dropdown options */}
                                {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                       {statusTranslations[option]} 
                                    </option>
                                ))}
                            </select>
                        </div>)}
                    <MDTypography variant="h6" fontWeight="medium">
                        {/* Project Overview */}
                        项目概述
                    </MDTypography>
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
                                   
                                </MDTypography> */}

                                <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
                                    <MDBox mr={1}>
                                        {/* <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton> */}
                                    </MDBox>
                                    <MDButton variant="text" color={darkMode ? "white" : "dark"}>
                                        <Icon>edit</Icon>&nbsp;编辑
                                    </MDButton>
                                </MDBox>
                            </MDBox>

                            <Table >
                                <TableBody sx={{ border: 'none' }}>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >
                                            {/* Title */}
                                            项目名称
                                        </TableCell>
                                        <TableCell align="left" >
                                            {project.title}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >
                                            {/* Project Serial No */}
                                            項目編號
                                        </TableCell>
                                        <TableCell align="left" >
                                            {project.project_serial_no}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >
                                            {/* Store */}
                                            店鋪
                                        </TableCell>
                                        <TableCell align="left" >
                                            <Link to={`/store-management/store-profile/${store.id}`}>
                                                <MDTypography component="a" href="#" variant="gradient" color="primary" fontWeight="medium">
                                                    {store.shop_name}
                                                </MDTypography>
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >
                                            {/* Created Date: */}
                                            建立日期：
                                        </TableCell>
                                        <TableCell align="left" >
                                            {formatDate(project.created_at)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >
                                            {/* Created By */}
                                            项目负责人
                                        </TableCell>
                                        <TableCell align="left" >
                                            {createdby.username}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell align="left" variant="head">
                                            {/* description: */}
                                            地位 
                                        </TableCell>
                                        <TableCell align="left" >
                                            {project.description}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head">
                                            {/* status: */}
                                            项目状态
                                        </TableCell>
                                        <TableCell align="left" >
                                            {statusTranslations[currentStatus]}
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell align="left" variant="head">
                                            {/* Description: */}
                                            結束日期
                                        </TableCell>
                                        <TableCell align="left" >
                                            {formatDate(project.end_date) == "1970-01-01" ? "---" : formatDate(project.end_date)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>



                        </MDBox>
                    </MDBox>
                </MDBox>
                <br />

                {userGroup != "WORKER" && (
                    <div>
                        <MDTypography variant="h5" fontWeight="medium">
                            {/* Project Tasks */}
                            项目任务
                        </MDTypography>
                        <ProjectTasks />
                    </div>
                )}



                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <MDBox
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50%',
                            backgroundColor: 'white',
                            border: '2px solid #000',
                            boxShadow: 24,
                            padding: 30,
                        }}
                    >
                        <MDTypography variant="h6" fontWeight="medium">
                            Project Users
                        </MDTypography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell  style={{ fontWeight: 'bold' }}>Username</TableCell>
                                    <TableCell  style={{ fontWeight: 'bold' }}>Group</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projectUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.groups ? user.groups.name : "None"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </MDBox>
                </Modal>
            </MDBox>




        </DashboardLayout>
    );
}

export default ProjectProfile;
