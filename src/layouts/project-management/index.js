
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import { Link } from 'react-router-dom';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useState, useEffect } from "react";
import { TextField ,Collapse, IconButton} from '@mui/material';
import { FilterList } from '@mui/icons-material';

// Data
import authorsTableData from "layouts/project-management/data/projectTableData";

function Projects() {
  const { columns, rows, fetchProjects } = authorsTableData();
  const userGroup = localStorage.getItem("user_group");
  const [expanded, setExpanded] = useState(false);
  const [filterValues, setFilterValues] = useState({
    project_serial_no: '',
    start_date: '',
    end_date: '',
    status:'',
    query :'',
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
    fetchProjects(filterValues); // Pass filterValues to fetchTasks
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div>
        {userGroup != "WORKER" && userGroup != "CLIENT" && (
          <MDButton component={Link} to="/project-management/add-project" variant="gradient" color="dark">
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            &nbsp;建立新項目
          </MDButton>
        )}
      </div>

      {/* <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>

          <Grid item xs={12}>
            <Card> */}


            <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox m={2}>
                {/* Main Search Bar */}
                <MDBox display="flex" alignItems="center">
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
                </MDBox>

                {/* Expandable Filter Section */}
                <MDBox mt={2}>
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
                  
                  <option value="BACKLOG">未开始 </option>
                  <option value="IN-PROGRESS">处理中</option>
                  <option value="COMPLETED">完全的</option>
                  <option value="ON-HOLD">暂停</option>
                  <option value="DISCARD">已取消</option>
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
                </MDBox>

                {/* DataTable */}
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>

              {/* <div style={{ margin: '10px' }}>


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


                <select
                  name="status"
                  value={filterValues.status}
                  onChange={handleFilterChange}
                  style={{
                    marginRight: '10px',
                    padding: '10px',
                    fontSize: '0.875rem',
                    border: '0.2px solid light-gray' // Gray border
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="BACKLOG">BACKLOG</option>
                  <option value="IN-PROGRESS">IN-PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ON-HOLD">ON-HOLD</option>
                  <option value="DISCARD">DISCARD</option>
                </select>


                <MDButton onClick={handleSearch} variant="gradient" color="dark">
                  {/* Search */}
                
                {/* </MDButton>

              </div>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>  */}
            </Card>
          </Grid>

        </Grid>
        </MDBox>
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default Projects;
