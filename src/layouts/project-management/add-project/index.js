import { useState, useEffect } from "react";

import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
import axios from 'axios';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Dropdown from "examples/DropDowns";
import { useUserContext } from 'context/UserContext';
import { useNavigate } from "react-router-dom";


// Overview page components
import Header from "layouts/project-management/Header";



const AddProject = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const [isFormReset, setIsFormReset] = useState(true);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const handleDropDownSelect = selectedValue => {
    setSelectedStore(selectedValue);
  };


  const [errors, setErrors] = useState({
    titleError: false,
    descriptionError: false,

  });

  const resetForm = () => {
    setSelectedStore("");
    setProject({
      title: "",
      description: "",
    });
    setErrors({
      titleError: false,
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!project.title.trim()) {
      setErrors({ titleError: true });
      return;
    }

    if (!selectedStore) {
      setErrorMessage("Please select store..");
      return
    }

    try {

      const projectData = {
        title: project.title,
        description: project.description,
        project_serial_no : project.serial,
        store: selectedStore,
        created_by: userId,
        status:"BACKLOG"
      };

      console.log(projectData);

      const response = await axios.post(apiBaseUrl+'/api/projects/', projectData, {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // call api for update

      console.log('Project submitted successfully:', response.data);

      if (response) {
        setSuccessMessage('您的專案已成功新增');
        // Your project has been successfully added
        resetForm();
        setErrorMessage("");
 
        // Reset form values upon successful submission
      } else {
        // An error occurred while saving the project
        setErrorMessage('儲存項目時發生錯誤'); // Display error message if response status is not 200
      }

    } catch (error) {
      setErrorMessage('儲存項目時發生錯誤');
      // Handle error submitting project
    }
    // reset errors
    setErrors({
      titleError: false,
      descriptionError: false,

    });

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={project.title}>
        {notification && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
            您的專案已成功新增
            </MDTypography>
          </MDAlert>
        )}

        {notification && errorMessage && (
          <MDAlert color="error" mt="20px">
            <MDTypography variant="body2" color="white">
              {errorMessage}
            </MDTypography>
          </MDAlert>
        )}

        <MDBox height="100%" mt={1.5} mb={2} lineHeight={1.5}>
          <MDTypography variant="h4" fontWeight="medium">
          建立新項目
          </MDTypography>
        </MDBox>

        <MDBox
          component="form"
          role="form"
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
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
            项目标题
            </MDTypography>
            <MDBox mb={2} width="50%">
              <MDInput
                type="title"
                fullWidth
                name="title"
                value={project.title}
                onChange={changeHandler}
                error={errors.titleError}
              />
              {errors.titleError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  标题不能为空
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
                value={project.description}
                onChange={changeHandler}

              />

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
            输入项目序列号
            </MDTypography>
            <MDBox mb={2} width="50%">
              <MDInput
                type="text"
                fullWidth
                name="serial"
                value={project.serial}
                onChange={changeHandler}

              />

            </MDBox>
          </MDBox>

          <Dropdown onSelectChange={handleDropDownSelect} ></Dropdown>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <MDButton variant="gradient" color="info" type="submit" onClick={submitHandler}>
            保存更改
            </MDButton>
          </div>
        </MDBox>

      </Header>

    </DashboardLayout>
  );
};

export default AddProject;
