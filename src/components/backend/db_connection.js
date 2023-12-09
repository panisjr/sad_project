import express, { json } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createConnection } from 'mysql';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: '0123456789abcdef0123456789abcdef'
  // Add more configuration options if needed
});
// Create a MySQL connection
const DbConnection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sad_project'
});
// Connect to the MySQL database
DbConnection.connect((err) => {
  if (err) {
    throw err;
  }
  Bugsnag.notify('MySQL database connected');
});

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));



// This is to register an account
app.post('/register', (req, res) => {
  const sentIdnumber = req.body.Idnumber;
  const sentUsername = req.body.Username;
  const sentEmail = req.body.Email;
  const sentPassword = req.body.Password;
  const sentRole = req.body.Role;

  // Check if ID number or sentEmail is already taken
  const sql = "SELECT * FROM users WHERE id_number = ? OR email = ?";
  const values = [sentIdnumber, sentEmail];
  DbConnection.query(sql, values, async (err, results) => {
    if (err) {
      Bugsnag.notify(err);
    } else if (results.length > 0) {
      // ID number or sentEmail is already taken
      Bugsnag.notify('ID Number or Email is already taken');
      Bugsnag.notify(err);
      return res.status(409).json({ error: 'ID number or sentEmail is already taken' });
    } else {
      // ID number and sentEmail are not taken, proceed with registration
      const hash = await bcrypt.hash(sentPassword, 10);

      if (hash) {
        // Insert the new user
        const insertSql = "INSERT INTO users (id_number, username, email, role, password) VALUES (?, ?, ?, ?, ?)";
        const insertValues = [sentIdnumber, sentUsername, sentEmail, sentRole, hash];

        DbConnection.query(insertSql, insertValues, (err, results) => {
          if (err) {
            Bugsnag.notify(err);
            return res.status(500).json({ error: 'Failed to add user' });
          } else {
            Bugsnag.notify('User added successfully!');
            console.log(req.session.registeredUser);
            return res.json({ message: 'User added successfully!' });
          }
        });
      }
    }
  });
});
// User Info
app.get('/userInfo', (req, res) => {
  if (req.session.username && req.session.id_number) {
    return res.json({ valid: true, username: req.session.username, id_number: req.session.id_number })
  } else {
    return res.json({ valid: false })
  }
})
// Login
app.post('/login', (req, res) => {
  const sentIdnumber = req.body.LoginIdnumber;
  const sentLoginPassword = req.body.LoginPassword;

  // Check if the user exists in the specified role table
  const sql = "SELECT * FROM users WHERE id_number = ?";
  const values = [sentIdnumber];

  DbConnection.query(sql, values, (err, results) => {
    if (err) {
      // Handle other errors, e.g., database connection issue
      Bugsnag.notify('Error checking user credentials:');
      Bugsnag.notify(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      // User found, check password
      bcrypt.compare(sentLoginPassword, results[0].password, (err, passwordMatch) => {
        if (err) {
          // Handle the error, e.g., log it or send an error response
          Bugsnag.notify('Error comparing passwords:');
          Bugsnag.notify(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        if (passwordMatch) {
          Bugsnag.notify('sentPassword Match:', passwordMatch);
          Bugsnag.notify('Successfully logged in');
          // Store user information in the session
          req.session.username = results[0].username;
          req.session.id_number = results[0].id_number;
          res.json({
            role: results[0].role,
            username: results[0].username,
          });
        } else {
          // Passwords don't match, authentication failed
          Bugsnag.notify('Unsuccessfully logged in');
          res.status(401).json({ message: 'Credentials do not match' });
        }
      });
    }
  });
});

// FILES TABLE
// This is to get the data insert in mysql database
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM files';
  DbConnection.query(sql, (err, results) => {
    if (err) {
      Bugsnag.notify('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// Student Table
app.get('/studentData', (req, res) => {
  const sql = 'SELECT * FROM users WHERE role = "student"';
  DbConnection.query(sql, (err, results) => {
    if (err) {
      Bugsnag.notify('Error querying the database: ');
      Bugsnag.notify(err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// This is to delete the student
app.delete('/studentDelete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  DbConnection.query(sql, [id], (err, result) => {
    if (err) {
      Bugsnag.notify(err);
      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// Get the total registered Students
app.get('/totalStudent', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_student FROM users WHERE role = "student"';

  DbConnection.query(sql, (err, result) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).json({ message: 'Database error' });
    } else {
      const totalStudent = result[0].total_student;
      res.json({ totalStudent });
    }
  });
});
// End of Student Table
// Teacher Table
app.get('/teacherData', (req, res) => {
  const sql = 'SELECT * FROM users WHERE role = "teacher"';
  DbConnection.query(sql, (err, results) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// Delete Teacher Account
app.delete('/teacherDelete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  DbConnection.query(sql, [id], (err, result) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// Get the total registered Teachers
app.get('/totalTeacher', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_teacher FROM users WHERE role = "teacher"';

  DbConnection.query(sql, (err, result) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).json({ message: 'Database error' });
    } else {
      const totalTeacher = result[0].total_teacher;
      res.json({ totalTeacher });
    }
  });
});
// This is to delete the files
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM files WHERE id = ${id}`;

  DbConnection.query(sql, (err, result) => {
    if (err) {
      res.json({
        err
      });
      Bugsnag.notify('Internal server error');
    } else {
      res.json({
        result
      });
    }
  });
});

// FILES TABLE END

// Create a multer storage configuration to define where to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  }
});

// This is to upload file
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const title = req.body.title;
  const dateUpload = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const sql = 'INSERT INTO files (`title`, `filename`, `instructors_name`,  `date`) VALUES ( ?, ?, ?,?)';
  const values = [title, req.file.filename, req.session.username, dateUpload];

  DbConnection.query(sql, values, (err, result) => {
    if (err) {
      Bugsnag.notify(err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    return res.json({ status: 'Success' });
  });
});
// To get the total Java and Python Courses
// Java
app.get('/totalJavaCourses', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_JavaCourses FROM courses WHERE course = "java"';

  DbConnection.query(sql, (err, result) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).json({ message: 'Database error' });
    } else {
      const totalJavaCourses = result[0].total_JavaCourses;
      res.json({ totalJavaCourses });
    }
  });
});
// Python
app.get('/totalPythonCourses', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_PythonCourses FROM courses WHERE course = "python"';

  DbConnection.query(sql, (err, result) => {
    if (err) {
      Bugsnag.notify(err);

      res.status(500).json({ message: 'Database error' });
    } else {
      const totalPythonCourses = result[0].total_PythonCourses;
      res.json({ totalPythonCourses });
    }
  });
});
// End
// Search Bar for Files
app.post('/search', (req, res) => {
  const { searchTerm } = req.body;

  if (!searchTerm) {
    // If search term is empty, retrieve all files
    const query = 'SELECT * FROM files';
    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  } else {
    // Otherwise, dynamically construct the query to search in all columns
    const query = `
      SELECT * FROM files 
      WHERE filename LIKE '%${searchTerm}%' OR 
            instructors_name LIKE '%${searchTerm}%' OR 
            date LIKE '%${searchTerm}%' OR 
            title LIKE '%${searchTerm}%'
    `;

    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  }
});
// Search Student and Teacher Account
app.post('/studentSearchAccount', (req, res) => {
  const { searchTerm } = req.body;
  if (!searchTerm) {
    // If search term is empty, retrieve all files
    const query = 'SELECT * FROM users WHERE role = "student"';
    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  } else {
    // Otherwise, dynamically construct the query to search in all columns
    const query = `
    SELECT * FROM users
    WHERE role = "student" AND
    (id_number LIKE '%${searchTerm}%' OR 
          username LIKE '%${searchTerm}%' OR 
          email LIKE '%${searchTerm}%')
    `;

    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  }
});
app.post('/teacherSearchAccount', (req, res) => {
  const { searchTerm } = req.body;
  if (!searchTerm) {
    // If search term is empty, retrieve all files
    const query = 'SELECT * FROM users WHERE role = "teacher"';
    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  } else {
    // Otherwise, dynamically construct the query to search in all columns
    const query = `
      SELECT * FROM users
      WHERE role = "teacher" AND
      (id_number LIKE '%${searchTerm}%' OR 
            username LIKE '%${searchTerm}%' OR 
            email LIKE '%${searchTerm}%')
    `;

    DbConnection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result);
    });
  }
});
// End
// Create a topic
app.post('/addCourse', (req, res) => {
  const { title, chosenCourse } = req.body;
  DbConnection.query('INSERT INTO courses (title,course) VALUES (?,?)', [title, chosenCourse], (err, result) => {
    if (err) {
      console.error('Error inserting topic:', err);
      res.status(500).json({ error: 'Error inserting topic' });
    } else {
      res.status(201).json({ id: result.insertId, title });
    }
  });
});
// Get the java and python courses
app.get('/courses', (req, res) => {
  DbConnection.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.error('Error getting courses:', err);
      res.status(500).json({ error: 'Error getting courses' });
    } else {
      res.status(200).json(result);
    }
  });
});
app.get('/javaCourses', (req, res) => {
  const sql = 'SELECT * FROM courses WHERE course = "java"';
  DbConnection.query(sql, (err, results) => {
    if (err) {
      Bugsnag.notify('Error querying the database: ');
      Bugsnag.notify(err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/pythonCourses', (req, res) => {
  const sql = 'SELECT * FROM courses WHERE course = "python"';
  DbConnection.query(sql, (err, results) => {
    if (err) {
      Bugsnag.notify('Error querying the database: ');
      Bugsnag.notify(err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// End of getting java and python courses

// Get the content
app.get('/getContent', (req, res) => {
  DbConnection.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.error('Error getting courses:', err);
      res.status(500).json({ error: 'Error getting courses' });
    } else {
      res.status(200).json(result);
    }
  });
});
// Route for updating or adding content
app.post('/updateContent', (req, res) => {
  const sentText = req.body.text;
  const sentTitleId = req.body.titleId;

  // Check if the titleId exists in the courses table
  const sql = 'SELECT * FROM courses WHERE id = ?';
  const values = [sentTitleId];

  DbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.length > 0) {
      // If the course with the given titleId exists, update the content
      DbConnection.query(
        'UPDATE courses SET content = ? WHERE id = ?',
        [sentText, sentTitleId],
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ success: false, error: "Update error" });
          }

          res.json(updateResult);
        }
      );
    } else {
      // If the course with the given titleId doesn't exist, return an error
      return res.status(404).json({ success: false, error: "Course not found" });
    }
  });
});

// To add Quiz
app.post('/addQuizQuestions', (req, res) => {
  const { titleId, quizQuestions } = req.body;
  // Check if a quiz question already exists for the specified titleId
  const sql = 'SELECT * FROM courses WHERE id = ?';
  const values = [titleId];

  DbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.length > 0) {
      // If a quiz question exists for the titleId, update it
      const existingQuizQuestions = result[0].quizQuestions || [];
      const updatedQuizQuestions = [...existingQuizQuestions, ...quizQuestions];
      if (existingQuizQuestions) {
        const insertQuizQuestionsSql = 'UPDATE courses SET quizQuestions = ? WHERE id = ?';
        const updateQuizQuestionsValues = [JSON.stringify(updatedQuizQuestions), titleId];

        DbConnection.query(insertQuizQuestionsSql, updateQuizQuestionsValues, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ success: false, error: "Update error" });
          }

          res.json(updateResult);
        });
      } else {
        const updateQuizQuestionsSql = 'UPDATE courses SET quizQuestions = ? WHERE id = ?';
        const updateQuizQuestionsValues = [JSON.stringify(updatedQuizQuestions), titleId];

        DbConnection.query(updateQuizQuestionsSql, updateQuizQuestionsValues, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Update error:", updateErr);
            return res.status(500).json({ success: false, error: "Update error" });
          }

          res.json(updateResult);
        });
      }
    } else {
      // Handle the case where the course does not exist
      return res.status(404).json({ success: false, error: "Course not found" });
    }
  });
});
app.get('/getQuizQuestions/:titleId', (req, res) => {
  const { titleId } = req.params;
  // Assuming you have a database query to retrieve quiz questions
  // Replace this with your actual database query
  const sql = 'SELECT * FROM courses WHERE id = ?';
  const values = [titleId];

  DbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }

    if (result.length > 0) {
      // Assuming quiz questions are stored as JSON in the 'quizQuestions' column
      const quizQuestions = result[0].quizQuestions || [];
      res.json({ success: true, quizQuestions });
    } else {
      res.status(404).json({ success: false, error: "Course not found" });
    }
  });
});

// This is to delete the Topics
app.delete('/deleteCourse/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM courses WHERE id = ${id}`;

  DbConnection.query(sql, (err, result) => {
    if (err) {
      res.json({
        err
      });
      Bugsnag.notify('Internal server error');
    } else {
      res.json({
        result
      });
    }
  });
});
app.listen(8081, () => {
  Bugsnag.notify('Listening');
});