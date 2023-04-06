import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Home from "./Home";

const EmpolyeeRead = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  return (
    <div>
      <Home />

      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title" style={{ textAlign: "center" }}>
            <h2>Employee Details</h2>
          </div>
          <div className="card-body"></div>

          {empdata && (
            <div>
              <h2>
                The Employee name is : <b>{empdata.name}</b> ({empdata.id})
              </h2>
              <h3>Designation : {empdata.designation}</h3>
              <h6>Gender : {empdata.gender}</h6>
              <h3>Contact Details</h3>
              <h5>Email is : {empdata.email}</h5>
              <h5>Phone is : {empdata.phone}</h5>
              <h6>Address is : {empdata.address}</h6>
              <h6>Country is : {empdata.country}</h6>
              <Link className="btn btn-danger" to="/employeedata">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
            </div> */}
    </div>
  );
};
export default EmpolyeeRead;
