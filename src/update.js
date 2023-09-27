import React, { useState, useEffect } from 'react';

import { Button, FilledInput, Select, MenuItem,FormControl} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
export default function UpdateForm() {
  const [insertModalOpen, setInsertModalOpen] = useState(true);
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    country: '', // Default country code (e.g., 'in' for India)
    mobile: '',
    email: '',
    dateOfBirth: '',
    gender: '',
  });

  const { _id } = useParams();
  useEffect(() => {
    console.log( "id ww w  ",_id)
    axios.get(`http://localhost:8081/update/${_id}`)
      .then((res) => {
      
        console.log( "res qwertyui",res);

  
  
        // Convert the date format to "yyyy-MM-dd"
        const serverDate = res.data.dateOfBirth;
        const formattedDate = new Date(serverDate).toISOString().split('T')[0];
        
        console.log( "qwertyui",formattedDate)
  
        setStudentData({
          ...studentData,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          country: res.data.country, // Country code
          mobile: res.data.mobile,
          email: res.data.email,
          dateOfBirth: formattedDate, // Use the formatted date
          gender: res.data.gender,
        });
      });

   
  },  [ _id] );
  


  const handleUpdate = () => {
   
    axios.put(`http://localhost:8081/updatee/${_id}`,
    studentData
    ).then(res=>{
        console.log(res)
    })
    setInsertModalOpen(false);
    
}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setInsertModalOpen(false);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    handleUpdate(); // Call your insert function here
    closeModal(); // Close the modal after submission
  };




  
  const handlealphabetic = (event) => {
    const { name, value } = event.target;
    // Check if the input contains only alphabetic characters
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setStudentData({
        ...studentData,
        [name]: value,
      });
    } else {
      alert('Please enter only alphabetic characters.');
    }
  };


  const handleDateChange = (event) => {
    const { name, value } = event.target;
    const enteredDate = new Date(value);
    const currentDate = new Date();
    if (enteredDate <= currentDate) {
      setStudentData({
        ...studentData,
        [name]: value,
      });
    } else {
      alert('Invalid date. Please enter a past date.');
    }
  };


  return (
    <div className='getapi'>

<Modal
        open={insertModalOpen}
        onClose={() => setInsertModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <form onSubmit={handleSubmit}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Result
          </Typography>
          <FormControl> 
          <h1>Student update</h1>
          Enter First Name:{' '}
          <FilledInput
            type='text'
            name='firstName'
            value={studentData.firstName}
            onChange={handlealphabetic}
            placeholder='Enter First Name'
            required
          />
           </FormControl>
          <br />
          <br />
          <FormControl> 
          Enter Last Name:{' '}
          <FilledInput
            type='text'
            name='lastName'
            value={studentData.lastName}
            onChange={handlealphabetic}
            placeholder='Enter Last Name'
            required
          />
           </FormControl>
          <br />
          <br />
          <FormControl> 
          Enter mobile No:{' '}
              <PhoneInput
  country={studentData.country}
  name='mobile'
  value={studentData.mobile}
  onChange={(mobile, countryData) => {
  const countryCode = countryData.countryCode; // Extract the country code
    setStudentData({
      ...studentData,
      country: countryCode, // Update the country code
      mobile: `+${mobile}`, // Update the phone number
    });
  }}
  placeholder='Enter mobile Number'
  required
/>
           </FormControl>
          <br />
          <br />
          <FormControl> 
          Enter Email:{' '}
          <FilledInput
            type='email'
            name='email'
            value={studentData.email}
            onChange={handleInputChange}
            placeholder='Enter Email'
            required
          />
           </FormControl>
          <br />
          <br />
          <FormControl> 
          Enter Date of Birth:{' '}
          <FilledInput
            type='date'
            name='dateOfBirth'
            value={studentData.dateOfBirth}
            onChange={handleDateChange}
            required
          />
           </FormControl>
          <br />
          <br />
          <FormControl> 
          Select Gender:
          <Select name='gender' value={studentData.gender} onChange={handleInputChange}   required >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
          </Select>
          </FormControl> 
          <br />
          <br />
     
          <Button variant="contained" type='submit'>
            Update
          </Button>
        </Box>
        </form>
      </Modal>


      <br />
          
    
    </div>
  );
}
