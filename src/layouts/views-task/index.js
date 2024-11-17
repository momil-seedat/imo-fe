// TaskPopup.jsx

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton, Paper, Avatar, Grid } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../../index.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { useNavigate } from 'react-router-dom';
 

const TaskCard = ({ title, description }) => (
  <Card sx={{ minWidth: 200,height:80 }}>
    <CardContent>
      <div className='flex flex-row gap-2'>
    <Box
  sx={{
    width: 32,
    height: 32,
    bgcolor: "secondary.dark",
    borderRadius: 3, // Adjust the value for the desired roundness
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <AspectRatioIcon style={{ width: 22, height: 22, color: "white" }} />
</Box>


      <Typography variant="h5">{title}</Typography>
      </div>
      <Typography variant="h6" sx={{ textAlign: 'right' }}>{description}</Typography>
    </CardContent>
  </Card>
);
const TaskPopup = ({  }) => {
  const open=true
  const task = {
    id: 1,
    title: 'Task 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photos: ['https://picsum.photos/200', 'https://picsum.photos/200','https://picsum.photos/200','https://picsum.photos/200', 'https://picsum.photos/200','https://picsum.photos/200'],
  };
  const navigate=useNavigate()
  const handleClose = () => {
    // Implement your close logic here
    console.log('Popup closed');
    navigate('/task-management')

  };

  const handleApprove = () => {
    // Implement your approve logic here
    console.log('Task approved');
    navigate('/task-management')

  };

  const handleDisapprove = () => {
    // Implement your disapprove logic here
    console.log('Task disapproved');
    navigate('/task-management')

  };
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Modal open={open} onClose={handleClose} >
      <Paper className='container-snap'  sx={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)', width:'75%', p: 2,height:'85%' }}>
        <Paper className='container-snap'  sx={{ overflowY:'scroll', p: 4,height:'85%',mt:2}}>
        <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid  xs={12} sm={6} md={3} lg={3} >
        <div style={{ display: "flex", flexDirection: "row", bottom: 24, position: 'relative' }}>
        <Grid sx={{ml:2,mb:4}} className='top-4 relative'>

      <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
        <AssignmentIcon style={{ width: 32, height: 32, color: "white" }} />
      </Avatar>
      <Typography variant="h4" sx={{ }}>
            {/* Task title */}
            {task.title}
          </Typography>
          </Grid>
      <Paper
        className="flex flex-row gap-2"
        sx={{ flexDirection: "row", flexGrow: 1, p: 2, ml: 12, boxShadow: "none", border: "none" }}
        >
        <TaskCard title="Measurement" description="23" />
        <TaskCard title="Length" description="4449 " />
        {/* Add more TaskCard components as needed */}
      </Paper>
    </div>
    <Typography variant="h6" sx={{  }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            {/* Task description */}
            {task.description}
          </Typography>

          <Typography sx={{mb:4}}>
            
            Photos
            <hr className='w-full mb-4'></hr>

          </Typography>
        </Grid>
          {/* Render task photos */}
          <Grid container spacing={2} sx={{overflowY:'auto', height: 150}}>
      {task.photos.map((photo, index) => (
        <Grid item key={index} xs={12} sm={6} md={3} lg={3} >
          <Box sx={{ display: 'flex', mb: 2 }}>
            <img src={photo} alt={`Photo ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
          {/* Feedback input box */}
          <TextField label="Feedback" multiline fullWidth variant="outlined" sx={{ mb: 2,mt:4 }} />
          {/* Approve and Disapprove buttons */}
         
        </Box>
       
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between',mt:2 }}>
           
          <button
      onClick={handleDisapprove}
      className="bg-red-600 text-white hover:bg-red-400 hover:text-white px-4 py-3 rounded-xl text-sm"
    >
      Disapprove
    </button>
    <button
      onClick={handleApprove}
      className="bg-blue-600 text-white hover:bg-blue-400 hover:text-white px-4 py-3 rounded-xl text-sm"
    >
      Approve
    </button>
         </Box>
      </Paper>
    </Modal>
  );
};

export default TaskPopup;


