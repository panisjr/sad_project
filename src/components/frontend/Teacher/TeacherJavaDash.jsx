import React, { useState } from "react";

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#ffffff",
    color: "white",
    height: "100vh",
    width: "1340px",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  leftSection: {
    flex: "1",
    padding: "20px",
    display: "flex",
    backgroundColor: "darkblue",
    flexDirection: "column",
    justifyContent: "flex-start", // Align topic buttons to the top
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
  uploaderContainer: {
    flex: "1", // Make the upload button take remaining space
    display: "flex",
    justifyContent: "flex-end", // Align upload button to the right
    alignItems: "center",
  },
  fileInputLabel: {
    backgroundColor: "darkblue",
    color: "white",
    padding: "5px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  fileInput: {
    display: "none",
  },
  materialsList: {
    marginTop: "20px",
  },
};

function TeacherJavaDash() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [materials, setMaterials] = useState([]);

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
        <div style={styles.uploaderContainer}>
          <label style={styles.fileInputLabel}>
            Upload Material
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt"
              style={styles.fileInput}
              onChange={(e) => handleFileUpload(e, topic)}
            />
          </label>
        </div>
      </div>
    ));
  };

  const handleFileUpload = (e, topic) => {
    const file = e.target.files[0];

    // Simulate storing the uploaded file in the state (replace with your logic)
    if (file) {
      console.log(`Uploading file for topic: ${topic}`);
      console.log(`File name: ${file.name}`);
    }
  };

  const renderMaterials = () => {
    if (!selectedTopic) {
      return <div>Select a topic to view materials.</div>;
    }

    return (
      <div style={styles.materialsList}>
        <h3>{selectedTopic}</h3>
        {materials.map((material, index) => (
          <div key={index}>
            <p>{material.title}</p>
            <p>{material.description}</p>
            <a href={material.link}>View Material</a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.title}>
          {" "}
          <h3>Java - Computer Programming I</h3>
        </div>
        {renderTopicButtons()}
      </div>
      <div style={styles.rightSection}>{renderMaterials()}</div>
    </div>
  );
}

export default TeacherJavaDash;
