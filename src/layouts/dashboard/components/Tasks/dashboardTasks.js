
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Tasks from "layouts/dashboard/components/Tasks";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";



// Data

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const userGroup = localStorage.getItem("user_group");

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>

          <Grid item xs={12}>
            
            <Tasks/>
            
            </Grid>        
          </Grid>    
      </MDBox>    
    </DashboardLayout>
  );
}

export default Dashboard;
