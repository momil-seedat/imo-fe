import React from "react";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useState, useEffect } from "react";
import axios from 'axios';
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
  width: "30%",
});

const Dropdown = ({ store, onSelectChange }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(store);
  const token = localStorage.getItem("token");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/store/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        setStores(response.data);
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []); 

  useEffect(() => {
    setSelectedStore(store);
  }, [store]);

  const handleDropdownChange = event => {
    const selectedValue = event.target.value;
    setSelectedStore(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
   
<DropdownContainer>
          <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          店鋪
            </MDTypography>
      <DropdownSelect
        native
        value={selectedStore}
        onChange={handleDropdownChange}
        inputProps={{
          name: "store",
          id: "store-select",
        }}
      >
        <option value="">選擇商店</option>
         {stores.map(store => (
          <option value={store.id}>
            {store.shop_name}
          </option>
        ))}
      </DropdownSelect>
    </DropdownContainer>
  );
};

export default Dropdown;
