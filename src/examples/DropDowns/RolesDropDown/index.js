import React from "react";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import MDTypography from "components/MDTypography";
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
  width: "100%",
});

const Dropdown = ({ selectedValue, onChange }) => {
  return (

    <DropdownContainer>
       
          <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Select Roles
            </MDTypography>
         
      <DropdownSelect
        native
        value={selectedValue}
        onChange={onChange}
        inputProps={{
          name: "roles",
          id: "roles-select",
        }}
      >
        <option value="employee">Employee</option>
        <option value="project_manager">Project</option>
      </DropdownSelect>
      
    </DropdownContainer>
  );
};

export default Dropdown;
