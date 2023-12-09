import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./images/program.png";
import hero from "./images/hero-7.webp";
import down from "./images/down.png";
import down1 from "./images/down (1).png";
import down2 from "./images/down (2).png";
import circle from "./images/circle.png";
import circle1 from "./images/circle (1).png";
import onlinetest from "./images/onlinetest.png";
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
              <li className="landingNavLi landingNavButton">|</li>
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
            <div>
              <img
                src={hero}
                id="hero"
                alt="Description of the image"
                className={`hero${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={down}
                id="down"
                alt="Inverted triangle"
                className={`down${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={down1}
                id="down1"
                alt="Inverted triangle"
                className={`down1${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={down1}
                id="down1small"
                alt="Inverted triangle"
                className={`down1small${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={down2}
                id="down2"
                alt="Inverted triangle"
                className={`down2${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={down2}
                id="down2small"
                alt="Inverted triangle"
                className={`down2small${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={circle}
                id="circle"
                alt="Inverted triangle"
                className={`circle${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={circle}
                id="circlesmall"
                alt="Inverted triangle"
                className={`circlesmall${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={circle1}
                id="circle1"
                alt="Inverted triangle"
                className={`circle1${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={circle1}
                id="circle1small"
                alt="Inverted triangle"
                className={`circle1small${isHeroVisible ? " animate" : ""}`}
              />
              <img
                src={onlinetest}
                id="onlinetest"
                alt="A guy sitting inside a monitor"
                className={`onlinetest${isHeroVisible ? " animate" : ""}`}
              />
            </div>
            <h1 className="text-white">Empowering Coders,</h1>
            <h1 style={{ marginLeft: "150px", color: "white", zIndex: "1" }}>
              Unleashing Innovation
            </h1>
            <h5 className="text-white">
              Your Gateway to Mastery to becoming a Skilled Programmer.
            </h5>
          </div>
          <div className="secondContent">
            <h1 style={{ marginTop: "80px", color: "white" }}>
              Embark on your coding journey with confidence,
            </h1>
            <h1 className="text-white">
              every keystroke brings you closer to digital mastery
            </h1>
            <h5
              className="text-white text-center w-50"
              style={{
                marginTop: "100px",
                marginBottom: "150px",
                marginRight: "80px",
              }}
            >
              Education is the key that unlocks the doors to a world of endless
              possibilities. Each page you turn, each equation you solve, and
              each concept you grasp brings you one step closer to your dreams.
              Embrace the journey of learning, for it is the foundation upon
              which your future success will be built.
              {/* As you study, remember
              that every ounce of effort you invest in your education is an
              investment in yourself. The knowledge you gain today will be the
              fuel that propels you toward the extraordinary achievements of
              tomorrow. So, study with passion, persevere through challenges,
              and let the pursuit of knowledge be the melody that orchestrates
              the symphony of your success. */}
            </h5>
          </div>
          <div className="aboutContainer" id="about">
            <h2>About us</h2>
            <p>
              At Code Pulse, we understand that the first steps in programming
              can be both thrilling and challenging. That's why we've curated a
              comprehensive and beginner-friendly environment to nurture your
              skills and foster a love for coding.
            </p>
            <h5 className="text-white">What You'll Learn</h5>
            <p>
              Programming Basics: Lay a solid foundation with languages like
              Python or Java.
            </p>
            <h2>Contact</h2>
            <label htmlFor="">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="xl"
                style={{ color: "#ffffff", marginRight: "5px" }}
              />
              <a href="https://mail.google.com/">lnucodepulse@gmail.com</a>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
