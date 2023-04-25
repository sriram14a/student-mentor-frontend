import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { API } from "./source";


export function Editstudent() {
    const { studentid } = useParams();

  const [student, setStudent] = useState(null);
  useEffect(() => {
    fetch(`${API}/student/${studentid}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((bkdata) => {
        setStudent(bkdata);
      });
  }, []);
  return student ? <EditStudentForm student={student} /> : "Loading.....";
}

function EditStudentForm({ student }) {
    const [name, setName] = useState(student.name);
    const [standard, setStandard] = useState(student.standard);
    const [gender, setGender] = useState(student.gender);
  const navigate = useNavigate();

  return (
    <div className="p-5 background d-flex flex-column">
      <TextField
        sx={{ backgroundColor: "white", borderRadius: "10px", margin: "10px" }}
        label="Name"
        variant="outlined"
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter name"
        value={name}
      />
      <TextField
        label="standard"
        variant="outlined"
        onChange={(event) => setStandard(event.target.value)}
        type="text"
        placeholder="Enter standard"
        value={standard}
        sx={{ backgroundColor: "white", borderRadius: "10px", margin: "10px" }}
      />
      <TextField
        label="gender"
        variant="outlined"
        onChange={(event) => setGender(event.target.value)}
        type="text"
        placeholder="Enter gender"
        value={gender}
        sx={{ backgroundColor: "white", borderRadius: "10px", margin: "10px" }}
      />
      <div className="d-flex">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            "&:hover": {
                border: "transparent",
                color: 'black',
                backgroundColor: 'white'},
            borderRadius: "10px",
            margin: "10px",
          }}
          onClick={() => {
            const updatedstudent = {
              name: name,
              standard:standard,
              gender: gender
            };

            fetch(`${API}/student/${student.id}`, {
              method: "PUT",
              body: JSON.stringify(updatedstudent),
              headers: { "Content-Type": "application/json" },
            })
              .then((data) => data.json())
              .then(() => 
                  navigate(-1)
                );
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
