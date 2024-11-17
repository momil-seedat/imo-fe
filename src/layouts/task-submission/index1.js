import React, { useState } from 'react';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router';
//import {  useSelector } from 'react-redux';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useMaterialUIController } from 'context';
import UploadPhotos from './photo';
import { SetHandleImageUploadPopup } from 'context';
// import { setTaskSubmission } from 'context';




const SubmitNewTask = () => {
  const [controller, dispatch] = useMaterialUIController();

  const isEditTaskActive=controller.TaskSubmission
      //Add task left component
      const [title, setTitle] = useState('');
  // const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [TaskID,setTaskID]=useState();

// This is where all images and comments store along with submission id 
  const MultipleImagesSubmisssionData=controller.TaskMultipleSubmissionData
// printing 9
  console.log('Multiple images \n',MultipleImagesSubmisssionData)
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handlePhotoChange = (e) => {
  //   const newPhotos = Array.from(e.target.files);
  //   setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  // };
  // const handlePhotoChange = (e) => {
  //   const newPhotos = Array.from(e.target.files);
  //   const validPhotos = [];
  
  //   // Function to check if an image is square and not larger than 2000x2000 pixels
  //   const isValidImage = (img) => {
  //     const MAX_SIZE = 2000; // Maximum size allowed
  
  //     return new Promise((resolve) => {
  //       const reader = new FileReader();
  
  //       reader.onload = (e) => {
  //         const image = new Image();
  //         image.src = e.target.result;
  
  //         image.onload = () => {
  //           const width = image.width;
  //           const height = image.height;
  
  //           if (height<= MAX_SIZE && width <= MAX_SIZE) {
  //             validPhotos.push(img);
  //           } else {
  //             // Set the error message if the image doesn't meet the criteria
  //             setPhotosError('Image dimensions must be square and not exceed 2000x2000 pixels.');
  //           }
  
  //           if (validPhotos.length === newPhotos.length) {
  //             // All selected images have been checked
  //             setPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
  //           }
  //           resolve();
  //         };
  //       };
  
  //       reader.readAsDataURL(img);
  //     });
  //   };
  
  //   // Clear any previous error message
  //   setPhotosError('');
  
  //   // Check each selected image
  //   const checkImages = async () => {
  //     for (const photo of newPhotos) {
  //       await isValidImage(photo);
  //     }
  //   };
  
  //   checkImages();
  // };
  
  
  
  // const handleRemovePhoto = (index) => {
  //   setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  // };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
// Show image upload Popup main 

const ShowUploadPopUp=controller.HandleImageUploadPopup
// Multiple Image Submission Current Id 
const [currentSubmissionNUMBER,SetCurrentSubmissionNumber]=useState(0)
// /////////////////////////
const [showPopup, setShowPopup] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [comments, setComments] = useState([]);

  const handlePhotoChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const updatedPhotos = [...photos];
    const updatedComments = [...comments];

    selectedFiles.forEach((file) => {
      updatedPhotos.push(file);
      updatedComments.push('');
    });

    setPhotos(updatedPhotos.slice(0, 15)); // Limit photos to 15
    setComments(updatedComments.slice(0, 15)); // Limit comments to 15
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    const updatedComments = [...comments];

    updatedPhotos.splice(index, 1);
    updatedComments.splice(index, 1);

    setPhotos(updatedPhotos);
    setComments(updatedComments);
  };

  const handleCommentChange = (index, comment) => {
    const updatedComments = [...comments];
    updatedComments[index] = comment;
    setComments(updatedComments);
  };

  const handleSave = () => {
    // Perform actions with photos and comments, like sending to server or storing in state.
    // Then, close the popup or perform any necessary actions.
    setShowPopup(false);
    setSelectedPhotoIndex(null);
  };

//////////////////////



  
  //  const signal = useSelector((state) => state.signalrouter);

    const navigate=useNavigate()
    //show task wigdet or not
    const [showaddtaskwidget,setshowtaskwidget]=useState(true)
    //
    const [Height, setHeight] = useState(0);
    const [Length, setLength] = useState(0);

  
    const [HeightError, setHeightError] = useState('');
    const [Lengtherror, setLengtherror] = useState('');
    const [photosError, setPhotosError] = useState('');

  
    //categories state
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    //Loading animation state
    const handleHeightChange = (e) => {
      const inputValue = e.target.value;
      if (/^\d*\.?\d*$/.test(inputValue) || inputValue === '') {
        setHeight(inputValue);
        setHeightError('');
      } else {
        setHeightError('Only decimal numbers are allowed');
      }
    };
    
  
    const handleLengthChange = (e) => {
      const inputValue = e.target.value;
      if (/^\d*\.?\d*$/.test(inputValue) || inputValue === '') {
        setLength(inputValue);
        setLengtherror('');
      } else {
        setLengtherror('Only decimal numbers are allowed');
      }
    };
  




    //for new task add on when pop up appears
    const handleaddnewtask=(str)=>{
      setshowtaskwidget(str)
    }
    const handleSubmitTask = async (str) => {
      // setTaskSubmission(dispatch,false)

      // Initialize error states
      setHeightError('');
      setLengtherror('');
    
      let hasError = false; // Flag to track if any error occurred
    
      if (Height === 0) {
        setHeightError('Height must be greater than 0');
        hasError = true;
      }
  
      
      if (Length === 0) {
        setLengtherror('Length  must be greater than 0');
        hasError = true;
      }
    
    
    
      if (photos.length === 0) {
        setPhotosError('Please Add Some Picture');
        hasError = true;
      }
      // Additional conditions for other fields (weight, shipping, etc.) can be added similarly
    
      if (hasError) {
         console.log('errro')
         // Don't proceed with API call if there are errors
         return;
       }
    
      try {

        const formData = new FormData();
        
        formData.append('title', title);
        formData.append('description', description);
        formData.append('length', Length);
        formData.append('category',selectedSubcategory)
          
        const images = photos.map((photo, index) => {
          return { image: photo }; // Assuming 'image1', 'image2', ...
        });
        // photos.forEach((photo, index) => {
        //   formData.append(`images`, photo); // Assuming 'photo' is the File object
        // });
      
        
    
        //console.log('Status', response.status);
        setshowtaskwidget('save')
        console.log(showaddtaskwidget)
        if (response.status === 201) {
          setIsLoading(false)
          //console.log(response.data);
          //console.log('task', title);
          setshowtaskwidget(str);
          setshowtaskwidget(str)
          // clearing the form
          setTitle('');
          setDescription('');
          setPhotos([]);
          setSelectedCategory('');
          setHeight(0);
          setLength(0);
        
        }
        //console.log('Response:', response.data);
      } catch (error) {
        

        //console.error('Error:', error);
      }
    };
    
    const gotohome=()=>{
        navigate('/')
    }
    
    const statehandler=(str)=>{
      setshowtaskwidget(str)
    }
    
  
  
    const handleTaskid = (id) => {
      setTaskID(id);
    };
    // Upload Photo State Handler
    const  handleUploadPhoto=(str,id)=>{
      SetHandleImageUploadPopup(dispatch,str)
      SetCurrentSubmissionNumber(id)
    }
    
    const taskid=[1,2,3]
    
    return (
      <>
<DashboardLayout>
<DashboardNavbar/>
        <div>
    {showaddtaskwidget === true &&(
    <div className=' flex flex-col md:items-left md:justify-start mt-4 '>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-2/3 w-full">
        <div className="p-4">
        <div className='flex justify-between'>
          {isEditTaskActive ?(
            <h1 className="text-xl md:text-2xl  mb-4">Edit Task</h1>
          ):(
      <h1 className="text-xl md:text-2xl  mb-4">Submit a New Task</h1>)}
       <select
        className=" border rounded-xl p-2 mb-4 focus:outline-none text-lg"
        value={TaskID}
        onChange={(e) => handleTaskid(e.target.value)}
      >
        <option value=""  className='text-xs'>Select a Task Id</option>
        {taskid.map((id) => (
          <option key={id} value={id}  className='text-sm'>
            {id}
          </option>
        ))}
      </select>
      </div>
      {/* <div className="flex flex-col space-y-4 ">
        <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-700  mb-1">
  <span className='text-lg'>Title {title.length} / 200</span>
</label>
<input
  type="text"
  id="title"
  value={title}
  onChange={handleTitleChange}
  className="border rounded-md px-1 text-lg py-1"
  placeholder="Enter title"
  maxLength={200} // Set the maximum length
  required
  disabled={title.length > 200} // Disable when length exceeds 200  
/>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description" className="text-gray-700  mb-1 text-lg">
            Description {description.length}/2000
            <span className='flex flex-row justify-end'>{description.length >= 2000 && (
  <button
    onClick={() => setDescription(description.slice(0, 4999))} // Truncate title to 200 characters
    className="text-blue-500 underline  cursor-pointer focus:outline-none text-lg"
  > 
    Edit
  </button>
)}</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="border rounded-md px-3 py-2 resize-none text-lg"
            placeholder="Enter Task Description"
            rows="7"
            required
            disabled={description.length > 2000}
          />
          
        </div>
        
      </div> */}
    </div>


        </div>
        <div className="  md:w-1/3 w-full   rounded-2xl mt-4 ">
          <div className='bg-white p-4 rounded-xl shadow-xl'>
            {/* Previous photo componnet backup  */}
          {/* {<div className="flex flex-col mb-4 ">
          
 
 <input
   type="file"
   id="photo"
   onChange={handlePhotoChange}
   className="hidden"
   accept="image/*"
   multiple
 />
 <label htmlFor="photo" className="text-gray-700  mb-1 flex flex-row justify-between items-between">
   <span>Photos {photos.length} / 15</span>
   <span> <label htmlFor="photo" id="addphoto" className={`text-blue-500 cursor-pointer ${photos.length === 15 ? 'hidden' : ''}`}>
   <AddCircleOutlineSharpIcon className="mr-1 text-blue-400" />
   Add Photo
 </label></span>
 </label>
 <div className='flex flex-col grid grid-cols-6 gap-4 '>
 {photos.map((photo, index) => (
   <div key={index} className="flex items-center grid grid-cols-1 ">
     <img src={URL.createObjectURL(photo)} alt={`task ${index}`} className="max-h-24 mr-2" />
     <div className="flex flex-col">
       <CancelOutlinedIcon className="mt-1 cursor-pointer text-red-600" onClick={() => handleRemovePhoto(index)} />
     </div>
   </div>
 ))}

 </div>
 {photosError &&(
   <div className='text-red-600 text-sm text-center '>{photosError}</div>
 )} 
</div>} */}
{/* Upload Photo */}
<div className='flex flex-col items-center justify-center'>
  <h1>Upload Images Upto 4 Submissions</h1>
<div className='flex flex-row grid grid-cols-4 gap-4 mt-2 mb-2'>
          {MultipleImagesSubmisssionData.map((submission, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === 0) {
                  handleUploadPhoto(true,index);
                } else {
                  if (MultipleImagesSubmisssionData[index-1].photos.length >= 1) {
                    handleUploadPhoto(true,index);
                  }
                }
              }}
              className={`bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-400 hover:shadow-xl w-full text-lg ${
                (index !== 0 && MultipleImagesSubmisssionData[index-1].photos.length < 1) ? '   opacity-50' : ''
              }`}
              disabled={index !== 0 && MultipleImagesSubmisssionData[index - 1].photos.length < 1}
              >
              Sub{index + 1}
            </button>
          ))}

  </div> 
  </div>
            {/* Categories */}

      
           
            {/* {<div className='flex flex-col text-black items-center justify-center p-4 gap-1'>
                <h1 className='text-xl '>Set Price </h1>
                <div className='flex flex-row grid grid-row-3  '>
                {Height<=1 &&(

                <div>
                    <h1 className='text-gray-500 '>Price for 1pc</h1>
                    <label htmlFor="price" className="text-gray-700  mb-1">
                    </label>
                    <input
                    type="text"
                    id="price"
                    value={price}
                    onChange={handlepricechange}
                    className="border rounded-md px-3 py-2 w-full "
                    placeholder="<1"
                    pattern="[1-9]+" // Only allow digits
                    required
                    />
                </div>)}
                {Height<=10 &&(

                <div>
                    <h1 className='text-gray-500 '>Greater  than 10pcs</h1>
                    <label htmlFor="greaterthenten" className="text-gray-700  mb-1">
                    </label>
                    <input
                    type="text"
                    id="greaterthenten"
                    value={greaterthenten}
                    onChange={handlegreaterthentenChange}
                    className="border rounded-md px-3 py-2 w-full "
                    placeholder="<10"
                    pattern="[1-9]+" // Only allow digits
                    required
                    />
                </div>)}
                {Height<=100 &&(
                <div>
                <h1 className='text-gray-500 '>Greater than 100 pcs</h1>

                    <label htmlFor="greaterthenhundred" className="text-gray-700  mb-1">
                    </label>
                    <input
                    type="text"
                    id="greaterthenhundred"
                    value={greaterthenhundred}
                    onChange={handlegreaterthenhundredChange}
                    className="border rounded-md px-3 py-2 w-full "
                    placeholder=">100"
                    pattern="[1-9]+" // Only allow digits
                    required
                    />
                </div>)}
                
                <div>
                <h1 className='text-gray-500 '>Quantity Greater than 1000pcs</h1>

                    <label htmlFor="greaterthenthousand" className="text-gray-700  mb-1">
                    </label>
                    <input
                    type="text"
                    id="greaterthenthousand"
                    value={greaterthenthousand}
                    onChange={handlegreaterthenthousandChange}
                    className="border rounded-md px-3 py-2 w-full "
                    placeholder=">1000"
                    pattern="[1-9]+" // Only allow digits
                    required
                    />
                </div>
                </div>
                {priceerror && <p className="text-red-600 mt-1 ">{priceerror}</p>}
                <div className='flex flex-col text-black items-center justify-center p-4 gap-1'>
                <h1 className='text-xl '>Weight (1pc)</h1>
                <label htmlFor="Length" className="text-gray-700  mb-1">
                </label>
                <input
                type="text"
                id="weight"
                value={weight}
                onChange={handleweightchange}
                onKeyPress={handleWeightKeyPress}
                className="border rounded-md px-3 py-2 w-full "
                placeholder="Enter in kg e.g 0.2"
                required
                />
              {weighterror && <p className="text-red-600 mt-1 ">{weighterror}</p>}
                </div>
                <div className='flex flex-col text-black items-center justify-center p-4 gap-1'>
                <h1 className='text-xl '>Shipping Charges (kg)</h1>
                <h1 className='text-sm '>Shipping will be calculated with multiple by 1pc of weight</h1>

                <label htmlFor="Length" className="text-gray-700  mb-1">
                </label>
                <input
                type="text"
                id="shipping"
                value={shipping}
                onChange={handleshippingchange}
                className="border rounded-md px-3 py-2 w-full "
                placeholder="Enter task Quantity"
                pattern="[1-9]+" // Only allow digits
                required
                />
                {shippingerror && <p className="text-red-600 mt-1 ">{shippingerror}</p>}

                </div>


                    
            </div>} */}
           
                  <div className='flex flex-row items-center justify-center mt-2 '>
                  {isEditTaskActive ?(
                      <button  onClick={() => {
                        handleSubmitTask(false)
                        }} className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-400 hover:shadow-xl w-full text-lg ">
                        
                        Save Task
                      </button>):(
                  <button  onClick={() => {
                    handleSubmitTask(false)
                    }} className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-400 hover:shadow-xl w-full text-lg ">
                    
                    Submit Task
                  </button>
                  )}
                  </div> 
          </div>
          </div>
        {/* for mobile */}
    
      </div>
      </div>
      )}
    {ShowUploadPopUp ==true && (
      <>

      <UploadPhotos currentSubmissionID={currentSubmissionNUMBER}/>
      </>

    )}
      {showaddtaskwidget==='delete' &&(
        <div className='ml-16 flex flex-col items-center justify-center mt-24 p-4 '>
        <div className=' w-1/2 h-80 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-2xl shadow-xl'>
            <div className='flex-row'>

            <h1 className='text-3xl text-gray-600 bold-text poppins-extrabold '>You Deleted task Successfully!</h1>
            <div className='flex items-center justify-center text-red-500 text-4xl' >
            <CheckCircleIcon fontSize='large'/>
            </div>
        </div>
        <div className='mt-8 flex flex-col grid grid-cols-2 justify-between gap-2'>
            <div className='md:w-full w-32 h-12 bg-blue-200 p-3 text-center rounded-xl hover:shadow-md'>
                <button onClick={() => {
                gotohome()
                }}>
                    Goto Home
                </button>
            </div>
            <div className='md:w-full w-48 h-12 bg-blue-400 p-3  text-center rounded-2xl hover:shadow-md'>
            
            <button onClick={() => {
                handleSubmitTask(true)
                }}>
                    Add New task
                </button>
            </div>

        </div>
        </div>
        
        </div>
      )}
      {showaddtaskwidget==='save' &&(
        <div className='ml-16 flex flex-col items-center justify-center mt-24 p-4 '>
        <div className=' w-1/2 h-80 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-2xl shadow-xl'>
            <div className='flex-row'>

            <h1 className='text-3xl text-gray-600 bold-text poppins-extrabold '>Your Task is Saved Successfully!</h1>
            <div className='flex items-center justify-center text-blue-400 text-4xl' >
            <CheckCircleIcon fontSize='large'/>
            </div>
        </div>
        <div className='mt-8 flex flex-col grid grid-cols-2 justify-between gap-2'>
            <div className='md:w-full w-32 h-12 bg-blue-200 p-3 text-center rounded-xl hover:shadow-md'>
                <button onClick={() => {
                gotohome()
                }}>
                    Goto Home
                </button>
            </div>
            <div className='md:w-full w-48 h-12 bg-blue-400 p-3  text-center rounded-2xl hover:shadow-md'>
            
            <button onClick={() => {
                handleaddnewtask(true)
                }}>
                    Add New Task
                </button>
            </div>

        </div>
        </div>
        
        </div>
      )}
      {showaddtaskwidget==='confirmdelete' &&(
        <div className='ml-16 flex flex-col items-center justify-center mt-24 p-4 '>
        <div className=' w-1/2 h-40 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-2xl shadow-xl'>
            <div className='flex-row'>

            <h1 className='text-3xl text-gray-600 bold-text poppins-extrabold '>Are You Sure You want to delete this task ?</h1>
            
        </div>
        <div className=' flex flex-col grid grid-cols-2 justify-between '>
            <div className='md:w-full w-32 h-12 bg-blue-200 p-3 text-center rounded-xl hover:shadow-md'>
                <button onClick={() => {
                gotohome()
                }}>
                   No
                </button>
            </div>
            <div className='md:w-full w-48 h-12 bg-red-400 p-3  text-center rounded-2xl hover:shadow-md'>
            
            <button onClick={() => {
                statehandler('delete')
                }}>
                    Yes
                </button>
            </div>

        </div>
        </div>
        
        </div>
      )}
      </div>
      </DashboardLayout>
      </>
      
    );
  };
  
  export default SubmitNewTask;

  