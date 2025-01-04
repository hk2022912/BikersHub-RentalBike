const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
const port = 3001;

// Enable CORS for local development
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123", 
  database: "bikershub_db", 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!!!");
});

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "elan.krisgwyn08@gmail.com", // your Gmail address
    pass: "jcee liqs cxdp jxqn", // the generated application-specific password
  },
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

// Check email route
app.post("/check-email", (req, res) => {
  const { email } = req.body;

  // Check if the email exists in your database
  db.promise().query("SELECT * FROM register WHERE email = ?", [email])
    .then(([users]) => {
      if (users.length > 0) {
        return res.json({ exists: true });
      } else {
        return res.json({ exists: false });
      }
    })
    .catch(err => {
      console.error("Error checking email:", err);
      res.status(500).json({ error: "Failed to check email" });
    });
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


app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Generate a random OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set OTP expiration (e.g., 10 minutes from now)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Store the OTP in the database
  const query = "INSERT INTO otp_requests (email, otp, expires_at) VALUES (?, ?, ?)";
  db.query(query, [email, otp, expiresAt], (err, result) => {
    if (err) {
      console.error('Error storing OTP:', err);
      return res.status(500).json({ success: false, message: 'Failed to store OTP.' });
    }

    // Mail options to send OTP to the user's email
    const mailOptions = {
      from: 'Bikers Hub <elan.krisgwyn08@gmail.com>',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    };

    // Send OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
      }
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'OTP sent successfully!' });
    });
  });
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  console.log('Received request for /verify-otp:', req.body);

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  try {
    // Check if the OTP is valid and not expired
    const [otpRecords] = await db.promise().query(
      "SELECT * FROM otp_requests WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [email, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // If valid OTP
    res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
  }
});

app.post('/change-password', async (req, res) => {
  const { email, newPassword, otp } = req.body;

  if (!email || !newPassword || !otp) {
    return res.status(400).json({ success: false, message: 'Email, new password, and OTP are required.' });
  }

  try {
    // Check if the OTP is valid and hasn't expired
    const [otpRecords] = await db.promise().query(
      "SELECT * FROM otp_requests WHERE email = ? AND otp = ? AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1",
      [email, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const updateQuery = 'UPDATE register SET password = ? WHERE email = ?';
    db.query(updateQuery, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error('Error updating password:', err);
        return res.status(500).json({ success: false, message: 'Failed to change password.' });
      }

      res.json({ success: true, message: 'Password changed successfully.' });
    });
  } catch (error) {
    console.error('Error during password change:', error);
    res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
});




// Rent Now API
app.post('/api/rent', async (req, res) => {
  const { userId, bikeName, price, paymentMethod, date, time } = req.body;

  // Validate incoming data
  if (!userId || !bikeName || !price || !paymentMethod || !date || !time) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Insert the rental details into the database
    const query = `
      INSERT INTO rentals (user_id, bike_name, price, payment_method, rental_date, rental_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [userId, bikeName, price, paymentMethod, date, time];

    await db.promise().query(query, values);

    // Respond with success message
    res.status(200).json({ message: 'Bike rented successfully!' });
  } catch (error) {
    console.error('Error processing rent request:', error);
    res.status(500).json({ error: 'Failed to process rent request. Please try again.' });
  }
});



// Order confirmation API route
app.post('/api/confirm-order', (req, res) => {
  const { accessoryName, quantity, price, paymentMethod, shippingInfo } = req.body;

  if (!accessoryName || !quantity || !price || !paymentMethod || !shippingInfo) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const totalCost = quantity * price;

  // SQL query to insert order details into the database
  const query = 'INSERT INTO orders (accessory_name, quantity, price, payment_method, shipping_info, total_cost) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [accessoryName, quantity, price, paymentMethod, JSON.stringify(shippingInfo), totalCost], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert order into database' });
    }

    // Respond with success message and order details
    res.status(200).json({
      message: 'Order confirmed successfully!',
      orderDetails: {
        accessoryName,
        quantity,
        totalCost,
        paymentMethod,
        shippingInfo,
      },
    });
  });
});


// Get bike details by ID
app.get('/bike/:id', (req, res) => {
  const bikeId = req.params.id;
  const query = 'SELECT * FROM bikes WHERE id = ?';
  db.query(query, [bikeId], (err, result) => {
    if (err) {
      console.error('Error fetching bike details:', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Rent a bike
app.post('/rent', (req, res) => {
  const { bikeId, renterName, rentDate, rentTime, paymentMethod } = req.body;
  const query = 'INSERT INTO rentals (bike_id, renter_name, rent_date, rent_time, payment_method) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [bikeId, renterName, rentDate, rentTime, paymentMethod], (err, result) => {
    if (err) {
      console.error('Error inserting rental details:', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json({ message: 'Bike rented successfully!', rentalId: result.insertId });
    }
  });
});



// Define booking route
app.post('/api/book-bike', (req, res) => {
  const { bike_id, user_id, rent_date, rent_time, payment_method } = req.body;

  // SQL query to insert booking data
  const query = `
    INSERT INTO bike_bookings (bike_id, user_id, rent_date, rent_time, payment_method, status)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [bike_id, user_id, rent_date, rent_time, payment_method, 'confirmed'], (err, results) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return res.status(500).json({ error: 'Error booking bike' });
    }
    res.status(200).json({ message: 'Booking confirmed', bookingId: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
