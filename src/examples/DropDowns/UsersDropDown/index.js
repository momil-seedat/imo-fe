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
    width: "50%",
});

const Dropdown = ({user, onSelectChange }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUsers] = useState('');
    const token = localStorage.getItem("token");
    const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
    const fetchUsers = async () => {
        try {
            // Make an API call to fetch users
            const response = await axios.get(apiBaseUrl+'/users/', {
                headers: {
                    Authorization: `Token ${token}`,  // Replace with your authentication token
                },
            });
            console.log(response)

            // Check the response and update the state with the fetched notifications
            if (response && response.status === 200) {
                setUsers(response.data);
                setSelectedUsers(user);
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
        fetchUsers();
    }, []);
    useEffect(() => {
        // Fetch notifications when the component mounts
        setSelectedUsers(user);
    }, [user]);
    const handleDropdownChange = event => {
        const selectedValue = event.target.value;
        const selectedUser = users.find(user => user.id === parseInt(selectedValue));
        console.log(selectedUser)
        setSelectedUsers(selectedValue);
        onSelectChange(selectedValue,selectedUser); // Pass the selected value to the parent component
    };


    return (

        <DropdownContainer>

            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
            分配用戶
            </MDTypography>

            <DropdownSelect
                native
                value={selectedUser}
                onChange={handleDropdownChange}
                inputProps={{
                    name: "user",
                    id: "user-select",
                }}
            >  
              <option value="">選擇用戶</option>
                {users.map(user => (
                    <option value={user.id}>
                        {user.username}
                    </option>
                ))}
            </DropdownSelect>

        </DropdownContainer>
    );
};

export default Dropdown;
