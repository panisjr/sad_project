import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
// import myImage from "./images/happy-student-posing-with-hands-up.jpg";
function LandingPage() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToHome = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });

      // Add a unique identifier to an element that becomes visible after smooth scroll
      const scrollCompletionIndicator = document.getElementById(
        "scrollCompletionIndicator"
      );
      if (scrollCompletionIndicator) {
        scrollCompletionIndicator.style.display = "block";
      }
    }
  };
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <>
      <div className="landingContainer">
        <nav className="landingNavbar">
          <ul>
            <li className="landingNavLi">
              <Link className="landingNavButton" onClick={scrollToHome}>
                Home
              </Link>
            </li>
            <li className="landingNavLi">
              <Link
                className="aboutNavButton landingNavButton"
                onClick={scrollToAbout}
              >
                About
              </Link>
            </li>
          </ul>
          <ul>
            <li className="landingNavLi">
              <Link className="landingNavButton" to="/login">
                Login
              </Link>
            </li>
            <li className="landingNavLi">
              <Link to="/adminLoginPage" className="landingNavButton">
                Admin
              </Link>
            </li>
          </ul>
        </nav>
        <div className="contentContainer">
          <div id="home">
            <h2>Title for motivation</h2>
            <p>
              Education is the key that unlocks the doors to a world of endless
              possibilities. Each page you turn, each equation you solve, and
              each concept you grasp brings you one step closer to your dreams.
              Embrace the journey of learning, for it is the foundation upon
              which your future success will be built. As you study, remember
              that every ounce of effort you invest in your education is an
              investment in yourself. The knowledge you gain today will be the
              fuel that propels you toward the extraordinary achievements of
              tomorrow. So, study with passion, persevere through challenges,
              and let the pursuit of knowledge be the melody that orchestrates
              the symphony of your success.
            </p>
          </div>
          <div className="secondContent">
            {/* <div>
              <img src={myImage} alt="Description of the image" />
            </div> */}

            <h2>Title for motivation</h2>
            <p>
              Education is the key that unlocks the doors to a world of endless
              possibilities. Each page you turn, each equation you solve, and
              each concept you grasp brings you one step closer to your dreams.
              Embrace the journey of learning, for it is the foundation upon
              which your future success will be built. As you study, remember
              that every ounce of effort you invest in your education is an
              investment in yourself. The knowledge you gain today will be the
              fuel that propels you toward the extraordinary achievements of
              tomorrow. So, study with passion, persevere through challenges,
              and let the pursuit of knowledge be the melody that orchestrates
              the symphony of your success.
            </p>
          </div>
          <h2>Title for motivation</h2>
          <p>
            Education is the key that unlocks the doors to a world of endless
            possibilities. Each page you turn, each equation you solve, and each
            concept you grasp brings you one step closer to your dreams. Embrace
            the journey of learning, for it is the foundation upon which your
            future success will be built. As you study, remember that every
            ounce of effort you invest in your education is an investment in
            yourself. The knowledge you gain today will be the fuel that propels
            you toward the extraordinary achievements of tomorrow. So, study
            with passion, persevere through challenges, and let the pursuit of
            knowledge be the melody that orchestrates the symphony of your
            success.
          </p>
          <div className="aboutContainer" id="about">
            <h2>About</h2>
            <p>
              Join Us on the Learning Journey Whether you're taking your first
              step into the world of knowledge or seeking advanced expertise,
              [Your Website Name] is here to guide you. Embark on a journey of
              continuous learning, discovery, and personal growth.
            </p>
            <a href="">educational@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
