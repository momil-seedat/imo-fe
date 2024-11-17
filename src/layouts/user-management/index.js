import { Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useState, useEffect} from "react";
import {TextField } from '@mui/material';
// Data
import authorsTableData from "layouts/user-management/data";

const UserManagement = () => {
  const { columns, rows ,filterUsers} = authorsTableData();
  const userGroup = localStorage.getItem("user_group");
  const [searchQuery, setSearchQuery] = useState('');


  const handleFilterChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  };
  const handleSearch = () => {

    filterUsers(searchQuery); // Pass filterValues to fetchTasks
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {userGroup === "ADMIN" && (
      <MDButton  component={Link} to="/user-profile" variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;新增用戶
          {/* add new user */}
        </MDButton>
      )}
      {/* <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox> */}
            <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          
          <Grid item xs={12}>
            <Card>
            <div style={{ margin: '10px' }} >
              <TextField
                type="text"
                value={searchQuery}
                onChange={handleFilterChange}
                placeholder="输入您的搜索"
                style={{ marginRight: '10px',width: "80%" }} 
              />
               <MDButton onClick={handleSearch} variant="gradient" color="dark">
                {/* Search */}
                搜索
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
          </Grid>
       
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default UserManagement;
