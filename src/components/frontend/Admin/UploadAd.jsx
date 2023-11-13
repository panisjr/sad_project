//C:\react-js\my-app\src\App.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [salary, setSalary] = useState("");
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");

  // To navigate users to different pages
  const navigateTo = useNavigate();
  const upload = () => {
    const formData = new FormData();
    // formData.append("name", name);
    // formData.append("email", email);
    // formData.append("address", address);
    // formData.append("salary", salary);
    formData.append("file", file);
    axios
      .post("http://localhost:8081/upload", formData)
      .then((response) => {
        console.log(response);
        if (response.data.Status === "Success") {
          setMsg("File Successfully Uploaded");
        } else {
          setMsg("Error");
        }

        setTimeout(() => {
          navigateTo("/teacherAd");
        }, 1000); // 2000 milliseconds = 2 seconds
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="container-fluid m-5">
      <div className="row" style={{ width: "500px" }}>
        {/* <div className="col-12">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter salary"
            autoComplete="off"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div> */}

        <div className="col-12 d-block align-items-center justify-content-center p-5">
          <div>
            <label className="form-label">Upload File</label>
            <input
              className="form-control"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={upload}
            style={{ marginTop: "20px" }}
          >
            Upload
          </button>
          <button className="btn btn-danger ms-2" style={{ marginTop: "20px" }}>
            Cancel
          </button>
          <h1
            style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}
          >
            {msg}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
