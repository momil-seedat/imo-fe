import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Alert,
    Grid,
    TextField,
    Autocomplete
} from '@mui/material'; // Import Material-UI components
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProjectDropDown from 'examples/DropDowns/ProjectDropDown';
import UsersDropDown from 'examples/DropDowns/UsersDropDown';
import Header from "layouts/store-management/Header";
import Chip from '@mui/material/Chip';
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
const AssignPermission = () => {

    const [notification, setNotification] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Assuming you have a list of all users
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem("token");
     const userId = localStorage.getItem("user");
    const [selectedUser, setSelectedUsers] = useState('');
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

    // Function to handle project selection
    const handleProjectSelect = (selectedProject) => {
        setSelectedProject(selectedProject);
        // Fetch users assigned to the selected project
        fetchAssignedUsers(selectedProject);
    };

    const handleUserDelete = (userToDelete) => {

        setAssignedUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userToDelete.id)
        );
        console.log(assignedUsers)
    };
    // Function to fetch assigned users for a project
    const fetchAssignedUsers = async (projectId) => {
        try {

            const response = await axios.get(`http://localhost:8000/users/by-project/${projectId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            if (!response) {
                throw new Error('Failed to fetch assigned users');
            }

            setAssignedUsers(response.data);
        } catch (error) {
            console.error('Error fetching assigned users:', error.message);
            setErrorMessage('Failed to fetch assigned users');
        }
    };

    // Function to handle user selection from search results
    const handleUserSelect = (selectedUser) => {
        setAssignedUsers([...assignedUsers, selectedUser]);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to submit form data (e.g., save changes)
    };


    const handleDropDownSelect = selectedValue => {
        setErrorMessage("");
        setSelectedProject(selectedValue);
    };

    const handleUserDropDownSelect = (selectedValue, selectedUser) => {
        setErrorMessage("");
        console.log(selectedValue)
        console.log(selectedUser)
        setAssignedUsers([...assignedUsers, selectedUser]);
        setSelectedUsers(selectedValue);
    };

    const [errors, setErrors] = useState({
        nameError: false,



    });


    const resetForm = () => {
        setAssignedUsers([]);
       
    
    };


    useEffect(() => {
        if (notification === true) {
            setTimeout(() => {
                setNotification(false);
                // navigate('/task-management')

            }, 5000);

        }
    }, [notification]);


    const submitHandler = async (e) => {
        console.log("hi");
        console.log(selectedProject);
        console.log(selectedUser);

        console.log(assignedUsers)
        setErrorMessage("");
       let assignData = {
                    project_id: selectedProject,
                    users: assignedUsers,
                    assignee_id: userId,

                };
                console.log(assignData);

       
        if (!selectedProject) {
            setErrorMessage('Please select a project.'); // Set error if user hasn't been selected
        }

 

        else {
            try {

               
                const response = await axios.post(apiBaseUrl + '/assign_permission/', assignData, {
                    headers: {
                        Authorization: `Token ${token}`,  // Replace with your authentication token
                    },
                });
                // call api for update

                console.log('Task submitted successfully:', response.data);

                if (response && response.status === 201) {
                    setSuccessMessage('權限分配成功'); // Permissions assigned successfully
                    resetForm(); // Reset form values upon successful submission
                } else {
                    setErrorMessage('分配權限失敗'); // Failed to assign permission . Display error
                }

            } catch (error) {
                setErrorMessage('分配權限失敗');
                // Handle error submitting project
            }

        }
        // call api for update
        // const response = await AuthService.updateProfile(JSON.stringify(projectData));

        // reset errors
        setErrors({
            nameError: false,

        });

        setNotification(true);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box mb={2} />
            <Header name="permission">
                {notification && successMessage && (
                    <Alert color="success" mt="20px">
                        <Typography variant="body2" color="white">
                            哇哦！您的權限已新增成功
                        </Typography>
                    </Alert>
                )}
                {errorMessage && (
                    <Alert color="error" mt="20px">
                        <Typography variant="body2" color="red">
                            {errorMessage}
                        </Typography>
                    </Alert>
                )}

                <Box height="100%" mt={1.5} mb={2} lineHeight={1.5}>
                    <Typography variant="h4" fontWeight="medium">
                       {/* assign permissions */}
                        指定权限
                    </Typography>
                </Box>

              
                <MDBox
                    component="form"
                    role="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                >
                    <ProjectDropDown onSelectChange={handleProjectSelect} />
                    <br />

                    <Box mt={2} mb={2}>
                        <Autocomplete
                            multiple
                            id="users-dropdown"
                            options={assignedUsers}
                            getOptionLabel={(option) => option.username}
                            onChange={(event, newValue) => {
                                setAssignedUsers(newValue);
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        key={index}
                                        label={option.username}
                                        onDelete={() => handleUserDelete(option)}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => <TextField {...params} label="选择用户" variant="outlined" />}
                            value={assignedUsers}
                        />
                    </Box>
                   
                    <UsersDropDown onSelectChange={handleUserDropDownSelect}></UsersDropDown>
                   
                    {/* Assume you've implemented handleUserSelect in UsersDropDown */}

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <MDButton variant="gradient" color="info" type="submit" onClick={submitHandler}>
                            保存更改
                        </MDButton>
                    </div>
                </MDBox>
            </Header>
        </DashboardLayout>);
};
export default AssignPermission;
