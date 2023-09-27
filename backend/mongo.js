const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student');

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    email: String,
    dateOfBirth: Date,
    gender: String
});
const Student = mongoose.model('Student', studentSchema);

const subjectSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    Fullname: String,
    react: Number,
    JavaScript: Number,
    java: Number,
    node: Number
});
const Subject = mongoose.model('Subject', subjectSchema);

// Get all students
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        return res.json(students);
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error inside server" });
    }
});

// Insert a new student
app.post('/insert', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        return res.json({ Message: "Data inserted successfully" });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error inserting data" });
    }
});

// Delete a student
app.delete('/delete/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        await Student.findByIdAndDelete(id);
        return res.json({ Message: "Data deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error deleting data" });
    }
});

app.get('/update/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ Message: "Student not found" });
        }
        return res.json(student);
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error inside server" });
    }
});

// Update a student
app.put('/updatee/:_id', async (req, res) => {
    try {
        const id = req.params._id;
   
        await Student.findByIdAndUpdate(id, req.body);
        return res.json({ Message: "Data updated successfully" });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error updating data" });
    }
});


app.get('/result/', async (req, res) => {
    try {
        const students = await Student.find();
        return res.json(students);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Error inside server" });
    }
});

// Assuming you have the Student model defined as described earlier

// Get student by ID
app.get('/result/:_id', async (req, res) => {
    try {
        const id = req.params._id;
        const student = await Student.findById(id);
        
        if (!student) {
            return res.status(404).json({ Message: "Student not found" });
        }

        return res.json(student);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Error inside server" });
    }
});


// Insert student result
app.post('/insert/result', async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        return res.json({ Message: "Data inserted successfully into subject table" });
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error inserting data into subject table" });
    }
});

// Show student result
app.get('/showresult/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const results = await Subject.find({ student_id: studentId });
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.json({ Message: "Error inside server" });
    }
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
