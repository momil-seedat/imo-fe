import { SetHandleImageUploadPopup } from 'context';
import { SetTaskMultipleSubmissionData } from 'context';
import { useMaterialUIController } from 'context';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'; // Import necessary Material-UI components

const UploadPhotos = ({currentSubmissionID}) => {
  const [controller, dispatch] = useMaterialUIController();
  const submissions=controller.TaskMultipleSubmissionData
  // const [submissions, setSubmissions] = useState([
  //   { photos: [], comments: Array(8).fill('') },
  //   { photos: [], comments: Array(8).fill('') },
  //   { photos: [], comments: Array(8).fill('') },
  //   { photos: [], comments: Array(8).fill('') }
  // ]);
  
  const handlePhotoChange = (event, submissionIndex) => {
    const selectedFiles = Array.from(event.target.files).slice(0, 8); // Limit to 8 images
    const updatedSubmissions = [...submissions];
    const updatedPhotos = [...updatedSubmissions[submissionIndex].photos];
    const updatedComments = [...updatedSubmissions[submissionIndex].comments];
  
    selectedFiles.forEach((file) => {
      updatedPhotos.push(file);
    });
  
    updatedSubmissions[submissionIndex].photos = updatedPhotos;
    // Update comments array with empty strings for new images
    updatedSubmissions[submissionIndex].comments = updatedComments.concat(Array(8 - updatedPhotos.length).fill(''));
  
    SetTaskMultipleSubmissionData(dispatch,updatedSubmissions);
  };
  
  const handleRemovePhoto = (submissionIndex, index) => {
    const updatedSubmissions = [...submissions];
    const updatedPhotos = [...updatedSubmissions[submissionIndex].photos];
    const updatedComments = [...updatedSubmissions[submissionIndex].comments];
  
    updatedPhotos.splice(index, 1);
    updatedComments.splice(index, 1);
  
    updatedSubmissions[submissionIndex].photos = updatedPhotos;
    updatedSubmissions[submissionIndex].comments = updatedComments;
  
    SetTaskMultipleSubmissionData(dispatch,updatedSubmissions);
  };
  
  const handleCommentChange = (submissionIndex, index, comment) => {
    const updatedSubmissions = [...submissions];
    const updatedComments = [...updatedSubmissions[submissionIndex].comments];
    updatedComments[index] = comment;
  
    updatedSubmissions[submissionIndex].comments = updatedComments;
    SetTaskMultipleSubmissionData(dispatch,updatedSubmissions);
  };
  
  const handleSave = () => {
    SetHandleImageUploadPopup(dispatch, false);
    // Perform actions with photos and comments, like sending to server or storing in state.
    // Then, close the popup or perform any necessary actions.
  };
  
  const heightClass = submissions[currentSubmissionID].photos.length > 0 ? 'h-2/3' : 'h-auto';
  const widithclass = submissions[currentSubmissionID].photos.length > 0 ? '60%' : '30%';

  const [openPreview, setOpenPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <div className="flex flex-col mb-4 z-50 rounded-xl  ">
   
    
      {/* Popup for uploading photos and adding comments */}
        <div className="p-4 rounded-xl shaodw-xl overlay-popup fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50">
        
        <div className={`popup-content bg-white rounded-lg p-8 overflow-y-scroll ${heightClass}`} style={{ width: widithclass }}>
        {submissions[currentSubmissionID].photos.length > 0 ?(
            <>
        <input
            type="file"
            id="photo"
            onChange={(event) => handlePhotoChange(event, currentSubmissionID)} // Pass 1 as the default submission index 
            className="hidden"  
            accept="image/*"
            multiple
          />
          <div className='flex flex-row justify-end items-right p-2'>
          <button onClick={() => handleSave()} className="text-lg flex flex-row justify-end relative bottom-8 left-4  bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full">
                    <ClearIcon/>
                  </button>
          </div>
          

            <div className='space-between flex flex-row justify-between relative bottom-4'>
                <h1 className='font-bold text-2xl '>
                    Select Images 
                </h1>
            {submissions[currentSubmissionID].photos.length === 8 ? (
             null
            ) : <label htmlFor="photo" className="rounded-xl upload-button block text-center mb-8 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-lg rounded">
            Upload <CloudUploadIcon/>
          </label>}
          </div>
          {submissions[currentSubmissionID].photos.length > 0 &&(
          <hr className='bg-gray-200 h-1 bottom-10 relative'/>)}

            <div className="grid grid-cols-2 gap-4 ">

              {/* Display uploaded photos with comments */}
              {submissions[currentSubmissionID].photos.map((photo, index) => (
                <div key={index} className="photo-item relative shadow-md p-2">
                  <img src={URL.createObjectURL(photo)}
                              onClick={() => handleImageClick(photo)} // Open full-screen preview on image click

                  alt={`task ${index}`} className="w-48 h-auto rounded cursor-pointer " />
                  <input
                    value={submissions[currentSubmissionID].comments[index]}
                    onChange={(e) => handleCommentChange(currentSubmissionID,index, e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full mt-2 p-1 text-sm border border-gray-300 rounded"
                  />
                  <button onClick={() => handleRemovePhoto(currentSubmissionID,index)} className="text-sm absolute top-0 right-0 mt-2 mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            </>):(<>
              <div className='flex flex-col justify-center items-center relative  gap-4 '>
                <h1 className='font-bold text-3xl '>
                    Select Images 
                </h1>
          <label htmlFor="photo" className="rounded-xl upload-button block text-center mb-8 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-lg rounded">
            Upload <CloudUploadIcon/>
            <input
            type="file"
            id="photo"
            onChange={(event) => handlePhotoChange(event, currentSubmissionID)} // Pass 1 as the default submission index 
            className="hidden"  
            accept="image/*"
            multiple
          />
          </label>
          </div>
            </>)}
          </div>
         
          {submissions[currentSubmissionID].photos.length >=1 && (
          <button onClick={handleSave} className=" rounded-xl w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
              Save
            </button>)}
        </div>
        <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="xl">
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
    Image Preview
    <Button onClick={handleClosePreview} color="primary">Close</Button>
  </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              style={{ width: '100%', height: 'auto', maxHeight: '80vh' }}
            />
          )}
        </DialogContent>
      </Dialog>
        </div>
  );
};

export default UploadPhotos;
