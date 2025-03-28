const Calendar = require('./CalendarAuth.ts')
const { google } = require('googleapis');
const mysql = require('mysql2/promise');
const { connectToDB , connection } = require('./DatabaseConnection.ts');
require('dotenv').config();
const generateUserId = require('./Utils.ts')
const axios = require('axios');
const https = require('https');
const app = require('express')()
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
const PORT = 8080;
const cors = require("cors");
const allowedOrigins = ["http://localhost:3000"];
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const cookieParser = require('cookie-parser');


///////////////////////
// Middleware functions
///////////////////////

// Parsers

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json())


// Session authentication setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 
    },
  })
);

// CORS setup

app.use(
  cors({
      origin: allowedOrigins,
      credentials: true
  })
); 



// Setting up hidden keys
const CALENDAR_ID = process.env.CALENDAR_ID;


/////////////////////////
// HOME 
//////////////////////////
app.get('/api/' , (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send('This is the Projects Page');
});


/////////////////////////
// PROJECTS
//////////////////////////

app.get('/projects', (req, res) => {
  res.send('This is the Projects Page');
});

/////////////////////////
// ABOUT US
//////////////////////////

app.get('/about-us', (req, res) => {
    res.send('This is the About Us Page');
});

//////////////////////////
// BLOG
//////////////////////////
// Displaying news
app.get('/api/news', async (req, res) => {
  try {
    let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);

    const [rows] = await connection.execute(
      'SELECT * FROM NEWS'
    );
    console.log(rows)
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Failed to news');
  }
  });


// Displaying blogs
app.get('/api/blogs', async (req, res) => {
  try {
    let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);

    const [rows] = await connection.execute(
      'SELECT * FROM BLOGS'
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching research papers:', error.message);
    res.status(500).send('Failed to fetch research papers');
  }
  });

app.get('/api/research/:category', async (req, res) => {
    try {
      let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);
  
      const [rows] = await connection.execute(
        'SELECT * FROM research_papers WHERE category = ?',
        [req.params.category]
      );
  
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching research papers:', error.message);
      res.status(500).send('Failed to fetch research papers');
    }
});

///////////////////
// CALENDAR
///////////////////

// Route to fetch calendar events
app.get('/api/events', async (req, res) => {
  try {
    const auth = Calendar();
    const calendar = google.calendar({ version: 'v3', auth });

    // Retrieve events from the calendar
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,                   
      singleEvents: true,               
      orderBy: 'startTime',            
    });

    const events = response.data.items;

    if (!events || events.length === 0) {
      return res.status(200).send('No upcoming events found.');
    }

    // Format and return events
    const formattedEvents = events.map((event) => {
      const start = event.start.dateTime || event.start.date; 
      return {
        start,
        summary: event.summary,
        description: event.description || 'No description',
        location: event.location || 'No location',
      };
    });

    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).send('Failed to fetch calendar events.');
  }
});

  
//////////////////////////
// Signing in / Signing up
//////////////////////////
app.post('/api/sign-up', async (req, res) => {
  let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD)

  const {fname, lname, email, password } = req.body

  try {

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    // Generate a unique user_id
    const userId = parseInt(uuidv4().replace(/-/g, '').slice(0, 6), 16);

    await connection.execute(
      'INSERT INTO USERS (user_id, email, fname, lname, password_hash, join_date, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId,email, fname, lname, hashedPassword, new Date(), 'member']
    );



    await connection.end();

    res.status(201).json({ message: 'User created successfully' }); } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error });
    }
});

// Sign-in Route
app.post('/api/sign-in', async (req, res) => {
  let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD)

  const { email, password } = req.body;

  try {

    /**
     * @typedef {list|null} rows
     * @description a list of hashmaps storing user_id and password_hash
     */
    const [rows] = await connection.execute(
      'SELECT user_id, password_hash FROM USERS WHERE email = ?',
      [email]
    );

    // if no element in rows then the user doesn't exist

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // check if the password in our database matches the password entered

    const storedPasswordHash = rows[0].password_hash;

    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Set session Identifier  
    res.cookie("username", rows[0].user_id)

    res.status(200).json({ message: 'Sign-in successful'});

  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});


app.post('/api/sign-out', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Failed to log out" });
    }
    res.clearCookie('username');
    res.clearCookie('connect.sid');
    
    res.status(200).send({ message: "Logged out successfully" });
  });
});

app.post('/api/new_registration', async (req, res) => { 
  let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);

  const { attendance_time, email, member_name, questions} = req.body;
  console.log(attendance_time, email, member_name, questions)
  try {
    // Generate a unique id
    const id = parseInt(uuidv4().replace(/-/g, '').slice(0, 6), 16);

    // Insert into the database
    await connection.execute(
      'INSERT INTO SIGNUP_FORMS (attendance_time, email, id, name, questions, submitted_at) VALUES (?, ?, ?, ?, ?, ?)',
      [attendance_time, email, id, member_name, questions,  new Date()]
    );

    // End the connection
    await connection.end();

    // Send a success response
    res.status(200).send('Registration successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in registration.');
  }
});

app.get('/profile', async (req, res) => {
  try {
    let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);
    const userId = req.cookies['username'];

    const [rows] = await connection.execute(
      'SELECT user_id, fname, lname, email, role, bio, profile_picture FROM USERS WHERE user_id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
