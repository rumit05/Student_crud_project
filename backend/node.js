const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student"
});



//  This code use student list in table from a table name :- student_insert
app.get('/', (req, res) => {
    const sql = "SELECT * FROM student_insert "; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

 // insert data  student_insert from 
 app.post('/insert', (req, res) => {
    const sql = "INSERT INTO student_insert ( `firstName`, `lastName`, `mobile`, `email`, `dateOfBirth`, `gender`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      
        req.body.firstName,
        req.body.lastName,
        req.body.mobile,
        req.body.email,
        req.body.dateOfBirth,
        req.body.gender
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inserting data" });
        }
        return res.json({ Message: "Data inserted successfully" });
    });
});




// this is use a delete data student
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id; // Assuming you pass the ID in the URL
    const sql = "DELETE FROM student_insert  WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error deleting data" });
        }
        return res.json({ Message: "Data deleted successfully" });
    });
});





// This code use onchage open in upadte data Tabel Name := student_insert
app.get('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_insert WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});
// upadte student  all detail  in upadte us  table name =student_insert 
app.put('/updatee/:id', (req, res) => {
    const sql = "UPDATE student_insert SET firstName = ?, lastName = ?,mobile = ?,email = ?,dateOfBirth = ?,gender = ? WHERE id = ?";
    const id = req.params.id; // Assuming you pass the ID in the URL
    db.query(sql, [   
     req.body.firstName,
       req.body.lastName,
       req.body.mobile,
       req.body.email,
       req.body.dateOfBirth,
       req.body.gender, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error updating data" });
        }
        return res.json({ Message: "Data updated successfully" });
    });
});




//This is a use a  student Result file  Dropdwon buttton in  use id,fname,lname in student_insert  file name = student Result  
app.get('/result/', (req, res) => {
    // const  id = req.params.id;
    // const  firstName = req.params.firstName;
    // const  lastName = req.params.lastName;

    const sql = "SELECT * FROM student_insert "; 
    db.query(sql, (err, result) => {
        console.log( "result ",result)
        if (err) {
            console.error(err);
            return res.json({ Message: " Error inside server" });
        }
        return res.json(result);
    });
});


app.get('/result/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_insert WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

// insert student result file name:=student Result  table name := subject
app.post('/insert/result/', (req, res) => {
    const sql = "INSERT INTO subject ( `student_id`,`Fullname` ,`react`, `JavaScript`, `java`, `node`) VALUES ( ?,?,?, ?, ?, ?)";
    const values = [
        req.body.student_id,
        req.body.Fullname,
         req.body.react,
        req.body.react,
        req.body.JavaScript,
        req.body.java,
        req.body.node,
    
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inserting data" });
        }

        return res.json({ Message: "Data inserted successfully" });
    });
});





// use a showResult file open popup in student Result in  table name = subject , file name = showresult
app.get('/showresult/:studentId', (req, res) => {
  const studentId = req.params.studentId; // Get the student ID from the URL parameter
  const sql = "SELECT * FROM subject WHERE student_id = ?";

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);
  });
});







app.listen( 8081, () => {
    console.log("Listening on port 8081");
});
