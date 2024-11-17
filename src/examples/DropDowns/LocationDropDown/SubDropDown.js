import React from "react";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MDTypography from "components/MDTypography";
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

const SubDropDown = ({ selectedValue, onChange, options }) => {
  return (
    
       
      <DropdownSelect
        native
        value={selectedValue}
        onChange={onChange}
      
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </DropdownSelect>
    
  );
};

export default SubDropDown;
