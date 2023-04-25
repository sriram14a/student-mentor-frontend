import { useEffect, useState } from "react";
import { API } from "./source.js";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export function Mentor() {
  const [show, setShow] = useState(false);

  const Createmtr = {
    display: show ? "block" : "none",
  };

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");

  const newMentor = {
    name: name,
    id: id,
    gender: gender,
    experience: experience,
  };

  const [mentor, setMentor] = useState([]);

  const getDetails = () => {
    fetch(`${API}/mentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setMentor(st));
  };

  useEffect(() => getDetails(), []);

  async function CreateMentor(event) {
    event.preventDefault()
    const response = await fetch(`${API}/mentor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMentor),
    });
    const data = await response.json();
    if (data.message === "Userid already taken") {
      alert("ID already taken try different one");
    }
    if (data.message === "ok") {
      getDetails()
    }
  }

  return (
    <div className="p-2">
      <div className="d-flex justify-content-around">
        <h1 className="text-center">Our Mentors</h1>
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
            Create Mentor
          </Button>
        </div>
      </div>

      <div className="padding flex-wrap d-flex justify-content-around">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Experience</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {mentor.map((mtr) => (
              <tr key={mtr.id}>
                <th scope="row">{mtr.id}</th>
                <td>{mtr.name}</td>
                <td>{mtr.gender}</td>
                <td>{mtr.experience}</td>
                <td>
                  <IconButton
                    color="error"
                    aria-label="deleteButton"
                    onClick={() => {
                      navigate(`/mentor/edit/${mtr.id}`);
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
                      fetch(`${API}/mentor/${mtr.id}`, {
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
      <div style={Createmtr} className="padding field-width">
        <div className="form-container p-3">
          <form onSubmit={CreateMentor}>
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
              label="id"
              onChange={(event) => setId(event.target.value)}
              type="text"
              placeholder="Enter id"
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
            <TextField
              style={{
                backgroundColor: "white",
                margin: "10px",
                width: "100%",
                borderRadius: "10px",
              }}
              required
              label="experience"
              onChange={(event) => setExperience(event.target.value)}
              type="text"
              placeholder="Enter Gender"
              value={experience}
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
              Create Mentor
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
