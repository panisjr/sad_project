import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createConnection } from 'mysql';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: '0123456789abcdef0123456789abcdef'
  // Add more configuration options if needed
});
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(json());
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'asdfghjklasdfghjklasdfghjkl', // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
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

app.listen(8081, () => {
  Bugsnag.notify('Listening');
});

// This is to register an account
app.post('/register', (req, res) => {
  const sentIdnumber = req.body.Idnumber;
  const sentUsername = req.body.Username;
  const sentEmail = req.body.Email;
  const sentPassword = req.body.Password;
  const sentRole = req.body.Role;
  const tableName = sentRole === 'student' ? 'students' : 'teachers';

  // Check if ID number or sentEmail is already taken
  const sql = `SELECT * FROM ${tableName} WHERE id_number = ? OR email = ? `;
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
        const insertSql = `INSERT INTO ${tableName} (id_number, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [sentIdnumber, sentUsername, sentEmail, sentRole, hash];

        DbConnection.query(insertSql, insertValues, (err, results) => {
          if (err) {
            Bugsnag.notify(err);
            return res.status(500).json({ error: 'Failed to add user' });
          } else {
            Bugsnag.notify('User added successfully!');
            return res.json({ message: 'User added successfully!' });
          }
        });
      }
    }
  });
});

// Login
app.post('/login', (req, res) => {
  const sentIdnumber = req.body.LoginIdnumber;
  const sentLoginPassword = req.body.LoginPassword;
  const sentRole = req.body.LoginRole;
  const tableName = sentRole === 'student' ? 'students' : 'teachers';

  // Check if the user exists in the specified role table
  const sql = `SELECT * FROM ${tableName} WHERE id_number = ?`;
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
          // req.session.id_number = results[0].id_number;
          // req.session.username = results[0].username;
          // Passwords match, user is authenticated
          Bugsnag.notify('Successfully logged in');
          // Send back user role to the client
          req.session.save((saveErr) => {
            if (saveErr) {
              Bugsnag.notify('Error saving session:');
              Bugsnag.notify(saveErr);
              return res.status(500).json({ error: 'Internal server error' });
            }
            res.json({
              role: results[0].role,
              username: results[0].username
              // Avoid sending sensitive information like passwords to the client
            });
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
app.post('/adminLogin', (req, res) => {
  const sentAdminUsername = req.body.AdminUsername;
  const sentAdminPassword = req.body.AdminPassword;
  const sql = 'SELECT * FROM admin WHERE username = ?';
  const values = [sentAdminUsername];

  DbConnection.query(sql, values, (err, results) => {
    if (err) {
      Bugsnag.notify('Error checking user credentials:');
      Bugsnag.notify(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      // User found, check password
      Bugsnag.notify('Database Query Results:', results);

      bcrypt.compare(sentAdminPassword, results[0].password, (err, passwordMatch) => {
        if (err) {
          // Handle the error, e.g., log it or send an error response
          Bugsnag.notify('Error comparing passwords:');
          Bugsnag.notify(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (passwordMatch) {
          Bugsnag.notify('sentPassword Match:', passwordMatch);
          req.session.username = results[0]?.username;
          // Passwords match, user is authenticated
          Bugsnag.notify('Successfully logged in');
          // Send back user role to the client
          res.json({
            username: results[0].username
            // Avoid sending sensitive information like passwords to the client
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
  const sql = 'SELECT * FROM students';
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
  const sql = `DELETE FROM students WHERE id = ${id}`;

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
  const sql = 'SELECT COUNT(*) as total_student FROM students';

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
  const sql = 'SELECT * FROM teachers';
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
  const sql = `DELETE FROM teachers WHERE id = ${id}`;

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
  const sql = 'SELECT COUNT(*) as total_teacher FROM teachers';

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
  const sql = 'INSERT INTO files (`filename`) VALUES (?)';
  const values = [
    req.file.filename
  ];
  DbConnection.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: 'Error singup query' });
    return res.json({ Status: 'Success' });
  });
});
