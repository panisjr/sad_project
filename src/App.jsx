import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/frontend/Login and Register/Login";
import Register from "./components/frontend/Login and Register/Register";
import StudentDashboard from "./components/frontend/Student/StudentDashboard";
import StudentPyDash from "./components/frontend/Student/StudentPyDash";
import StudentJavaDash from "./components/frontend/Student/StudentJavaDash";
// TEACHER PAGE
import TeacherDashboard from "./components/frontend/Teacher/TeacherDashboard";
import TeacherJavaDash from "./components/frontend/Teacher/TeacherJavaDash";
import TeacherPyDash from "./components/frontend/Teacher/TeacherPyDash";
// END TEACHER PAGE
import Profile from "./components/frontend/Student/Profile";
import AdminDashboard from "./components/frontend/Admin/AdminDashboard";
// JAVA MODULES
import Data from "./components/frontend/Student/java/Data";
import Variables from "./components/frontend/Student/java/Variables";
import Expression from "./components/frontend/Student/java/Expression";
import Operators_Decision from "./components/frontend/Student/java/Operators_Decision";
import Loops_Iteration from "./components/frontend/Student/java/Loops_Iteration";
import Meth from "./components/frontend/Student/java/Meth";
import Intro from "./components/frontend/Student/java/Intro";
// Java Quiz
import Intro_Q from "./components/frontend/Student/java/quiz/Intro/Intro_Q";
// PYTHON MODULES
import DataPy from "./components/frontend/Student/python/DataPy";
import VariablesPy from "./components/frontend/Student/python/VariablesPy";
import ExpressionPy from "./components/frontend/Student/python/ExpressionPy";
import Operators_DecisionPy from "./components/frontend/Student/python/Operators_DecisionPy";
import Loops_IterationPy from "./components/frontend/Student/python/Loops_IterationPy";
import ArraysPy from "./components/frontend/Student/python/ArraysPy";
import MethPy from "./components/frontend/Student/python/MethPy";
import IntroPy from "./components/frontend/Student/python/IntroPy";
// Python Quiz
import Intro_QPy from "./components/frontend/Student/python/quiz/IntroPy/Intro_QPy";
import { introPy } from "./components/frontend/Student/python/quiz/IntroPy/introPy";
//Admin Page
import AdminLoginPage from "./components/frontend/Login and Register/AdminLoginPage";
import UploadAd from "./components/frontend/Admin/UploadAd";
import JavaDashAdmin from "./components/frontend/Admin/JavaDashAdmin";
import PyDashAdmin from "./components/frontend/Admin/PyDashAdmin";
import LNUMaterialsAdmin from "./components/frontend/Admin/LNUMaterialsAdmin";
import AddCourse from "./components/frontend/Admin/AddCourse";
import StudentAdmin from "./components/frontend/Admin/StudentAdmin";
import TeacherAdmin from "./components/frontend/Admin/TeacherAdmin";
// End Admin Page
//Upload page
import Upload from "./components/frontend/Teacher/Upload";
import Download from "./components/frontend/Teacher/Download";
// Landing Page
import LandingPage from "./components/frontend/LandingPage/LandingPage";
import LNUMaterials from "./components/frontend/Student/LNUMaterials";
import JavaDashStudent from "./components/frontend/Student/JavaDashStudent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/download" element={<Download />}>
            Download
          </Route>
          {/* This is the route for the main pages */}
          {/* Login Page */}
          <Route path="/login" element={<Login />}>
            Login
          </Route>
          <Route path="/register" element={<Register />}>
            Register
          </Route>
          {/* Admin Page */}
          <Route path="/admin" element={<AdminDashboard />}>
            Admin
          </Route>
          <Route path="/addcourse" element={<AddCourse />}>
            Add Course
          </Route>
          <Route path="/uploadAd" element={<UploadAd />}>
            UploadAdmin
          </Route>
          <Route path="javaDashAdmin" element={<JavaDashAdmin />}>
            Java Admin
          </Route>
          <Route path="pythonDashAdmin" element={<PyDashAdmin />}>
            s Python Admin
          </Route>
          <Route path="lnuMaterialsAdmin" element={<LNUMaterialsAdmin />}>
            LNU Materials Admin
          </Route>
          <Route path="/studentAdmin" element={<StudentAdmin />}>
            Student Page
          </Route>
          <Route path="/teacherAdmin" element={<TeacherAdmin />}>
            Teacher Page
          </Route>
          <Route path="/adminLoginPage" element={<AdminLoginPage />}>
            Admin Login Page
          </Route>
          {/* End Admin Page */}
          {/* Student Page */}
          <Route path="/studentDash" element={<StudentDashboard />}>
            Student
          </Route>
          <Route path="/upload" element={<Upload />}>
            Upload
          </Route>
          <Route path="/javaDashStudent" element={<JavaDashStudent />}>
            Java Dash Student
          </Route>

          {/* This is the route for java pages */}
          <Route path="/data" element={<Data />}>
            Data
          </Route>
          <Route path="/expression" element={<Expression />}>
            Expression
          </Route>
          <Route path="/variables" element={<Variables />}>
            Variables
          </Route>
          <Route path="/loops_iteration" element={<Loops_Iteration />}>
            Loops Iteration
          </Route>
          <Route path="/meth" element={<Meth />}>
            Methods
          </Route>
          <Route path="operators_decision" element={<Operators_Decision />}>
            Operators Decision
          </Route>
          <Route path="/studentJava" element={<StudentJavaDash />}>
            Student Java
          </Route>
          <Route path="/teacherJava" element={<TeacherJavaDash />}>
            Java
          </Route>
          <Route path="/intro" element={<Intro />}>
            Intro
          </Route>

          <Route path="/introQuiz" element={<Intro_Q />}></Route>

          {/* This is the route for python pages */}
          <Route path="/studentPython" element={<StudentPyDash />}>
            Python
          </Route>
          <Route path="/teacherPython" element={<TeacherPyDash />}>
            Python
          </Route>

          <Route path="/arraysPy" element={<ArraysPy />}>
            Arrays
          </Route>
          <Route path="/dataPy" element={<DataPy />}>
            Data
          </Route>
          <Route path="/expressionPy" element={<ExpressionPy />}>
            Expression
          </Route>
          <Route path="/variablesPy" element={<VariablesPy />}>
            Variables
          </Route>
          <Route path="/loops_iterationPy" element={<Loops_IterationPy />}>
            Loops Iteration
          </Route>
          <Route path="/methPy" element={<MethPy />}>
            Methods
          </Route>
          <Route
            path="/operators_decisionPy"
            element={<Operators_DecisionPy />}
          >
            Operators Decision
          </Route>
          <Route path="/introPy" element={<IntroPy />}>
            Intro
          </Route>
          <Route
            path="/introQuizPy"
            element={<Intro_QPy questions={introPy.questions} />}
          ></Route>

          {/* For the lnu materials */}
          <Route path="/lnuMaterials" element={<LNUMaterials />}>
            LNU Materials
          </Route>

          {/* THIS IS FOR TEACHERS PAGES */}
          <Route path="/teacherDash" element={<TeacherDashboard />}>
            Teacher
          </Route>
          <Route path="/profile" element={<Profile />}>
            Profile
          </Route>

          {/* Landing Page */}
          <Route path="/" element={<LandingPage />}>
            Landing Page
          </Route>
          {/* End of Landing Page */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
