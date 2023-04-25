import { useEffect, useState } from "react";
import { API } from "./source.js";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function Showstudents() {
  const navigate = useNavigate();

  const [mentor, setMentor] = useState([]);

  const getDetails = () => {
    fetch(`${API}/mentor`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((st) => setMentor(st));
  };

  useEffect(() => getDetails(), []);

  return (
    <div className="p-2">
      <div className="d-flex justify-content-around">
        <h3 className="text-center text-light p-2 m-2 bg-success rounded">
          View all the students assigned to mentor
        </h3>
      </div>
      <h3 className="pl-3 mt-3">Mentors</h3>
      <div className="padding flex-wrap d-flex justify-content-around">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Mentor Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Experience</th>
              <th scope="col">View Students</th>
            </tr>
          </thead>
          <tbody>
            {mentor.map((mtr) => (
              <tr key={mtr.id}>
                <th scope="row">{mtr.id}</th>
                <td>{mtr.name}</td>
                <td>{mtr.gender}</td>
                <td >
                  {mtr.experience}
                </td>
                <td>
                  <IconButton
                    onClick={() => {
                      navigate(`/allstudents/${mtr.id}`);
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
