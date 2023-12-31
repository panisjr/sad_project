import React, { useState } from "react";
import { Link } from "react-router-dom";
const styles = {
  container: {
    display: "flex",
    backgroundColor: "#ffffff",
    color: "black",
    height: "100vh",
    width: "1340px",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  leftSection: {
    color: "white",
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
  materialsList: {
    marginTop: "20px",
  },
  scrollbar: {
    width: "2px", // Set the width of the scrollbar
    background: "#888", // Background color of the scrollbar track
    borderRadius: "4px", // Rounded corners for the track
  },
  thumb: {
    background: "#555", // Color of the scrollbar thumb
    borderRadius: "4px", // Rounded corners for the thumb
  },
};

function JavaDashAdmin() {
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
        {
          title: "What is Java?",
          description: `Popular computer language Java was developed in 1995.
        Java is used by more than 3 billion devices worldwide and is owned by Oracle.
        `,
          link: "intro",
        },
      ],
      "Java Data Types": [
        {
          title: "There are two groups of data types",
          description:
            "Basic data types, such as bytes, short ints, long ints, floats, doubles, booleans, and characters",
          link: "data",
        },
      ],
      "Java Variables": [
        {
          title: "Data values are kept in variables as storage.",
          description:
            "There are various sorts of variables in Java, including:",
          link: "variables",
        },
      ],
      "Java Expressions": [
        {
          title: "Expressions accomplish what a Java application would do...",
          description:
            "An expression is a collection of variables, operators...",
          link: "expression",
        },
      ],
      "Java Operators and Decision Constructs": [
        {
          title: "What Do Java Operators Do?",
          description: "The symbols used in Java to carry out particular... ",
          link: "operators_decision",
        },
      ],
      "Java Loops/Iterations": [
        {
          title: "The ability to execute a collection of instructions...",
          description: "While loop: Based on a specified Boolean...",
          link: "loops_iteration",
        },
      ],
      "Java Intro to Arrays": [
        {
          title: "There are two groups of data types",
          description:
            "Basic data types, such as bytes, short ints, long ints, floats, doubles, booleans, and characters",
          link: "arrays",
        },
      ],
      "Java Methods": [
        {
          title: "There are two groups of data types",
          description:
            "Basic data types, such as bytes, short ints, long ints, floats, doubles, booleans, and characters",
          link: "meth ",
        },
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
      </div>
    ));
  };

  const renderMaterials = () => {
    if (!selectedTopic) {
      return <div>Select a topic to view materials.</div>;
    }

    return (
      <>
        <Link to="/studentAd" className="btn btn-outline-primary mt-1 ">
          Home
        </Link>
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
      </>
    );
  };

  return (
    <>
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
    </>
  );
}
export default JavaDashAdmin;
