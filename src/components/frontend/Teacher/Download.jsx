import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import mammoth from "mammoth";
function Download() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const back = () => {
    navigate("/teacherDash");
  };
  const fetchData = () => {
    axios
      .get("http://localhost:8081/download-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const downloadData = async () => {
    if (data.length === 0) {
      console.error("Data is empty. Fetch data before downloading.");
      return;
    }
    // Get the original file name from the first item in your data
    const originalFileName = data[0].originalFileName;
    const htmlContent = data.content;

    // Convert the HTML content to a .docx file
    const result = await mammoth.convert({ html: htmlContent });
    const docxBlob = new Blob([result.arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Save the .docx file
    saveAs(docxBlob, originalFileName);
  };
  return (
    <div>
      <button onClick={back}>back</button>
      <button onClick={fetchData}>Fetch Data</button>
      {data.length > 0 && <button onClick={downloadData}>Download Data</button>}
      <div>
        {data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

// ...

export default Download;
