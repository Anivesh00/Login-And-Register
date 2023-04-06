import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import Home from "./Home";
import "react-confirm-alert/src/react-confirm-alert.css";

function EmployeeData() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
        navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch(
        "http://localhost:8000/employee?_sort=id&_order=asc"
      );
      const data = await response.json();
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    navigate("/employeedit/" + id);
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this employee?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:8000/employee/${id}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                const updatedEmployees = employees.filter(
                  (employee) => employee.id !== id
                );
                setEmployees(updatedEmployees);
                toast.success("Employee deleted successfully!");
              } else {
                throw new Error("Unable to delete employee");
              }
            } catch (error) {
              console.error(error);
              toast.error("Error deleting employee.");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleRead = (id) => {
    navigate("/employeeread/" + id);
  };

  return (
    <div>
      <Home />
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h2>Employee Listing</h2>
          </div>
          <div className="card-body">
            <div className="divbtn">
              <Link to="employeeupload" className="btn btn-success">
                Add New (+)
              </Link>
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Designation</td>
                  <td>Phone</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.phone}</td>
                    {/* <td>{employee.country}</td> */}
                    <td>
                      <button
                        onClick={() => handleRead(employee.id)}
                        className="btn btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="btn btn-success"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="btn btn-danger"
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                    </td>
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

export default EmployeeData;
