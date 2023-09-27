
import './App.css'; 
import StudentRegister from './Student_Registration';
import Navbar from './Navbar';
import Students from './Student_list';
import Update from './update';
import  Result from './Student_Result'
import Showresult from './Showresult';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
 
  return (<>
  
    <div className="container my-3"/>
    <Router>

        <Routes>
    
            <Route exact path="/" element={<Navbar title="Student"/>}>
              <Route exact path="/Register"  element={< StudentRegister/>} />
              <Route exact path="/list"  element={<Students />} />
              <Route exact path="/update/:_id" element={<Update />}/>
              <Route exact path="/Add/:_id" element={<Result/> } />
              <Route exact path="/Showresult/:_id" element={<Showresult  />} />

            </Route>
        </Routes>
    </Router>
    
    

    

    <div/>
  </>

  );
}
export default App;