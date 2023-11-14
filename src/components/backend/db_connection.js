import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { createConnection } from "mysql";
import multer from "multer";

const app = express();
app.use(json());
app.use(cors());
app.use(bodyParser.json());

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
app.post("/register", async (req, res) => {
  try {
    const sentIdnumber = req.body.Idnumber;
    const sentUsername = req.body.Username;
    const sentEmail = req.body.Email;
    const sentPassword = req.body.Password;
    const sentRole = req.body.Role;

    const tableName = sentRole === 'student' ? 'students' : 'teachers';

    // Check if ID number or Email is already taken
    const existingUserSql = `SELECT * FROM ${tableName} WHERE id_number = ? OR email = ? `;
    const existingUserValues = [sentIdnumber, sentEmail];
    const existingUser = await db_query(existingUserSql, existingUserValues);

    if (existingUser.length > 0) {
      res.status(409).json({ error: 'ID number or Email is already taken' });
    } else {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(sentPassword, 10); // Adjust the salt rounds as needed

      // Check if the hashed password already exists in the database
      const passwordExistsSql = `SELECT * FROM ${tableName} WHERE password = ?`;
      const passwordExistsValues = [hashedPassword];
      const passwordExistsResult = await db_query(passwordExistsSql, passwordExistsValues);

      if (passwordExistsResult.length > 0) {
        res.status(409).json({ error: 'Password is already taken' });
      } else {
        // Insert the new user
        const insertSql = `INSERT INTO ${tableName} (id_number, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [sentIdnumber, sentUsername, sentEmail, sentRole, hashedPassword];
        await db_query(insertSql, insertValues);

        console.log("User added successfully!");
        res.json({ message: "User added successfully!" });
      }
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});


// Define a helper function for database queries
function db_query(sql, values) {
  return new Promise((resolve, reject) => {
    db_connection.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// This is to Login an account
app.post("/login", async (req, res) => {
  try {
    const sentLoginIdnumber = req.body.LoginIdnumber;
    const sentLoginPassword = req.body.LoginPassword;
    const sentLoginRole = req.body.LoginRole;

    const tableName = sentLoginRole === 'student' ? 'students' : 'teachers';

    const results = await db_query_login(sentLoginIdnumber, tableName);

    if (results.length === 0) {
      res.status(401).json({ message: 'User not found' });
    } else {
      const storedHashedPassword = results[0]?.password; // Adjust the column name accordingly
      // Compare entered password with stored hashed password using bcrypt

      if (storedHashedPassword) {
        console.log("Successfully logged in");
        res.json({
          message: 'Login successful',
          role: results[0]?.role
        });
      } else {
        console.log("Unsuccessfully logged in");
        res.status(401).json({ message: 'Credentials do not match' });
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const db_query_login = (id_number, tableName) => {
  const sql = `SELECT * FROM ${tableName} WHERE id_number = ?`;
  const values = [id_number];

  return new Promise((resolve, reject) => {
    db_connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// app.post("/login", async (req, res) => {
//   try {
//     const sentLoginIdnumber = req.body.LoginIdnumber;
//     const sentLoginPassword = req.body.LoginPassword;
//     const sentLoginRole = req.body.LoginRole;

//     const tableName = sentLoginRole === 'student' ? 'students' : 'teachers';

//     const sql = `SELECT * FROM ${tableName} WHERE id_number = ? `;
//     const values = [sentLoginIdnumber];

//     const results = await db_query(sql, values);

//     if (results.length === 0) {
//       res.status(401).json({ message: 'User not found' });
//     } else if (results.length >= 5 && results[4] && results[4].password) {
//       console.log("Database query results:", results);
//       const storedHashedPassword = results[4].password;

//       // Hash the entered password for comparison
//       const hashedEnteredPassword = CryptoJS.SHA256(sentLoginPassword).toString(CryptoJS.enc.Hex);

//       if (hashedEnteredPassword === storedHashedPassword) {
//         console.log("Successfully login");

//         // Redirect the user to the appropriate dashboard based on the role
//         if (sentLoginRole === 'student') {
//           res.redirect('/studentDash');
//         } else if (sentLoginRole === 'teacher') {
//           res.redirect('/teacherDash');
//         } else {
//           // If role is neither student nor teacher, handle accordingly
//           res.status(401).json({ message: 'Invalid role' });
//         }

//       } else {
//         res.status(401).json({ message: 'Credentials do not match' });
//       }
//     }
//   } catch (error) {
//     console.error("Error in login:", error);
//     res.status(500).json({ error: 'Internal server error', details: error.message });
//   }
// });

app.post("/studentinfo", (req, res) => {
  const sentId = req.query.LoginIdnumber; // Use req.query for GET requests
  const sentloginPassword = req.body.LoginPassword;
  const sentRole = req.query.LoginRole;

  const tableName = sentRole === 'student' ? 'students' : 'teachers';

  const sql = `SELECT username FROM ${tableName} WHERE id_number = ${sentId}`;

  db_connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error querying the database: ' + err);
      res.status(500).json({ message: 'Database error' });
    } else {
      res.json(results);
    }
  });
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

