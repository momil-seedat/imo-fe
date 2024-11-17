import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Card, CardContent, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Header from 'layouts/store-management/Header';
import { useParams } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import MDButton from "components/MDButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeedbackModal from "layouts/task-submission/view-submission/FeedbackModal"
import axios from 'axios';
import { useEffect } from "react";

const ImageModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [promptSave, setPromptSave] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem("token");
  const [isApprove, setIsApprove] = useState(false);
  const [taskSubmission, setTaskSubmission] = useState("");
  const userId = localStorage.getItem("user");
  let { task_id } = useParams();
  const userGroup = localStorage.getItem("user_group");
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;

  const handleUpload = async (file) => {

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(apiBaseUrl + '/api/submission/', formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      setNewImage(response.data.image_name)
      setPromptSave(true);
      console.log(response)

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async () => {
    try {
      let submitTask = {

        "task_submission_id": submissions[selectedSubmissionIndex].id,
        "updated_image": newImage,
        "image_name": submissions[selectedSubmissionIndex].task_submissions[selectedImageIndex].image,

      };
      console.log(submitTask);

      const response = await axios.patch(apiBaseUrl + '/submission/update/', submitTask, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,  // Replace with your authentication token
        },
      });


      setPromptSave(true);
      console.log(response)

    } catch (error) {
      console.error('Error uploading image:', error);
    }
    // Update the state or call an API to save the updated task submission
    // For now, we just log it

    setPromptSave(false);

    setOpen(false);
  }
  const handleApprove = (submissionIndex) => {
    setIsApprove(true)
    setShowModal(true);
    setButtonDisabled(true); // Disable buttons after clicking Approve or Decline
    setSelectedSubmission(submissionIndex);
    setTaskSubmission(submissions[submissionIndex].id)

  };
  const close = () => {
    setShowModal(false);
    setButtonDisabled(false); // Disable buttons after clicking Approve or Decline
    setSelectedSubmission(null);
    setPromptSave(false);
    setNewImage(null);


  };
  const handleDisapprove = (submissionIndex) => {
    setShowModal(true);
    setIsApprove(false)
    // Disable buttons after clicking Approve or Decline
    setSelectedSubmission(submissionIndex);
    setTaskSubmission(submissions[submissionIndex].id)

  };
  const handleSubmit = async (feedback, status) => {
    try {
      console.log(submissions[selectedSubmission]);
      console.log(feedback);
      // Make an API call to submit the status and feedback
      await axios.put(apiBaseUrl + `/submission/` + submissions[selectedSubmission].id + '/', {
        status: status,
        feedback: feedback,
      });

      // Handle success, e.g., close modal, show success message, etc.
      setShowModal(false);
      setButtonDisabled(false);
      window.location.reload();
      // Enable buttons after submitting feedback
      alert('Status updated successfully!');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    
      // Show error message or handle it as needed
    }
  };

  const fetchTasks = async () => {

    try {

      const url = apiBaseUrl + `/api/tasks/${task_id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {

        setTaskStatus(response.data.status);
        if(taskStatus == "COMPLETED"){
          setButtonDisabled(true);
        }
      } else {
        console.error('Error:', response.data);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  const fetchSubmissions = async () => {

    try {

      const response = await axios.get(apiBaseUrl + `/task_submissions/${task_id}`, {
        headers: {
          Authorization: `Token ${token}`,  // Replace with your authentication token
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {

        setSubmissions(response.data)
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
    fetchTasks();
    fetchSubmissions();
  }, []);


  const handleOpen = (submissionIndex, imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setSelectedSubmissionIndex(submissionIndex);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImageIndex(null);
    setSelectedSubmissionIndex(null);
    setPromptSave(false);
    setNewImage(null);
  };

  const handleDownload = (imageUrl) => {
    // Implement download logic here
    window.open(imageUrl, '_blank');
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % submissions[selectedSubmissionIndex].task_submissions.length);
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + submissions[selectedSubmissionIndex].task_submissions.length - 1) % submissions[selectedSubmissionIndex].task_submissions.length);
  };

  const isButtonDisabled = (status, buttonDisabled, taskStatus) => {
    return status === 'APPROVED' || buttonDisabled || taskStatus === 'COMPLETED';
  };
  const formatUpdatedTime = (updatedTime) => {
    const updatedDate = new Date(updatedTime);
    const now = new Date();
    const timeDiffInSeconds = Math.floor((now - updatedDate) / 1000);
    const hoursDiff = Math.floor(timeDiffInSeconds / 3600);
    const minutesDiff = Math.floor((timeDiffInSeconds % 3600) / 60);
    const secondsDiff = timeDiffInSeconds % 60;

    if (hoursDiff < 12) {
      if (hoursDiff > 0) {
        return `${hoursDiff} hours ago`;
      } else if (minutesDiff > 0) {
        return `${minutesDiff} minutes ago`;
      } else {
        return `${secondsDiff} seconds ago`;
      }
    } else {
      return `${String(updatedDate.getDate()).padStart(2, '0')}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${updatedDate.getFullYear()} ${String(updatedDate.getHours()).padStart(2, '0')}:${String(updatedDate.getMinutes()).padStart(2, '0')}`;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} sx={{ width: '100%' }} />
      <Header>
        <div>

       
      {taskStatus =="COMPLETED" && (
        <div style={{ backgroundColor: 'green', height: '50px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <CheckCircleIcon style={{ marginRight: '10px' }} />
          <MDTypography variant="h6" color="inherit">
            {/* Task Completed */} 任务已完成
          </MDTypography>
        </div>
      )}
      
          <div>
            {submissions.length === 0 && (
              <MDBox mb={6} ml={2} sx={{ width: '100%' }} >
                <MDTypography variant="h3" color="dark" fontWeight="large">
                  沒有提交 !
                  {/* Not submitted! */}
                </MDTypography>
              </MDBox>
            )}
            {submissions.map((submission, submissionIndex) => (
              <div key={submissionIndex}>
                <Card style={{ marginBottom: '30px', position: 'relative' }}>
                  <CardContent>
                    <Grid item xs={12}>
                      <div className='m-4'>
                        <MDTypography variant="h6" gutterBottom style={{ marginBottom: '40px' }}>
                          任務提交: {submissionIndex + 1}
                          {/* Task Submission */}
                        </MDTypography>
                        <MDBox style={{ display: 'flex', justifyContent: 'right' }}>
                          <MDTypography variant="caption" color="text" fontWeight="regular">
                            {/* Last updated at: */}
                            最後更新時間 : {formatUpdatedTime(submission.updated_at)}
                          </MDTypography>
                        </MDBox>
                        <MDTypography component="a" href="#" variant="h6" color="info" fontWeight="medium" style={{ marginTop: '20px', display: 'block' }}>
                          {/* Feedback */}
                          反馈
                        </MDTypography>
                        <MDTypography variant="h6" fontWeight="light" gutterBottom style={{ marginBottom: '40px' }}>
                          {submission.submission_feedback}
                        </MDTypography>
                        {submission.status === 'APPROVED' && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '25px',
                              right: '30px',
                              padding: '5px',
                              borderRadius: '8px',
                              fontWeight: 'bold',
                              color: 'green',
                              fontSize: '14px',
                            }}
                          >
                            ✓ 提交已批准
                          </div>
                        )}
                        {submission.status === 'DECLINED' && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '25px',
                              right: '30px',
                              padding: '5px',
                              borderRadius: '8px',
                              fontWeight: 'bold',
                              color: 'red',
                              fontSize: '14px',
                            }}
                          >
                            X 拒絕 !
                            {/* reject ! */}
                          </div>
                        )}
                        {submission.status === 'UPDATED_SUBMISSION' && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '25px',
                              right: '30px',
                              padding: '5px',
                              borderRadius: '8px',
                              fontWeight: 'bold',
                              color: '#70c1ff',
                              fontSize: '14px',
                            }}
                          >
                            提交图片更新成功。
                            {/* Submitted image update successfully. */}
                          </div>
                        )}
                        <div className='flex flex-row flex-wrap'>
                          {submission.task_submissions.map((taskSubmission, taskIndex) => (
                            <div key={taskIndex} className='m-2'>
                              <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img
                                  src={apiBaseUrl + `/images/${taskSubmission.image}`}
                                  alt={`Image ${taskIndex}`}
                                  onClick={() => handleOpen(submissionIndex, taskIndex)}
                                  style={{ width: '100%', height: 'auto', maxHeight: '15vh' }}
                                />
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '5%',
                                    left: '5%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                  }}
                                >
                                  {taskIndex + 1}
                                </div>
                              </div>
                              <p>{taskSubmission.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Grid>
                  </CardContent>
                  <div style={{ margin: '30px' }}>
                    {userGroup !== "WORKER" && (
                      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>

                        <MDButton variant="gradient" color="success" type="submit" disabled={isButtonDisabled(submission.status, buttonDisabled, taskStatus)}
                          onClick={() => handleApprove(submissionIndex)}>
                          核准
                        </MDButton>
                        <MDButton variant="gradient" color="error" type="submit" disabled={isButtonDisabled(submission.status, buttonDisabled, taskStatus)}
                          onClick={() => handleDisapprove(submissionIndex)}>
                          拒绝
                        </MDButton>
                      </div>
                    )}
                    <div>

                    </div>
                  </div>
                </Card>

              </div>
            ))}


          </div>




        </div>

        {/* <Modal open="false" >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 50,
            outline: 'none',
            borderRadius: 38,
            display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',

          }}>
            <textarea style={{
              width: '100%', // Adjust width as needed
              height: '100px', // Adjust height as needed
              marginBottom: '20px', // Add margin as needed
              resize: 'none', // Prevent textarea resizing
              padding: '10px', // Add padding as needed

            }}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="給予回饋 ..."
            />
            <MDButton type="submit" onClick={() => handleSubmit('APPROVED')}>核准</MDButton>
            <MDButton type="submit" onClick={() => handleSubmit('DECLINED')}>拒绝</MDButton>
            <MDButton onClick={() => close()}>取消</MDButton>
          </div>
        </Modal> */}


        <Modal open={open} onClose={handleClose}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 20,
              outline: 'none',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedImageIndex !== null && (
              <>
                <div style={{ position: 'relative' }}>
                  <img
                    src={apiBaseUrl + `/images/${submissions[selectedSubmissionIndex].task_submissions[selectedImageIndex].image}`}
                    alt={`Selected Image`}
                    style={{ maxWidth: '80vw', maxHeight: '80vh', objectFit: 'contain' }}
                  />

                  <MDButton variant="gradient" color="primary" type="submit" onClick={() => handleDownload(apiBaseUrl + '/images/' + submissions[selectedSubmissionIndex].task_submissions[selectedImageIndex].image)}
                    style={{ position: 'absolute', top: 10, right: 10 }}>
                    下載
                  </MDButton>
                </div>
                <p>{submissions[selectedSubmissionIndex].task_submissions[selectedImageIndex].comment}</p>
                {(submissions[selectedSubmissionIndex].status !== "APPROVED") && (
                  <div style={{ margin: '10px 0' }}>

                    <div style={{ position: 'relative', display: 'inline-block', padding: '6px 12px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>
                      <p style={{ margin: 0, color: "red" }}>改变图片</p> 
                      {/* change picture */}
                      <input
                        name="Edit picture"
                        type="file"
                        id="file-input"
                        onChange={(e) => handleUpload(e.target.files[0])}

                      />

                    </div>
                    {promptSave && (
                      <div style={{ margin: '10px 0', color: 'red' }}>
                        {/* Please save the changes. */}
                        请保存更改
                        <MDButton
                          variant="contained"
                          color="secondary"
                          onClick={handleSave}
                          style={{ marginLeft: '10px' }}
                        >
                          保存更新
                        </MDButton>
                      </div>
                    )}
                  </div>)}
                <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', margin: 10 }}>

                  <MDButton variant="gradient" color="light" type="submit" onClick={handlePrevious} disabled={submissions[selectedSubmissionIndex].task_submissions.length <= 1}>
                    上一页
                  </MDButton>
                  <MDButton variant="gradient" color="info" type="submit" onClick={handleNext} disabled={submissions[selectedSubmissionIndex].task_submissions.length <= 1}>
                    下一页
                  </MDButton>


                </div>
              </>
            )}
          </div>


        </Modal>
        <FeedbackModal
          open={showModal}
          handleClose={close}
          handleSubmit={handleSubmit}
          isApprove={isApprove}
          task={taskSubmission}
        />

      </Header>
    </DashboardLayout>
  );
};

export default ImageModal;
