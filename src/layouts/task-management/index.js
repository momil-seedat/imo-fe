
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { TextField, Collapse, IconButton, Box } from '@mui/material';
// Material Dashboard 2 React components
import { Link } from 'react-router-dom';
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { ExpandMore, Search, FilterList } from '@mui/icons-material';

import { useState, useEffect } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/task-management/data/taskTableData";

function TaskProject() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { columns, rows, fetchFilteredTasks } = authorsTableData();

  const userGroup = localStorage.getItem("user_group");

  const [filterValues, setFilterValues] = useState({
    task_serial_no: '',
    project_serial_no: '',
    start_date: '',
    end_date: '',
    status: '',
    query: '',
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

    <DashboardLayout>

      <DashboardNavbar />

      <div>
        {userGroup != "WORKER" && (
          <MDButton component={Link} to="/task-management/add-task" variant="gradient" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;添加新任务
          </MDButton>
        )}
      </div>
      <Box pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box m={2}>
                {/* Main Search Bar */}
                <Box display="flex" alignItems="center">
                  <TextField
                    type="text"
                    name="query"
                    onChange={handleFilterChange}
                    placeholder="按项目名称或任务名称搜索"
                    // search by project name or task name
                    style={{ marginRight: '10px', flexGrow: 1 }}
                  />
                  <MDButton onClick={handleSearch} variant="gradient" color="dark">
                    {/* Search */}
                    搜索
                  </MDButton>
                </Box>

                {/* Expandable Filter Section */}
                <Box mt={2}>
                  <IconButton onClick={handleExpandClick} style={{ padding: 0 }}>
                    <FilterList />
                    <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                      {/* Filters */} 过滤器
                    </MDTypography>
                  </IconButton>

                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container spacing={2} style={{ marginTop: '10px', alignItems: 'center' }}>
                      <Grid item xs={12} md={3}>
                        <TextField
                          type="text"
                          name="task_serial_no"
                          value={filterValues.task_serial_no}
                          onChange={handleFilterChange}
                          placeholder="任务序列号"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          type="text"
                          name="project_serial_no"
                          value={filterValues.project_serial_no}
                          onChange={handleFilterChange}
                          placeholder="项目序列号"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="small" style={{ marginRight: '8px' }}>
                          {/* from: */}
                          从 :
                        </MDTypography>
                        <TextField
                          type="date"
                          name="start_date"
                          value={filterValues.start_date}
                          onChange={handleFilterChange}
                          placeholder="Start Date"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center' }}>
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="small" style={{ marginRight: '8px' }}>
                        到 :
                        {/* to */}
                        </MDTypography>
                        <TextField
                          type="date"
                          name="end_date"
                          value={filterValues.end_date}
                          onChange={handleFilterChange}
                          placeholder="结束日期"
                          fullWidth
                        />
                      </Grid>                    <Grid item xs={12} md={3}>
                        <select
                          name="status"
                          value={filterValues.status}
                          onChange={handleFilterChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '0.875rem',
                            border: '1px solid light-gray',
                            borderRadius: '4px'
                          }}
                        >
                          {/* Select status */}
                          <option value="">选择 状态</option>
                          <option value="BACKLOG">BACKLOG</option>
                          <option value="IN_PROGRESS">IN-PROGRESS</option>
                          <option value="SUBMITTED">SUBMITTED</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="DISCARD">DISCARD</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <MDButton onClick={handleSearch} variant="gradient" color="dark" fullWidth>
                          {/* Apply Filter */}
                          应用过滤器
                        </MDButton>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>

                {/* DataTable */}
                <Box pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

    </DashboardLayout>
  );
}

export default TaskProject;
