import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
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
import LNUMaterial from "./components/frontend/LNUMaterials/LNUMaterials";
import Profile from "./components/frontend/Student/Profile";
import AdminDashboard from "./components/frontend/Admin/AdminDashboard";
import Student from "./components/frontend/Admin/Student";
import Teacher from "./components/frontend/Admin/Teacher";
// JAVA MODULES
import Data from "./components/frontend/Student/java/Data";
import Variables from "./components/frontend/Student/java/Variables";
import Expression from "./components/frontend/Student/java/Expression";
import Operators_Decision from "./components/frontend/Student/java/Operators_Decision";
import Loops_Iteration from "./components/frontend/Student/java/Loops_Iteration";
import Arrays from "./components/frontend/Student/java/Arrays";
import Meth from "./components/frontend/Student/java/Meth";
import Intro from "./components/frontend/Student/java/Intro";
// Java Quiz
import { jsQuizz } from "./components/frontend/Student/java/quiz/Intro/intro";
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
import UploadAd from "./components/frontend/Admin/UploadAd";
import JavaDashAdmin from "./components/frontend/Admin/JavaDashAdmin";
import PyDashAdmin from "./components/frontend/Admin/PyDashAdmin";
import LNUMaterialsAdmin from "./components/frontend/Admin/LNUMaterialsAdmin";
//Upload page
import Upload from "./components/frontend/Teacher/Upload";
import Download from "./components/frontend/Teacher/Download";
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
          <Route path="/" element={<Login />}>
            Login
          </Route>
          <Route path="/register" element={<Register />}>
            Register
          </Route>
          {/* Admin Page */}
          <Route path="/admin" element={<AdminDashboard />}>
            Admin
          </Route>
          <Route path="/teacherAd" element={<Teacher />}>
            TeacherAdmin
          </Route>
          <Route path="/studentAd" element={<Student />}>
            StudentAdmin
          </Route>
          <Route path="/uploadAd" element={<UploadAd />}>
            UploadAdmin
          </Route>
          <Route path="javaDashAdmin" element={<JavaDashAdmin />}>
            Java Admin
          </Route>
          <Route path="pythonDashAdmin" element={<PyDashAdmin />}>
            Python Admin
          </Route>
          <Route path="lnuMaterialsAdmin" element={<LNUMaterialsAdmin />}>
            LNU Materials Admin
          </Route>

          {/* End Admin Page */}
          {/* Student Page */}
          <Route path="/studentDash" element={<StudentDashboard />}>
            Student
          </Route>
          <Route path="/upload" element={<Upload />}>
            Upload
          </Route>

          {/* This is the route for java pages */}
          <Route path="/arrays" element={<Arrays />}>
            Arrays
          </Route>
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

          <Route
            path="/introQuiz"
            element={<Intro_Q questions={jsQuizz.questions} />}
          ></Route>

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
          <Route path="/lnuMaterials" element={<LNUMaterial />}>
            LNU Materials
          </Route>

          {/* THIS IS FOR TEACHERS PAGES */}
          <Route path="/teacherDash" element={<TeacherDashboard />}>
            Teacher
          </Route>
          <Route path="/profile" element={<Profile />}>
            Profile
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
