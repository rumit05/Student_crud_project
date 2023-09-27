import React, { useState } from 'react';
import { Button, FilledInput, Select, MenuItem, FormControl, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function StudentRegister() {
  const [insertModalOpen, setInsertModalOpen] = useState(true);


  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    country: 'in', // Default country code (e.g., 'in' for India)
    mobile: '',
    email: '',
    dateOfBirth: 'YYYY-MM-DD', // Set your default date here
    gender: '',
  });


  function insert() {
    let userData = {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      country: studentData.country, // Country code
      mobile: studentData.mobile,
      email: studentData.email,
      dateOfBirth: studentData.dateOfBirth,
      gender: studentData.gender,
    };
    

    fetch("http://localhost:8081/insert", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then((result) => {
      result.json().then((response) => {
        console.log("post method result", response);
      });
    });
  }


  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setStudentData({
        ...studentData,
        [name]: value,
      });
    }
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



  const closeModal = () => {
    setInsertModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    insert(); // Call your insert function here
    closeModal(); // Close the modal after submission
  };




  return (
    <div className='getapi'>
      <br></br>
      <Modal
        open={insertModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <form onSubmit={handleSubmit}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> Student Registration </Typography><br></br>
            <FormControl>
              Enter First Name: <FilledInput type='text' name='firstName' value={studentData.firstName} onChange={handlealphabetic} placeholder='Enter First Name' required /><br /><br />   </FormControl>
            <FormControl> Enter Last Name: <FilledInput type='text' name='lastName' value={studentData.lastName} onChange={handlealphabetic} placeholder='Enter Last Name' required /><br /><br /></FormControl>
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

              <br />
              <br />
            </FormControl>
            <FormControl>  Enter Email: <FilledInput type='email' name='email' value={studentData.email} onChange={handleInputChange} placeholder='Enter Email' required /><br /><br /></FormControl>
            <FormControl>    Enter Date of Birth: <FilledInput type='date' name='dateOfBirth' value={studentData.dateOfBirth} onChange={handleDateChange} required /></FormControl><br /><br />

            <FormControl>
              Select Gender:
              <Select name='gender' value={studentData.gender} onChange={handleInputChange} required>
                <MenuItem value='' disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </Select>

            </FormControl> <br /><br />
            <Button variant="contained" type='submit'>Save New User</Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
