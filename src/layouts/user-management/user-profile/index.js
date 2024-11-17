
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/store-management/Header";
import Projects from "layouts/user-management/user-profile/components/Projects";

import { Paper } from "@mui/material";
import styled from "@emotion/styled";

function UserProfile() {
  const ResponsivePaper = styled(Paper)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    boxShadow: "none",
    borderRadius: "12px",
    height: "100%",
  });
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox mb={2} sx={{ width: "100%" }} />
    <Header>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={4}>
          <ResponsivePaper>
            <ProfileInfoCard
              title="User Profile Information"
              info={{
                userName: "Elan MASK",
                mobile: "(44) 123 1234 123",
                email: "simpsomaz@gmail.com",
                location: "Chaoyang, Beijing",
                Created: "10-08-23 11:12:11 am",
                lastUpdated: "10-08-23 11:12:11 am",
                role: "DiyariDarMazdoor",
              }}
              action={{ route: "", tooltip: "Edit User Profile" }}
              shadow={false}
            />
          </ResponsivePaper>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
      </Grid>
    </Header>
  </DashboardLayout>
  );
}

export default UserProfile;
