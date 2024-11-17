import React, { useState,useEffect } from 'react';
import { Card, CardContent, Grid, Typography, TextField, IconButton } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Header from 'layouts/user-profile/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const SubmissionForm = () => {
  const [submission, setSubmission] = useState({ images: [] });
  const [submissionSaved, setSubmissionSaved] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const Token = localStorage.getItem('token');
  const userId = localStorage.getItem("user")
  let { task_id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_STORE_BASE_URL;
  const handleRemoveImage = async (imageName, imageIndex) => {
    try {
      // Make a DELETE request to your API endpoint to remove the image by name
      await axios.delete(apiBaseUrl+`/delete_image/${imageName}`, {
        headers: {
          Authorization: `Token ${Token}`,
        },
      });

      // Remove the image from the state upon successful deletion from the API
      const updatedImages = [...submission.images];
      updatedImages.splice(imageIndex, 1);
      setSubmission({ ...submission, images: updatedImages });

      console.log(`Image '${imageName}' removed successfully.`);
    } catch (error) {
      console.error('Error removing image:', error);
      // Handle errors (display error message, etc.)
    }
  };

  const handleImageChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(apiBaseUrl+'/api/submission/', formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      const newImageObject = { image: response.data.image_name, comment: '' };
      console.log(newImageObject)
      setSubmission({ ...submission, images: [...submission.images, newImageObject] });
      console.log(submission)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCommentChange = (event, imageIndex) => {
    const updatedImages = [...submission.images];
    updatedImages[imageIndex].comment = event.target.value;
    setSubmission({ ...submission, images: updatedImages });
    console.log(submission)
  };

  const handleSaveSubmission = async () => {

    try {

      let submitTask = {

        "user_id": userId,
        "task_id": task_id,
        "comment": "This is a submission comment",
        "images": submission.images

      };
      console.log(submitTask);

      const response = await axios.post(apiBaseUrl+'/submit_task/', submitTask, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,  // Replace with your authentication token
        },
      });
      // call api for update

      console.log('Task submitted successfully:', response.data);

      if (response && response.status === 201) {
        setSubmissionSaved(true);
        setSubmissionError(false);
        // Reset the submission form
        setSubmission({ images: [] });
        fetchSubmissions();
      //  setSubmittedTasks([...submittedTasks, submitTask]);
        // Reset form values upon successful submission
      }
      else {
        setSubmissionError(true);// Display error message if response status is not 200
      }

    } catch (error) {
      setSubmissionError(true);
    }

    // Perform save logic for the submission
    console.log('Submission saved:', submission);
  };

  const fetchSubmissions = async () => {

    try {

      const response = await axios.get(apiBaseUrl+`/task_submissions/${task_id}`, {
        headers: {
          Authorization:  `Token ${localStorage.getItem('token')}`,  // Replace with your authentication token
        },
      });
      // Make an API call to fetch notifications

      console.log(response)

      // Check the response and update the state with the fetched notifications
      if (response && response.status === 200) {

        setSubmittedTasks(response.data)
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
    fetchSubmissions();
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Header>
        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {/* Add New Submission */}
                  新增提交内容
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  id="file-input"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                <label htmlFor="file-input">
                  <MDButton variant="gradient" color="info" component="span" startIcon={<CloudUploadIcon />}>
                    {/* Upload Image (MAX 10) */}
                    上傳圖片（最多 10 張）
                  </MDButton>
                </label>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  {submission.images.map((imageObj, imageIndex) => (
                    <div key={imageIndex} style={{ marginRight: '10px' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img
                          src={apiBaseUrl+'/images/' + imageObj.image}
                          alt={`Image ${imageIndex}`}
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
                          {imageIndex + 1}
                        </div>
                      </div>
                      <TextField
                        label={`Comment ${imageIndex + 1}`}
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={imageObj.comment || ''}
                        onChange={(e) => handleCommentChange(e, imageIndex)}
                      />
                      <IconButton color="error" onClick={() => handleRemoveImage(imageObj.image, imageIndex)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid container justifyContent="flex-end" item xs={12}>
                <MDButton
                  variant="gradient"
                  color="success"
                  onClick={handleSaveSubmission}
                  startIcon={<SaveIcon />}
                  sx={{ marginRight: '10px' }}
                  // Disable button based on submissionSaved state
                >
                  {/* Save Submission */}
                  保存提交内容
                </MDButton>
               
                {submissionError && (
                  <MDTypography component="a" href="#" style={{ color: 'red', display: 'flex', alignItems: 'center' }} variant="body2" color="text" fontWeight="medium">
                    {/* Error in saving submission. Please submit again */}
                    保存提交出错，请再次提交
                  </MDTypography>
                  // <Typography variant="body1" style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
                  //   <CheckCircleIcon sx={{ marginRight: '5px' }} /> Submission saved successfully
                  // </Typography>
                )}

              </Grid>

            </Grid>

          </CardContent>
         

        </Card>
        
            {submittedTasks.map((task, taskIndex) => (
              <Card style={{ marginBottom: '20px' }}>
              <CardContent>
              <Grid item xs={12} key={taskIndex}>
              {submittedTasks.status === 'SUBMITTED' && ( // Check if the submission is approved
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
                            ✓ 提交内容已获批
                            {/* Submission Approved */}
                          </div>
                        )}
                <Typography variant="h6" gutterBottom style={{ marginBottom: '40px' }}>
                  {/* Submission */}
                  提交: {taskIndex+1}
                </Typography>
                {task.status === 'DECLINED' && ( // Check if the submission is approved
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
                            X 驳回 !
                            {/* Decilned */}
                          </div>
                        )}
                {/* Display images and comments inline */}
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {task.task_submissions.map((imageObj, imageIndex) => (
                    <div key={imageIndex} style={{ marginRight: '10px', marginBottom: '10px' }}>
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '5px' }}>
                        <img
                          src={apiBaseUrl+'/images/' + imageObj.image}
                          alt={`Image ${imageIndex}`}
                          style={{ width: '100%', height: 'auto', maxHeight: '15vh' }}
                        />
                        <MDTypography component="a" variant="body2" color="text" fontWeight="medium">
                          {imageObj.comment || ''}
                        </MDTypography>
                      </div>
                    </div>
                  ))}
                </div>
              </Grid>
              </CardContent>
          </Card>
            ))}
            
         
      </Header>
    </DashboardLayout>
  );
};

export default SubmissionForm;
