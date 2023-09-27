import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "axios";
import { lightGreen } from "@mui/material/colors";

export default function UpdateForm() {
  const [insertModalOpen, setInsertModalOpen] = useState(true);
  const { _id } = useParams();
  const navigate = useNavigate(); // Use useNavigate

  const [studentData, setStudentData] = useState({
    student_id: "",
    Fullname: "",
    react: "",
    JavaScript: "",
    java: "",
    node: "",
    gender: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/showresult/${_id}`).then((res) => {

    // console.log(res,"qwertyui")
      if (res.data && res.data[0]) {
        setStudentData({
          student_id: res.data[0].student_id,
          Fullname: res.data[0].Fullname,
          react: res.data[0].react,
          JavaScript: res.data[0].JavaScript,
          java: res.data[0].java,
          node: res.data[0].node,
        });
      } else {

        navigate(`/Add/${_id}`);
     
      }
    });
  }, [_id, navigate]);


  const subjects = ["react", "JavaScript", "java", "node"]; // Define your subjects here
  const calculateGrade = (total) => {
    if (total > 200) return "A Grade";
    if (total > 100) return "B Grade";
    if (total >= 80) return "D Grade";
    if (total >= 50) return "E Grade";
    if (total >= 30) return "F Grade";
    return "Fail Grade";
  };

  const totalMarks =
    studentData.react +
    studentData.JavaScript +
    studentData.java +
    studentData.node;

  const grade = calculateGrade(totalMarks);

  return (
    <div className="getapi">
      <Modal
        open={insertModalOpen}
        onClose={() => setInsertModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, // Adjust the width as needed
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Student Result
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b> Name </b>
                  </TableCell>
                  <TableCell>{studentData.Fullname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {" "}
                    <b> Roll No </b>
                  </TableCell>
                  <TableCell>{studentData.student_id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b> Subject </b>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <b> Marks </b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject}>
                    <TableCell>{subject}</TableCell>
                    <TableCell>{studentData[subject]}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    {" "}
                    <b> Total </b>
                  </TableCell>
                  <TableCell>{totalMarks}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {" "}
                    <b> Grade </b>
                  </TableCell>
                  <TableCell>{grade}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}
