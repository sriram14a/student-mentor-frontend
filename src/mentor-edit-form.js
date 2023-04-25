import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { API } from "./source";

export function EditMentor1() {
  const { mentorid } = useParams();

  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    fetch(`${API}/studentmentor/${mentorid}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setMentor(data);
      });
  }, []);

  return mentor ? <EditMentorForm1 mentor={mentor} /> : "Loading.....";
}

function EditMentorForm1({ mentor }) {
  const [mentorname, setMentorname] = useState(mentor.mentorname);
  const [mentoredit, setMentoredit] = useState([]);
  const navigate = useNavigate();

  async function Edited() {
    const response = await fetch(
      `${API}/studentmentor/${mentor.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ mentorname: mentorname }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.message === "mentor doesn't exist") {
      alert("mentor doesn't exist");
    } else if (data.message === "successfully updated") {
      navigate(-1);
    }
  }

  const getMentor = () => {
    fetch(`${API}/mentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setMentoredit(st));
  };
  useEffect(() => getMentor(), []);

  return (
    <div className="p-5 background d-flex flex-column">
      <TextField
        label="mentor name"
        variant="outlined"
        onChange={(event) => setMentorname(event.target.value)}
        type="text"
        placeholder="Enter mentor name you want to replace"
        value={mentorname}
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
            Edited();
          }}
        >
          SAVE
        </Button>
      </div>
      <div className="width p-2">
        <h3>Mentor Details</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {mentoredit.map((mtr) => (
              <tr key={mtr.id}>
                <th scope="row">{mtr.id}</th>
                <td>{mtr.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
