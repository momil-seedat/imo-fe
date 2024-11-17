import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const FeedbackModal = ({ open, handleClose, handleSubmit, isApprove,task }) => {
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const token = localStorage.getItem("token");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleCompletedChange = (event) => {
    setIsCompleted(event.target.checked);
  };

  const onSubmit = () => {
  
    
    handleSubmit1(feedback, isApprove ? "APPROVED" : "DECLINED",task);
    handleClose();
  };
  const handleSubmit1 = async (feedback,status,task) => {
    try {

      console.log(feedback);
      console.log(task);
      // Make an API call to submit the status and feedback
      await axios.put(apiBaseUrl + `/submission/` + task + '/', {
        status: status,
        feedback: feedback,
        task_status: isCompleted? "COMPLETED":""
      });

      // Handle success, e.g., close modal, show success message, etc.
     // setShowModal(false);
     // setButtonDisabled(false);
      window.location.reload();
      // Enable buttons after submitting feedback
      // alert('Status updated successfully!');
     alert('状态更新成功');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      // Show error message or handle it as needed
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isApprove ? 'Approve Task' : 'Disapprove Task'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="输入您的反馈"
          value={feedback}
          onChange={handleFeedbackChange}
          variant="outlined"
          margin="normal"
        />
        {isApprove && (
          <FormControlLabel
            control={
              <Checkbox
                checked={isCompleted}
                onChange={handleCompletedChange}
                color="primary"
              />
            }
            // Mark task as completed
            label="标注任务已完成"
          />
        )}
      </DialogContent>
      <DialogActions>
       
        <Button
          onClick={onSubmit}
          style={{ backgroundColor: isApprove ? 'green' : 'red', color: 'white' }}
        >
          {isApprove ? '批准' : '不赞成'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
