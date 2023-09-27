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
    database: "user"
});


app.get('/', (req, res) => {
    const sql = "SELECT * FROM user"; 
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.post('/user', (req, res) => {
    // Assuming you're using JSON requests
    const sql = "INSERT INTO user (`Id`, `Name`, `Email`) VALUES (?, ?, ?)"; // Add backticks to column names
    const VALUES = [
        req.body.Id,
        req.body.Name,
        req.body.Email
    ]
    db.query(sql, VALUES, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error inserting data" });
        }
        
    });
});

// Assuming you have already established a database connection (db)

app.delete('/delete/:Id', (req, res) => {
    const id = req.params.Id; // Assuming you pass the ID in the URL
    const sql = "DELETE FROM user WHERE Id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error deleting data" });
        }
        return res.json({ Message: "Data deleted successfully" });
    });
});


// Assuming you have already established a database connection (db)

app.put('/update/:Id', (req, res) => {
   
   // Assuming you're using JSON requests
    const sql = "UPDATE user SET Name = ?, Email = ? WHERE Id = ?";
    const Id = req.params.Id; // Assuming you pass the ID in the URL
    db.query(sql, [req.body.Name, req.body.Email, Id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error updating data" });
        }
        return res.json({ Message: "Data updated successfully" });
    });
});






app.listen(8081, () => {
    console.log("listening");   
});
