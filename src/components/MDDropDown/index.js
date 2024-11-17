import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, makeStyles } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

function CustomDropdown({ label, options, value, onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomDropdown;
