import express, { json } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import CryptoJS from "crypto-js";
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

    const sql = `SELECT * FROM ${tableName} WHERE id_number = ? OR email = ? `;
    const values = [sentIdnumber, sentEmail];

    const result = await db_query(sql, values);

    if (result.length > 0) {
      res.status(409).json({ error: 'ID number or Email is already taken' });
    } else {
      const hashedPassword = CryptoJS.SHA256(sentPassword).toString(CryptoJS.enc.Hex);

      // Check if the hashed password already exists in the database
      const passwordExistsSql = `SELECT * FROM ${tableName} WHERE password = ?`;
      const passwordExistsValues = [hashedPassword];

      const passwordExistsResult = await db_query(passwordExistsSql, passwordExistsValues);

      if (passwordExistsResult.length > 0) {
        res.status(409).json({ error: 'Password is already taken' });
        res.send({ password: passwordExistsResult })
      } else {
        const insertSql = `INSERT INTO ${tableName} (id_number, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [sentIdnumber, sentUsername, sentEmail, sentRole, hashedPassword];

        await db_query(insertSql, insertValues);
        console.log("User added successfully!");
        res.send({ message: "User added!" });
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

    const sql = `SELECT * FROM ${tableName} WHERE id_number = ? `;
    const values = [sentLoginIdnumber];

    const results = await db_query(sql, values);

    if (results.length === 0) {
      res.status(401).json({ message: 'User not found' });
    } else {
      console.log("Database query results:", results);
      const storedHashedPassword = results[4].password; // Adjust the column name accordingly

      // Hash the entered password for comparison
      const hashedEnteredPassword = CryptoJS.SHA256(sentLoginPassword).toString(CryptoJS.enc.Hex);

      if (hashedEnteredPassword === storedHashedPassword) {
        console.log("successfully login")
        res.json({
          message: 'Login successful', role: tableName, password: hashedEnteredPassword
        });
      } else {
        res.status(401).json({ message: 'Credentials do not match' });
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

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

