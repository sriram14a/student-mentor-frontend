import { useState } from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API } from "./source";

export function StudentMentor() {
  const [mentor, setMentor] = useState([]);
  const [student, setStudent] = useState([]);
  const [mentorid, setMentorid] = useState([]);
  const [studentid, setStudentid] = useState([]);
  const [response, setResponse] = useState([]);
  const [studentMentorid, setstudentMentorid] = useState([]);

  const navigate = useNavigate()
  async function CreateStudentMentor(event) {
    event.preventDefault();
    const response = await fetch(`${API}/studentmentor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mentorid: mentorid,
        studentid: studentid,
        id: studentMentorid,
      }),
    });
    const data = await response.json();
    if (data.message === "mentor dosen't exist") {
      getStudentMentor();
      alert("mentor dosen't exist");
    }
    if (data.message === "student dosen't exist") {
      alert("student dosen't exist");
      getStudentMentor();
    }
    if (data.message === "mentor already exist") {
      alert("try unique id");
    }
    if (data.message === "student already exist") {
      alert("student already asigned");
    } else if (data.status === "ok") {
      getStudentMentor();
    }
  }

  const getStudentMentor = () => {
    fetch(`${API}/studentmentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setResponse(res));
  };
  useEffect(() => getStudentMentor(), []);

  const getStudent = () => {
    fetch(`${API}/student`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setStudent(st));
  };
  useEffect(() => getStudent(), []);

  const getMentor = () => {
    fetch(`${API}/mentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setMentor(st));
  };
  useEffect(() => getMentor(), []);
  return (
    <div className="mt-4">
      <div className="d-flex flex-wrap justify-content-around">
        <div className="width-1">
          <h1 > Assign students to mentor</h1>
          <form  onSubmit={CreateStudentMentor}>
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="mentor id"
              onChange={(event) => setMentorid(event.target.value)}
              type="text"
              placeholder="Enter mentor id to assign"
              value={mentorid}
            />
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="student id"
              onChange={(event) => setStudentid(event.target.value)}
              type="text"
              placeholder="Enter student id to assign"
              value={studentid}
            />
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="unique id"
              onChange={(event) => setstudentMentorid(event.target.value)}
              type="text"
              placeholder="Enter unique id "
              value={studentMentorid}
            />

            <Button
              style={{
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "black",
              }}
              type="submit"
              variant="contained"
            >
              asign Student Mentor
            </Button>
          </form>
        </div>
        <div className="width-1">
          <h3 className="p-2 bg-success text-light rounded">Multiple Students Asigned to Mentors</h3>
          <div>
            <table className="table width">
              <thead className="thead-dark">
                <tr>
                  <th>id</th>
                  <th>Mentor</th>
                  <th>Student</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {response.map((re) => (
                  <tr key={re.id}>
                    <th scope="row">{re.id}</th>
                    <td className="d-flex justify-content-around align-items-center">{re.mentorname}<IconButton
                    color="error"
                    aria-label="deleteButton"
                    onClick={() => { navigate(`/studentmentor/${re.id}`) }}
                  >
                    <EditIcon sx={{color:"blue"}} />
                  </IconButton></td>
                    <td>{re.studentname}</td>
                    <td>
                      <IconButton
                        color="error"
                        aria-label="deleteButton"
                        onClick={() => {
                          fetch(
                            `${API}/studentmentor/${re.id}`,
                            {
                              method: "DELETE",
                            }
                          ).then(() => getStudentMentor());
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
<h3 className="text-center mt-1 bg-secondary text-light rounded p-2 m-2">Refer These details To asign Student-Mentor</h3>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="width-1 p-2">
          <h3>Mentor Details</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {mentor.map((mtr) => (
                <tr key={mtr.id}>
                  <th scope="row">{mtr.id}</th>
                  <td>{mtr.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="width-1 p-2">
          <h3>Student Details</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {student.map((st) => (
                <tr key={st.id}>
                  <th scope="row">{st.id}</th>
                  <td>{st.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
