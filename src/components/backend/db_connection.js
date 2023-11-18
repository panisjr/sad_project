import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt, { genSaltSync } from "bcrypt";
import { createConnection } from "mysql";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";

const saltRounds = bcrypt.genSaltSync(10);
const app = express();
app.use(json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(express.urlencoded({ extended: true }));
// Create a MySQL connection
const db_connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sad_project",
});

// Connect to the MySQL database
db_connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL database connected");
});

app.listen(8081, () => {
  console.log("listening");
});

// This is to register an account
app.post("/register", (req, res) => {
  const sentIdnumber = req.body.Idnumber;
  const sentUsername = req.body.Username;
  const sentEmail = req.body.Email;
  const sentPassword = req.body.Password;
  const sentRole = req.body.Role;
  const tableName = sentRole === 'student' ? 'students' : 'teachers';

  // Check if ID number or sentEmail is already taken
  const sql = `SELECT * FROM ${tableName} WHERE id_number = ? OR email = ? `;
  const values = [sentIdnumber, sentEmail];
  db_connection.query(sql, values, async (err, results) => {
    if (err) {
      console.log("Error:", err)
    }
    else if (results.length > 0) {
      // ID number or sentEmail is already taken
      console.log("Already Taken");
      return res.status(409).json({ error: 'ID number or sentEmail is already taken' });
    } else {
      // ID number and sentEmail are not taken, proceed with registration
      const hash = await bcrypt.hash(sentPassword, 10);

      if (hash) {
        // Insert the new user
        const insertSql = `INSERT INTO ${tableName} (id_number, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [sentIdnumber, sentUsername, sentEmail, sentRole, hash];

        db_connection.query(insertSql, insertValues, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Failed to add user' });
          } else {
            console.log("User added successfully!");
            return res.json({ message: "User added successfully!" });
          }
        });
      }

    }
  });
});

// Login
app.post("/login", (req, res) => {
  const sentIdnumber = req.body.LoginIdnumber;
  const sentLoginPassword = req.body.LoginPassword;
  const sentRole = req.body.LoginRole;
  const tableName = sentRole === 'student' ? 'students' : 'teachers';

  // Check if the user exists in the specified role table
  const sql = `SELECT * FROM ${tableName} WHERE id_number = ?`;
  const values = [sentIdnumber];

  db_connection.query(sql, values, (err, results) => {
    if (err) {
      // Handle other errors, e.g., database connection issue
      console.error('Error checking user credentials:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      // User found, check password
      console.log('User-Entered sentPassword:', sentLoginPassword);
      console.log('Stored Hashed sentPassword:', results[0].password);
      console.log('Database Query Results:', results);

      bcrypt.compare(sentLoginPassword, results[0].password, (err, passwordMatch) => {
        if (err) {
          // Handle the error, e.g., log it or send an error response
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (passwordMatch) {
          console.log('sentPassword Match:', passwordMatch);
          req.session.username = results[0]?.username;
          // Passwords match, user is authenticated
          console.log('Successfully logged in');
          // Send back user role to the client
          res.json({
            role: results[0].role
            // Avoid sending sensitive information like passwords to the client
          });
        } else {
          // Passwords don't match, authentication failed
          console.log('Unsuccessfully logged in');
          res.status(401).json({ message: 'Credentials do not match' });
        }
      });

    }
  });
});
// Admmin Login
app.post("/adminLogin", (req, res) => {
  const sentAdminUsername = req.body.AdminUsername;
  const sentAdminPassword = req.body.AdminPassword;
  const sql = "SELECT * FROM admin WHERE username = ?";
  const values = [sentAdminUsername];

  db_connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      // User found, check password
      console.log('Database Query Results:', results);

      bcrypt.compare(sentAdminPassword, results[0].password, (err, passwordMatch) => {
        if (err) {
          // Handle the error, e.g., log it or send an error response
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (passwordMatch) {
          console.log('sentPassword Match:', passwordMatch);
          req.session.username = results[0]?.username;
          // Passwords match, user is authenticated
          console.log('Successfully logged in');
          // Send back user role to the client
          res.json({
            username: results[0].username
            // Avoid sending sensitive information like passwords to the client
          });
        } else {
          // Passwords don't match, authentication failed
          console.log('Unsuccessfully logged in');
          res.status(401).json({ message: 'Credentials do not match' });
        }
      });
    }
  })
})
// Get the current username
app.get("/studentinfo", (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});
// FILES TABLE
// This is to get the data insert in mysql database
app.get("/data", (req, res) => {
  const sql = "SELECT * FROM files";
  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// Student Table
app.get("/studentData", (req, res) => {
  const sql = "SELECT * FROM students";
  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// This is to delete the student
app.delete('/studentDelete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM students WHERE id = ${id}`;

  db_connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// Get the total registered Students
app.get('/totalStudent', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_student FROM students';

  db_connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      const totalStudent = result[0].total_student;
      res.json({ totalStudent });
    }
  });
});
// End of Student Table
// Teacher Table
app.get("/teacherData", (req, res) => {
  const sql = "SELECT * FROM teachers";
  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
// Delete Teacher Account
app.delete('/teacherDelete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM teachers WHERE id = ${id}`;

  db_connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// Get the total registered Teachers
app.get('/totalTeacher', (req, res) => {
  const sql = 'SELECT COUNT(*) as total_teacher FROM teachers';

  db_connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error querying the database: ' + err);
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

  db_connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// FILES TABLE END 

// Create a multer storage configuration to define where to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

// This is to upload file
const upload = multer({ storage })

app.post('/upload', upload.single('file'), (req, res) => {
  const sql = "INSERT INTO files (`filename`) VALUES (?)";
  const values = [
    req.file.filename
  ]
  db_connection.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Error singup query" });
    return res.json({ Status: "Success" });
  })
})

// Download File 
app.get('/download-data', (req, res) => {
  const sql = "SELECT filename FROM files";
  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json(results);
    }
  });
});

// Courses Table
app.get("/courseData", (req, res) => {
  const sql = "SELECT * FROM courses";
  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
});
app.post('/addTopic', (req, res) => {
  const sentAddTopic = req.body.AddTopic;
  const sql = "INSERT INTO courses (`topic`) VALUES (?)";
  const values = [sentAddTopic];
  db_connection.query(sql, values, (err, result) => {
    if (err) {
      console.log("Error adding topic: ", err);
    } else {
      res.json(result);
    }
  })
})
// Edit a topic by ID
app.put('/editTopic/:id', (req, res) => {
  const topicId = parseInt(req.params.id);
  const topicIndex = topics.findIndex((t) => t.id === topicId);

  if (topicIndex !== -1) {
    topics[topicIndex].title = req.body.title;
    res.json({ message: 'Topic updated successfully' });
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});
// Get a specific topic by ID
app.get('/getTopic/:id', (req, res) => {
  const topicId = parseInt(req.params.id);
  const topic = topics.find((t) => t.id === topicId);
  if (topic) {
    res.json(topic);
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});
// Delete Topic
app.delete('/topicDelete/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM courses WHERE id = ${id}`;

  db_connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting data');
    } else {
      res.status(200).send('Data deleted successfully');
    }
  });
});
// End Courses Table