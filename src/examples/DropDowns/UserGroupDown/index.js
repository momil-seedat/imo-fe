import React from "react";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import axios from 'axios';
import MDTypography from "components/MDTypography";
import { useState, useEffect, useContext } from "react";
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

const UserGroupDropdown = ({group,onSelectChange }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const token = localStorage.getItem("token");
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

    const fetchGroups = async () => {
        try {
            // Make an API call to fetch users
            const response = await axios.get(apiBaseUrl+'/api/auth/group', {
                headers: {
                    Authorization: `Token ${token}`,  // Replace with your authentication token
                },
            });
            console.log(response)

            // Check the response and update the state with the fetched notifications
            if (response && response.status === 200) {
                setGroups(response.data);
                setSelectedGroup(group)
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
        fetchGroups();
    }, []);

    const handleDropdownChange = event => {
        const selectedValue = event.target.value;
        setSelectedGroup(selectedValue);
        onSelectChange(selectedValue); // Pass the selected value to the parent component
    };


    return (

        
             <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
             <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                {/* Assign Role */}
                分配角色
              </MDTypography>
              <MDBox mb={1} width="100%">

          

            <DropdownSelect
                native
                value={selectedGroup}
                onChange={handleDropdownChange}
         
            >  
              <option value="">選擇角色</option>
                {groups.map(group => (
                    <option value={group.id}>
                        {group.name}
                    </option>
                ))}
            </DropdownSelect>
            </MDBox>
</MDBox>
       
    );
};

export default UserGroupDropdown;
