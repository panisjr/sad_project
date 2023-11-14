import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#ffffff",
    color: "darkblue",
    height: "100%",
    width: "1358px",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  leftSection: {
    flex: "1",
    padding: "20px",
    display: "inline",
    backgroundColor: "darkblue",
    flexDirection: "column",
    justifyContent: "center", // Align topic buttons to the top
    alignItems: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    overflowY: "auto", // Add vertical scroll for many topics
  },
  rightSection: {
    flex: "3",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start", // Align materials to the top
  },
  topicButtonContainer: {
    display: "flex",
    flexDirection: "row", // Change to row to align upload button to the right
    alignItems: "center",
    width: "100%", // Make the container full-width
    marginBottom: "10px", // Add some space between topics
  },
  topicButton: {
    margin: "10px",
    padding: "10px 20px", // Uniform padding for all buttons
    fontSize: "16px",
    cursor: "pointer",
    width: "100%", // Make topic buttons full-width
    backgroundColor: "#303097",
    color: "white",
  },
  materialsList: {
    marginTop: "20px",
  },
};

function LNUMaterials() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [materials, setMaterials] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server using Axios
    axios
      .get("http://localhost:8081/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);

    // Simulate fetching materials for the selected topic
    const fetchedMaterials = simulateFetchMaterials(topic);
    setMaterials(fetchedMaterials);
  };

  const simulateFetchMaterials = (topic) => {
    // Simulate materials data for different topics
    const materialsData = {
      "Intro to Programming with Java": [
        { title: "Material 1", description: "Description 1", link: "link1" },
        { title: "Material 2", description: "Description 2", link: "link2" },
      ],
      "Java Data Types": [
        { title: "Material 3", description: "Description 3", link: "link3" },
        { title: "Material 4", description: "Description 4", link: "link4" },
      ],
      // Add materials data for other topics as needed
    };

    return materialsData[topic] || [];
  };

  const renderTopicButtons = () => {
    const topics = [
      "Intro to Programming with Java",
      "Java Data Types",
      "Java Variables",
      "Java Expressions",
      "Java Operators and Decision Constructs",
      "Java Loops/Iterations",
      "Java Intro to Arrays",
      "Java Methods",
      "Intro to Programming with Python",
      "Python Data Types",
      "Python Variables",
      "Python Expressions",
      "Python Operators and Decision Constructs",
      "Python Loops/Iterations",
      "Python Intro to Arrays",
      "Python Methods",
      // Add more topics here if needed
    ];

    return topics.map((topic) => (
      <div key={topic} style={styles.topicButtonContainer}>
        <button
          style={styles.topicButton}
          onClick={() => handleTopicClick(topic)}
        >
          {topic}
        </button>
      </div>
    ));
  };

  const renderMaterials = () => {
    if (!selectedTopic) {
      return <div>Select a topic to view materials.</div>;
    }

    return (
      <div style={styles.materialsList}>
        <h3>{selectedTopic}</h3>
        {materials.map((material, index) => (
          <div>
            <table
              className="table table-bordered table-striped"
              style={{
                width: "700px",
                marginLeft: "21%",
              }}
            >
              <thead>
                <tr>
                  <th>File Name</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr className="text-left">
                    <td
                      key={item.filename}
                      className="d-flex justify-content-between"
                    >
                      <a
                        href={`backend/uploads/${item.filename}`}
                        download={item.filename}
                      >
                        {item.filename}
                      </a>
                      <button
                        className="btn btn-outline-success"
                        onClick={downloadPage}
                      >
                        Download
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => handleDelete(item.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div>
          <Link to="/studentDash" className="btn btn-outline-primary">
            <span class="material-symbols-outlined">back</span>
          </Link>
          <h3 className="text-white">Computer Programming</h3>
        </div>
        {renderTopicButtons()}
      </div>
      <div style={styles.rightSection}>{renderMaterials()}</div>
    </div>
  );
}

export default LNUMaterials;
