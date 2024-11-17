import React, { useState,useEffect } from "react";

import MDTypography from "components/MDTypography";

import MDBox from "components/MDBox";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';


const CascadingDropdown = ({onSelectChange}) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [scities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const token = localStorage.getItem("token");


  const fetchCities = async () => {
    try {
      // Make an API call to fetch notifications
      const response = await axios.get(apiBaseUrl+'/cities/', {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setCities(response.data);
      } else {
        console.error('Error:', response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const fetchDistrict = async (city) => {
    try {
      // Make an API call to fetch notifications
      const response = await axios.get(apiBaseUrl+"/cities/"+city+'/districts', {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {
        setDistricts(response.data);
      } else {
        console.error('Error:', response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchCities();
  }, []); 

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
    fetchDistrict(selectedCity)
    console.log(selectedCity)

    // Reset the selected district when a new city is selected
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDistrict(selectedValue);
    console.log(selectedDistrict);
    onSelectChange(selectedValue);
  };


  const DropdownSelect = styled(Select)({
 
    width: "100%",
  });
  
  return (
    <>
    <MDBox
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    width="100%"
    mr={2}
  >
    <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
       {/* City */}
       城市
    </MDTypography>
    <DropdownSelect
      native
      value={selectedCity}
      onChange={handleCityChange}
      // Set the desired width here
    >
       <option value=""> 
       選擇城市
        {/* Select City */}
       </option>
        
      {scities.map((city) => (
        <option key={city} value={city.id}>
          {city.name}
        </option>
      ))}
    </DropdownSelect>
    </MDBox>
    {selectedCity !=="" && (
     
        <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
                
              >
        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          Select District
        </MDTypography>
        <DropdownSelect
          native
          value={selectedDistrict}
          onChange={handleDistrictChange}
           // Set the desired width here
        >
          
          {districts.map((district) => (
            <option key={district} value={district.id}>
              {district.dname}
            </option>
          ))}
        </DropdownSelect>
        </MDBox>
       
     
      
    )}
 
 </>
  );
};



export default CascadingDropdown;
