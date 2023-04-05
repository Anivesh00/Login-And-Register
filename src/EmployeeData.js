import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function EmployeeData() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch("http://localhost:8000/employee");
      const data = await response.json();
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this employee?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(`http://localhost:8000/employee/${id}`, {
                method: "DELETE",
              });
              if (response.ok) {
                const updatedEmployees = employees.filter(
                  (employee) => employee.id !== id
                );
                setEmployees(updatedEmployees);
                toast.success('Employee deleted successfully!');
              } else {
                throw new Error("Unable to delete employee");
              }
            } catch (error) {
              console.error(error);
              toast.error('Error deleting employee.');
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = (id) => {
    // handle edit logic
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col" colSpan="2">
                Employee Id
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col" colSpan="2">
                Contact Number
              </th>
              <th scope="col">Country</th>
              <th scope="col" colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <th scope="row" colSpan="2">
                  {employee.id}
                </th>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.designation}</td>
                <td colSpan="2">{employee.phone}</td>
                <td>{employee.country}</td>
                <td colSpan="3">
                  <button onClick={() => handleEdit(employee.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeData;
