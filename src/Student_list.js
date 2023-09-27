

//  This file use a student result 




import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function StudentList() {


 const [data, setData] = useState([]); // use student data list 

  useEffect(() => {
    getApi();
  }, []);

  function getApi() {
    
    fetch("http://localhost:8081/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // this function delete student recode
  function deleteuser(_id,firstName) {
    
    const shouldDelete = window.confirm(`Are you sure you want to delete ${_id} ${firstName}?`);
    if (shouldDelete) {
      fetch(`http://localhost:8081/delete/${_id}`, {
        method: "DELETE",
      })
        .then((result) => result.json())
        .then((response) => {
          console.log(`${firstName} is deleted.`, response);
          getApi(); // Refresh the student list after deletion
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={{ width: "200px", height: "300px" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DateOfBirth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Operation </TableCell>
              <TableCell>Operation </TableCell>
              <TableCell>Result </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No data available</TableCell>
              </TableRow>
            ) : (
              data.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>{post._id}</TableCell>
                  <TableCell>{post.firstName}</TableCell>
                  <TableCell>{post.lastName}</TableCell>
                  <TableCell>{post.mobile}</TableCell>
                  <TableCell>{post.email}</TableCell>
                  <TableCell>{post.dateOfBirth}</TableCell>
                  <TableCell>{post.gender}</TableCell>
                  <TableCell><Button variant="contained"onClick={() => deleteuser(post._id,post.firstName)}>Delete</Button></TableCell>
                  <TableCell> <Link to={`/update/${post._id}`}>    <Button variant="contained">Update</Button>  </Link>   </TableCell>
                  <TableCell><Link to={`/Showresult/${post._id}`}> <Button variant="contained">Result</Button> </Link> </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
