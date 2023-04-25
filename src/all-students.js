import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "./source";

export function AllStudents() {
  const { mentorid } = useParams();
  const [response, setResponse] = useState([]);

  const getStudentMentor = () => {
    fetch(`${API}/allstudents/${mentorid}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => setResponse(res));
  };
  useEffect(() => getStudentMentor(), []);
  return response.length === 0 ? (
    "NO students were assigned"
  ) : (
    <Display response={response} />
  );
}

export function Display({ response }) {
  return (
    <div className="mt-4">
      <h3 className="text-center text-light bg-success p-2 m-2 rounded">
        Students assigned to {response[0].mentorname}{" "}
      </h3>
      <div className="d-flex flex-wrap justify-content-around">
        <div className="width p-2">
          <div>
            <table className="table width">
              <thead className="thead-light">
                <tr>
                  <th>id</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {response.map((re) => (
                  <tr key={re.id}>
                    <th scope="row">{re.id}</th>
                    <td>{re.studentname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
