
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { TextField } from '@mui/material';
// Material Dashboard 2 React components
import { Link } from 'react-router-dom';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import { useState, useEffect } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/dashboard/components/Tasks/data/taskTableData";

function TaskProject() {
  const { columns, rows, fetchFilteredTasks } = authorsTableData();

  const userGroup = localStorage.getItem("user_group");

  const [filterValues, setFilterValues] = useState({
    task_serial_no: '',
    project_serial_no: '',
    start_date: '',
    end_date: '',
    status: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSearch = () => {
    console.log(filterValues)
    fetchFilteredTasks(filterValues); // Pass filterValues to fetchTasks
  };


  return (



    <Card>
      <div style={{ margin: '10px' }}>
        <TextField
          type="text"
          name="task_serial_no"
          value={filterValues.task_serial_no}
          onChange={handleFilterChange}
          placeholder="Task Serial No"
          style={{ marginRight: '10px' }}
        />

        <TextField
          type="text"
          name="project_serial_no"
          value={filterValues.project_serial_no}
          onChange={handleFilterChange}
          placeholder="Project Serial No"
          style={{ marginRight: '10px' }}
        />

        <TextField
          type="date"
          name="start_date"
          value={filterValues.start_date}
          onChange={handleFilterChange}
          placeholder="Start Date"
          style={{ marginRight: '10px' }}
        />
        <TextField
          type="date"
          name="end_date"
          value={filterValues.end_date}
          onChange={handleFilterChange}
          placeholder="End Date"
          style={{ marginRight: '10px' }}
        />
  
        <MDButton onClick={handleSearch} variant="gradient" color="dark">
          Search
        </MDButton>

      </div>
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>



  );
}

export default TaskProject;
