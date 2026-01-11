import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const API = "http://localhost:5001/api/employees";

  const loadEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const addOrUpdateEmployee = async () => {
    if (!name || !role || !salary) {
      alert("All fields required");
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, { name, role, salary });
      showMessage("Employee updated successfully ✅");
    } else {
      await axios.post(API, { name, role, salary });
      showMessage("Employee added successfully ✅");
    }

    setName("");
    setRole("");
    setSalary("");
    setEditId(null);
    loadEmployees();
  };

  const editEmployee = (emp) => {
    setName(emp.name);
    setRole(emp.role);
    setSalary(emp.salary);
    setEditId(emp._id);
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await axios.delete(`${API}/${id}`);
    showMessage("Employee deleted ❌");
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center" }}>Employee Management System</h2>

        {message && <div style={messageStyle}>{message}</div>}

        <input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addOrUpdateEmployee} style={buttonStyle}>
          {editId ? "Update Employee" : "Add Employee"}
        </button>

        <hr />

        <h3>Employee List</h3>

        {employees.map((emp) => (
          <div key={emp._id} style={employeeCard}>
            <strong>{emp.name}</strong>
            <div>Role: {emp.role}</div>
            <div>Salary: ₹{emp.salary}</div>

            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => editEmployee(emp)}
                style={{ ...smallBtn, background: "#ffc107" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteEmployee(emp._id)}
                style={{ ...smallBtn, background: "#dc3545", marginLeft: "8px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== Styles ===== */

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f6f8",
  display: "flex",
  justifyContent: "center",
  paddingTop: "40px",
  fontFamily: "Arial",
};

const cardStyle = {
  width: "420px",
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "10px",
};

const employeeCard = {
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "10px",
  marginBottom: "8px",
  background: "#fafafa",
};

const smallBtn = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "4px",
  color: "#fff",
  cursor: "pointer",
};

const messageStyle = {
  background: "#d4edda",
  color: "#155724",
  padding: "8px",
  borderRadius: "5px",
  marginBottom: "10px",
  textAlign: "center",
};

export default App;
