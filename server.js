const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3001;

// Enable CORS for local development
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "kristine", // Your MySQL password
  database: "bikershub_db", // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Registration route
app.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if the user already exists
    const [users] = await db.promise().query("SELECT * FROM register WHERE email = ?", [email]);
    if (users.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const query = "INSERT INTO register (full_name, email, password) VALUES (?, ?, ?)";
    await db.promise().query(query, [fullName, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});


// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const [users] = await db.promise().query("SELECT * FROM register WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // If credentials are valid, return a success response
    res.status(200).json({ message: "Login successful", user: { id: user.id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

// Rent a bike route
app.post("/rent", async (req, res) => {
  const { user_id, bike_id } = req.body;

  try {
    // Check if the bike exists
    const [bikes] = await db.promise().query("SELECT * FROM bikes WHERE id = ?", [bike_id]);
    if (bikes.length === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }

    // Insert the rental record into the database
    const query = "INSERT INTO rentals (user_id, bike_id) VALUES (?, ?)";
    await db.promise().query(query, [user_id, bike_id]);

    res.status(201).json({ message: "Bike rented successfully", rental: { user_id, bike_id } });
  } catch (err) {
    console.error("Error during bike rental:", err);
    res.status(500).json({ message: "Failed to rent bike" });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});