import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="p-2 mr-5 ml-5">
      <div className="d-flex justify-content-between">
        <div>
        <button className="btn" onClick={() => navigate("/")}>
              Dashboard{" "}
            </button>
        </div>
        <div>
          <div >
            <button className="btn" onClick={() => navigate("/student")}>
              Students{" "}
            </button>
            <button className="btn" onClick={() => navigate("/mentor")}>
              Mentors{" "}
            </button>
            <button className="btn" onClick={() => navigate("/studentmentor")}>
              student-mentor{" "}
            </button>
            <button className="btn" onClick={() => navigate("/onestudentmentor")}>
              ONE-ONE{" "}
            </button>
            <button className="btn" onClick={() => navigate("/showallstudents")}>
              All-students{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
