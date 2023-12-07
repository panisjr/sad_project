//C:\react-js\my-app\src\App.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [msg, setMsg] = useState("");

  // To navigate users to different pages
  const navigateTo = useNavigate();
  const cancel = () => {
    navigateTo("/teacherDash");
  };
  const upload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    axios
      .post("http://localhost:8081/upload", formData)
      .then((response) => {
        if (response.data.status === "Success") {
          setMsg("File Successfully Uploaded");
          setTimeout(() => {
            navigateTo("/teacherDash");
          }, 1000); // 2000 milliseconds = 2 seconds
        } else {
          setMsg("Error");
        }
      })
      .catch((er) => console.log(er));
  };
  // const Result = ({ status }: { status: string }) => {
  //   if (status === "success") {
  //     return <p>✅ File uploaded successfully!</p>;
  //   } else if (status === "fail") {
  //     return <p>❌ File upload failed!</p>;
  //   } else if (status === "uploading") {
  //     return <p>⏳ Uploading selected file...</p>;
  //   } else {
  //     return null;
  //   }
  //   <Result status={status} />
  //   const [status, setStatus] = useState<
  //   "initial" | "uploading" | "success" | "fail"
  // >("initial");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setStatus("initial");
  //     setFile(e.target.files[0]);
  //   }
  // };

  // const handleUpload = async () => {
  //   if (file) {
  //     setStatus("uploading");

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //       const result = await fetch("https://httpbin.org/post", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await result.json();

  //       console.log(data);
  //       setStatus("success");
  //     } catch (error) {
  //       console.error(error);
  //       setStatus("fail");
  //     }
  //   }
  // };

  return (
    <div className="container-fluid m-5">
      <div className="row" style={{ width: "500px" }}>
        <div className="col-12 d-block align-items-center justify-content-center p-5">
          <form onSubmit={upload}>
            <div>
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="upload">
                Upload File
              </label>
              <input
                className="form-control"
                type="file"
                id="upload"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Upload
            </button>
            <button
              className="btn btn-danger ms-2"
              style={{ marginTop: "20px" }}
              onClick={cancel}
            >
              Cancel
            </button>
            <h1
              style={{
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
                color: "black",
              }}
            >
              {msg}
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
