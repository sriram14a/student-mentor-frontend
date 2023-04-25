import { useEffect, useState } from "react";
import { API } from "./source.js";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function Student() {
  const [show, setShow] = useState(false);

  const Createstd = {
    display: show ? "block" : "none",
  };

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");

  const newStudent = {
    name: name,
    standard: standard,
    id: id,
    gender: gender,
  };

  const [students, setstudents] = useState([]);

  const getDetails = () => {
    fetch(`${API}/student`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setstudents(st));
  };

  useEffect(() => getDetails(), []);

  async function Createstudent(event) {
    event.preventDefault()
    const response = await fetch(`${API}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const data = await response.json();
    if (data.message === "Userid already taken") {
      alert("ID already taken try different one");
    }
    if (data.message === "ok") {
      getDetails();
    }
  }
  return (
    <div className="App p-2">
      <div className="d-flex justify-content-around">
        <h1 className="text-center">Our Students</h1>
        <div>
          <Button
            onClick={() => setShow(!show)}
            variant="contained"
            sx={{
              backgroundColor: "black",
              ":hover": { backgroundColor: "white", color: "black" },
              marginLeft: "95px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Create Student
          </Button>
        </div>
      </div>

      <div className="padding flex-wrap d-flex justify-content-around">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Standard</th>
              <th scope="col">Gender</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((sts, index) => (
              <tr key={sts.id}>
                <th scope="row">{sts.id}</th>
                <td>{sts.name}</td>
                <td>{sts.standard}</td>
                <td>{sts.gender}</td>
                <td>
                  <IconButton
                    color="error"
                    aria-label="deleteButton"
                    onClick={() => {
                      navigate(`/edit/${sts.id}`);
                    }}
                  >
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    color="error"
                    aria-label="deleteButton"
                    onClick={() => {
                      fetch(`${API}/student/${sts.id}`, {
                        method: "DELETE",
                      }).then(() => getDetails());
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
      <div style={Createstd} className="padding field-width">
        <div className="form-container p-3">
          <form onSubmit={Createstudent}>
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="Name"
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter Name"
              value={name}
            />
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="Standard"
              onChange={(event) => setStandard(event.target.value)}
              type="text"
              placeholder="Enter Standard"
              value={standard}
            />
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="id"
              onChange={(event) => setId(event.target.value)}
              type="text"
              placeholder="Enter Grade"
              value={id}
            />
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="Gender"
              onChange={(event) => setGender(event.target.value)}
              type="text"
              placeholder="Enter Gender"
              value={gender}
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
              Create Student
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
