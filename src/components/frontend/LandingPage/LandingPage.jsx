import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./images/program.png";
import hero from "./images/hero-7.webp";
import "./LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
function LandingPage() {
  useEffect(() => {
    document.title = "CodePulse";
    return () => {
      // Cleanup, if necessary
    };
  }, []);
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
  const [isVisible, setIsVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > lastScrollPos) {
      setIsHeroVisible(true);
    }
    setLastScrollPos(currentScrollPos);
  };
  useEffect(() => {
    // Options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    // Callback function when the target becomes visible
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the 'animate' class when the target is visible
          entry.target.classList.add("animate");
          if (entry.target.classList.contains("homeContainer")) {
            setIsVisible(true);
          } else if (entry.target.classList.contains("hero")) {
            setIsHeroVisible(true);
          }
          // Stop observing once the animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    // Create an Intersection Observer with the callback and options
    const observer = new IntersectionObserver(callback, options);

    // Target the elements with the 'homeContainer' and 'hero' classes
    const targetHome = document.querySelector(".homeContainer");
    const targetHero = document.querySelector(".hero");

    // Start observing the targets
    if (targetHome && targetHero) {
      observer.observe(targetHome);
      observer.observe(targetHero);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (targetHome && targetHero) {
        observer.unobserve(targetHome);
        observer.unobserve(targetHero);
      }
    };
  }, []); // Run the effect only once on mount

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="landingContainer">
        <nav className="landingNavbar">
          <div className="logoContainer">
            <img src={logo} alt="Description of the image" className="logo" />
            <h3 className="logoName">CodePulse</h3>
          </div>
          <div>
            <ul>
              <li className="landingNavLi">
                <Link className="landingNavButton" onClick={scrollToHome}>
                  Home
                </Link>
              </li>
              <li className="landingNavLi">
                <Link className="landingNavButton" onClick={scrollToAbout}>
                  About
                </Link>
              </li>
              <li className="landingNavLi">
                <Link className="landingNavButton" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="contentContainer">
          <div
            id="home"
            className={`homeContainer${isVisible ? " animate" : ""}`}
          >
            <img
              src={hero}
              id="hero"
              alt="Description of the image"
              className={`hero${isHeroVisible ? " animate" : ""}`}
            />
            <h1 className="text-white">Empowering Coders,</h1>
            <h1 style={{ marginLeft: "150px", color: "white" }}>
              Unleashing Innovation
            </h1>
            <h5 className="text-white">
              Your Gateway to Mastery in the Digital Realm.
            </h5>
          </div>
          <div className="secondContent">
            <h1 style={{ marginTop: "80px", color: "white" }}>
              Embark on your coding journey with confidence,
            </h1>
            <h1 className="text-white">
              every keystroke brings you closer to digital mastery
            </h1>
            <p className="text-white">
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
              CodePulse is here to guide you. Embark on a journey of continuous
              learning, discovery, and personal growth.
            </p>
          </div>
          <div className="aboutContainer" id="contact">
            <h2>Contact</h2>
            <FontAwesomeIcon
              icon={faEnvelope}
              size="xl"
              style={{ color: "#ffffff" }}
            />
            <a href="">educational@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
