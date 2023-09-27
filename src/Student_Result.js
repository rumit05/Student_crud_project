import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, FilledInput, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { FormControl } from '@mui/material';
import { useParams } from "react-router-dom"

const StudentResult = () => {
  const location = useLocation();
  //const queryParameters = new URLSearchParams(location.search);

  const {_id} = useParams();
 console.log(_id);
  const [data, setData] = useState([]);

  const [selectedStudentId, setSelectedStudentId] = useState(_id);

  const [studentData, setStudentData] = useState({
    student_id: '',
    Fullname:  '',
    react: '',
    JavaScript: '',
    java: '',
    node: '',
  });

  const [insertModalOpen, setInsertModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/result/`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        
        if(_id){ 
          const selectedStudent = res.data.find((item) => item._id == _id);
            if (selectedStudent) { 
              setStudentData({
                ...studentData,
                student_id: selectedStudent._id,
                Fullname: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
              });
            }
        }
    })
    
      .catch((error) => {
        console.error(error);
      });

      
  }, []);

  function insert() {
    let userData = {
      student_id: studentData.student_id,
      Fullname: studentData.Fullname,
      react: studentData.react,
      JavaScript: studentData.JavaScript,
      java: studentData.java,
      node: studentData.node,
    };

    fetch('http://localhost:8081/insert/result/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((result) => {

        result.json()
        
        .then((response) => 
        
        {
          console.log('post method result', response);
        });
      })


      .catch((error) => {
        console.error('Error posting result:', error);
      });

    setInsertModalOpen(false);
  }


  const handleResultChange = (event) => {
    const selectedStudentId = event.target.value; console.log(selectedStudentId);
    setSelectedStudentId(selectedStudentId);

    // Find the selected student by ID
    const selectedStudent = data.find((item) => item._id === selectedStudentId);
    if (selectedStudent) {
      setStudentData({
        ...studentData,
        student_id: selectedStudent._id,
        Fullname: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    insert(); // Call your insert function here
    setInsertModalOpen(false);
  };

  return (
    <div>
        <div>
          <Select
            name="result"
            value={selectedStudentId}
            onChange={handleResultChange}
            placeholder="Select student"
          >
            {data.map((item) => (

              <MenuItem key={item._id} value={item._id}>
                {item.firstName} {item.lastName}
              </MenuItem>
            ))}
          </Select>
          <br />
          <br />
          <Button variant="contained" onClick={() => setInsertModalOpen(true)}>
            ADD Result
          </Button>
        </div>
  
      <Modal
        open={insertModalOpen}
        onClose={() => setInsertModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Result for {studentData.Fullname}
            </Typography>
            <FormControl>
              <FilledInput
                type="number"
                name="student_id"
                value={studentData.student_id}
                readOnly
                hidden
                required
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              Student Name
              <FilledInput
                type="text"
                name="Fullname"
                value={studentData.Fullname}
                readOnly
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              Enter Mark in React:{' '}
              <FilledInput
                type="number"
                name="react"
                value={studentData.react}
                required
                onChange={(e) =>
                  setStudentData({ ...studentData, react: e.target.value })
                }
                placeholder="Enter Mark in out of 50"
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              Enter Mark in JavaScript:{' '}
              <FilledInput
                type="number"
                name="JavaScript"
                value={studentData.JavaScript}
                required
                onChange={(e) =>
                  setStudentData({ ...studentData, JavaScript: e.target.value })
                }
                placeholder="Enter Mark in out of 50"
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              Enter Mark in Java:{' '}
              <FilledInput
                type="number"
                name="java"
                value={studentData.java}
                required
                onChange={(e) =>
                  setStudentData({ ...studentData, java: e.target.value })
                }
                placeholder="Enter Mark in out of 50"
              />
            </FormControl>
            <br />
            <br />
            <FormControl>
              Enter Mark in Node.js:{' '}
              <FilledInput
                type="number"
                name="node"
                value={studentData.node}
                required
                onChange={(e) =>
                  setStudentData({ ...studentData, node: e.target.value })
                }
                placeholder="Enter Mark in out of 100"
              />
            </FormControl>
            <br />
            <br />
            <Button variant="contained" type="submit">
              Save Results
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default StudentResult;
