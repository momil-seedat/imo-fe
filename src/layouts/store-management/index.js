

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

// Data
import authorsTableData from "layouts/store-management/data/authorsTableData";
import React, { useState } from 'react';
import {TextField } from '@mui/material';
function Tables() {
  const { columns, rows,filterStores } = authorsTableData();
  const [searchQuery, setSearchQuery] = useState('');


  const handleFilterChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
  };
  const handleSearch = () => {

    filterStores(searchQuery); // Pass filterValues to fetchTasks
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDButton component={Link} to="/store-management/add-store" variant="gradient" color="dark">
        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        &nbsp;新增商店
        {/* add new store */}
      </MDButton>

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
}

export default Tables;
