import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { API } from "./source";

export function EditMentor() {
  const { mentorid } = useParams();

  const [mentor, setMentor] = useState(null);
  useEffect(() => {
    fetch(`${API}/mentor/${mentorid}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setMentor(data);
      });
  }, []);
  return mentor ? <EditMentorForm mentor={mentor} /> : "Loading.....";
}

function EditMentorForm({ mentor }) {
  const [name, setName] = useState(mentor.name);
  const [experience, setExperience] = useState(mentor.experience);
  const [gender, setGender] = useState(mentor.gender);
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
        label="experience"
        variant="outlined"
        onChange={(event) => setExperience(event.target.value)}
        type="text"
        placeholder="Enter Experience"
        value={experience}
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
              color: "black",
              backgroundColor: "white",
            },
            borderRadius: "10px",
            margin: "10px",
          }}
          onClick={() => {
            const updatedstudent = {
              name: name,
              experience: experience,
              gender: gender,
            };

            fetch(`${API}/mentor/${mentor.id}`, {
              method: "PUT",
              body: JSON.stringify(updatedstudent),
              headers: { "Content-Type": "application/json" },
            })
              .then((data) => data.json())
              .then(() => navigate(-1));
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}
