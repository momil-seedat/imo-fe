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
import { useNavigate, useParams } from "react-router-dom";

// Overview page components
import Header from "layouts/project-management/Header";

const UpdateProject = () => {
  const [sol, setSelectedStore] = useState("");
  const [project, setProject] = useState({});
  const [notification, setNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({ titleError: false, descriptionError: false });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  let { project_id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const url = `${apiBaseUrl}/api/projects/${project_id}`;
        const response = await axios.get(url, {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.status === 200) {
          const projectData = response.data;
          console.log(projectData)
          setProject(projectData);
          setSelectedStore(String(projectData.store.id));
        } else {
          console.error('Error:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProject();
  }, [project_id, apiBaseUrl, token]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const handleDropDownSelect = (selectedValue) => {
    setSelectedStore(selectedValue);
  };

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

    if (!sol) {
      setErrorMessage("Please select store..");
      return;
    }

    try {
      const projectData = {
        title: project.title,
        description: project.description,
        project_serial_no: project.project_serial_no,
        store: sol,
        created_by: userId,
        status: project.status
      };

      const response = await axios.put(`${apiBaseUrl}/api/projects/${project_id}/`, projectData, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response) {
        setSuccessMessage('您的專案已成功新增');
        setErrorMessage("");
        setNotification(true);
      } else {
        setErrorMessage('儲存項目時發生錯誤');
      }
    } catch (error) {
      setErrorMessage('儲存項目時發生錯誤');
    }

    setErrors({ titleError: false, descriptionError: false });
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
          onSubmit={submitHandler}
        >
          <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
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
          <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
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
          <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              输入项目序列号
            </MDTypography>
            <MDBox mb={2} width="50%">
              <MDInput
                type="text"
                fullWidth
                name="project_serial_no"
                value={project.project_serial_no}
                onChange={changeHandler}
              />
            </MDBox>
          </MDBox>
          <Dropdown store={sol} onSelectChange={handleDropDownSelect} />
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

export default UpdateProject;
