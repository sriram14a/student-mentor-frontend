import { Routes, Route } from "react-router-dom";
import { Home } from "./home";
import { Student } from "./createStudent";
import { Mentor } from "./createMentor";
import "./App.css";
import { StudentMentor } from "./student-mentor";
import { Editstudent } from "./edit-student";
import { EditMentor } from "./edit-mentor";
import { EditMentor1 } from "./mentor-edit-form"
import { EditoneMentor1 } from "./editone-mentor";
import { Navbar } from "./navbar";
import { OneStudentOneMentor } from "./one-std-men";
import { Showstudents } from "./show-student";
import { AllStudents } from "./all-students";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/studentmentor" element={<StudentMentor />} />
        <Route path="/edit/:studentid" element={<Editstudent />} />
        <Route path="/mentor/edit/:mentorid" element={<EditMentor />} />
        <Route path="/studentmentor/:mentorid" element={<EditMentor1 />} />
        <Route path="/onestudentmentor" element={<OneStudentOneMentor />} />
        <Route path="/onestudentmentor/:mentorid" element={<EditoneMentor1 />} />
        <Route path="/showallstudents" element={< Showstudents/>} />
        <Route path="/allstudents/:mentorid" element={< AllStudents/>} />
      </Routes>
    </div>
  );
}

export default App;
