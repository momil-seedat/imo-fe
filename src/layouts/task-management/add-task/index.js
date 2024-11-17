import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProjectDropDown from "examples/DropDowns/ProjectDropDown";
import { useUserContext } from 'context/UserContext';

import UsersDropDown from "examples/DropDowns/UsersDropDown";
// Overview page components
import Header from "layouts/project-management/Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const AddTask = () => {

  const [notification, setNotification] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUsers] = useState('');
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user")
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const { user, setUser } = useUserContext();
  const [task, setTask] = useState({
    name: "",
    project: "",
    description: "",



  });

  const handleDropDownSelect = selectedValue => {
    setSelectedProject(selectedValue);
  };

  const handleUserDropDownSelect = selectedValue => {
    setSelectedUsers(selectedValue);
  };

  const [errors, setErrors] = useState({
    nameError: false,



  });


  const resetForm = () => {
    // setSelectedStore("");
    // setProject({
    //   name: "",
    //   description: "",
    // });
    setErrors({
      nameError: false,
    });
    setSuccessMessage('');
    setErrorMessage('');
  };


  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
        navigate('/task-management')

      }, 5000);

    }
  }, [notification]);
  const changeHandler = (e) => {
    setTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (task.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (!selectedUser) {
      setErrorMessage('请选择一个用户。'); // Set error if user hasn't been selected "Please select a user"
      return;
    }
    else if (!selectedProject) {
      setErrorMessage('请选择一个项目'); // Set error if user hasn't been selected "please select project"
      return;
    }

    try {

      let taskData = {

        name: task.name,

        project: selectedProject,
        description: task.description,
        task_assigned_to: selectedUser,
        assignee: userId,

      };
      console.log(taskData);

      const response = await axios.post(apiBaseUrl+'/api/tasks/', taskData, {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // call api for update

      console.log('Task submitted successfully:', response.data);

      if (response && response.status === 201) {
        setSuccessMessage('任务添加成功');
        setErrorMessage('');
     // Reset form values upon successful submission
      } else {
        setErrorMessage('保存任务时发生错误');
      setSuccessMessage('');
      // Display error message if response status is not 200
      }

    } catch (error) {
      setErrorMessage('保存任务时发生错误');
      setSuccessMessage('');
      // Handle error submitting project
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
      <MDBox mb={2} />
      <Header name={task.name}>
        {notification && successMessage && (
          <MDAlert color="success" mt="20px">
            <MDTypography variant="body2" color="white">
              {/* Woho! Your Task has been added Successfully */}
              你的任务已添加成功
            </MDTypography>
          </MDAlert>
        )}
        {errorMessage && (
          <MDAlert color="error" mt="20px">
            <MDTypography variant="body2" color="white">
              {errorMessage}
            </MDTypography>
          </MDAlert>
        )}
        <MDBox height="100%" mt={1.5} lineHeight={1.5}>
          <MDTypography variant="h4" fontWeight="medium">
          添加新任务
          </MDTypography>
        </MDBox>

        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >

          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            mr={2}
          >
            <MDTypography variant="body2" color="text" ml={1} mt={2} fontWeight="regular">
            任务名称
            </MDTypography>
            <MDBox mb={2} width="50%">
              <MDInput
                type="name"
                fullWidth
                name="name"
                value={task.name}
                onChange={changeHandler}
                error={errors.nameError}
              />
              {errors.nameError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                 任务名称不能为空
                </MDTypography>
              )}
            </MDBox>

          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            mr={2}
          >
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
            输入描述
            </MDTypography>
            <MDBox mb={2} width="50%">
              <MDInput
                type="text"
                fullWidth
                name="description"
                value={task.description}
                onChange={changeHandler}

              />

            </MDBox>
          </MDBox>



          <ProjectDropDown onSelectChange={handleDropDownSelect} ></ProjectDropDown>
          <br />

          <UsersDropDown onSelectChange={handleUserDropDownSelect}></UsersDropDown>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
            <MDTypography variant="body2" color="text" ml={2} fontWeight="regular">

            </MDTypography>

          </div>



          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <MDButton variant="gradient" color="info" type="submit">
            保存更改
            </MDButton>
          </div>
        </MDBox>

      </Header>

    </DashboardLayout>
  );
};

export default AddTask;
