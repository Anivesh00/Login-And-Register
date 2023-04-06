import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "./Home";

const EmployeeEdit = () => {
  const { empid } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        designantionchange(resp.designation);
        phonechange(resp.phone);
        countrychange(resp.country);
        addresschange(resp.address);
        genderchange(resp.gender);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [designation, designantionchange] = useState("Associate Engineer");
  const [phone, phonechange] = useState("");
  const [country, countrychange] = useState("india");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (id === null || id === '') {
      isproceed = false;
      errormessage += " Emloyeeid";
    }
    
    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (designation === null || designation === "") {
        isproceed = false;
        errormessage += " designation";
      }
      

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
      if(id.length>3 && id.length <=6){
      }else {
        isproceed = false;
        toast.warning("Employee Id must be greater then 3 and less then 7");
      }
    }

    
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    // const empid = document.querySelector("#empid").value;
    let regobj = { id, name, email,designation, phone, country, address, gender };
    if (IsValidate()) {
      fetch("http://localhost:8000/employee/"+empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(regobj),
          })
          .then((res) => {
            // if (res.ok) {
              toast.success("Employee Details Updated successfully.");
              navigate("/employeedata");
          })
          .catch((err) => {
            toast.error("Failed :" + err.message);
          });
        }
}

  return (
    <div>
      <Home />
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          {/*  */}
          <div className="card">
            <div className="card-header">
              <h1>Employee Edit page</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label title="You can't update this create new Entry after deleting this">
                      Employee Id <span className="errmsg">*</span>
                    </label>
                    <input 
                    title="You can't update this create new Entry after deleting this"
                      value={id}
                      type="number"
                      onChange={(e) => idchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => namechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label title="Select your Designation">
                      Designation <span className="errmsg">*</span>
                    </label>
                    <select
                      value={designation}
                      onChange={(e) => designantionchange(e.target.value)}
                      className="form-control"
                      title="Select Your Designation"
                    >
                      {/* <option value="">Select your Designation</option> */}
                      <option value="Associate Engineer">
                        Associate Engineer
                      </option>
                      <option value="Commando Associate">
                        Commando Associate Engineer
                      </option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone <span className="errmsg"></span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => phonechange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country <span className="errmsg">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => countrychange(e.target.value)}
                      className="form-control"
                    >
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="singapore">Singapore</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => addresschange(e.target.value)}
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={(e) => genderchange(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                    ></input>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">
                Update
              </button>{" "}
              |
              <Link to={"/employeedata"} className="btn btn-danger">
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
