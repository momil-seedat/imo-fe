import React from "react";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from 'axios';
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
const DropdownContainer = styled(FormControl)({
  marginBottom: (theme) => theme.spacing(1),
});

const DropdownLabel = styled(InputLabel)({
  fontSize: "16px",
  marginBottom: (theme) => theme.spacing(1),
  color: "#333",
});

const DropdownSelect = styled(Select)({
  width: "50%",
});

const Dropdown = ({ projectId, onSelectChange }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const token = localStorage.getItem("token");
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
        setSelectedProject(projectId);
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
  useEffect(() => {
    setSelectedProject(projectId);
  }, [projectId]);
  const handleDropdownChange = event => {
    const selectedValue = event.target.value;
    setSelectedProject(selectedValue);
    onSelectChange(selectedValue); // Pass the selected value to the parent component
  };


  return (

    <DropdownContainer>
       
          <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          项目
            </MDTypography>
         
            <DropdownSelect
        native
        value={selectedProject}
        onChange={handleDropdownChange}
        inputProps={{
          name: "project",
          id: "project-select",
        }}
      >
         <option value="">選擇項目</option>
         {projects.map(project => (
          <option value={project.id}>
            {project.title}
          </option>
        ))}
      </DropdownSelect>
      
    </DropdownContainer>
  );
};

export default Dropdown;
