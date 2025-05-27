const xlsx = require('xlsx');
const { connectToDB } = require('./DatabaseConnection.ts');
require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');

// Function to check if a team exists in the database
async function teamExists(connection, teamName) {
  const [rows] = await connection.execute('SELECT team_id FROM HACKATHON_TEAMS WHERE team_name = ?', [teamName]);
  return rows.length > 0;
}

// Function to insert a new team into the database
async function insertTeam(connection, teamName) {
  const [result] = await connection.execute('INSERT INTO HACKATHON_TEAMS (team_name, created_at, updated_at) VALUES (?, NOW(), NOW())', [teamName]);
  return result.insertId;  // Return the inserted team_id
}

// Function to update team members
async function updateTeamMembers(connection, teamId, memberEmails) {
  const updatePromises = memberEmails.map(email => 
    connection.execute('UPDATE TEAM_MEMBERS SET team_id = ? WHERE user_email = ?', [teamId, email])
  );
  
  await Promise.all(updatePromises);
}

// Function to process the teams and members
async function processTeams() {
  const results = [];
  
  // Read the CSV file
  fs.createReadStream('./Cleaned_Team_Data.csv')  // Path to your CSV file
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        // Establish database connection
        const connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD, 'hackathon');

        // Process each row from the CSV file
        for (let row of results) {
          const teamName = row['Team Name'];
          const teamMembers = row['Team Members'].split(',').map(name => name.trim());
          const teamMemberEmails = row['Team Member Emails'].split(';').map(email => email.trim());

          // Step 1: Check if the team already exists
          const exists = await teamExists(connection, teamName);

          if (!exists) {
            // Step 2: Insert the team into the HACKATHON_TEAMS table if it doesn't exist
            const teamId = await insertTeam(connection, teamName);
            console.log(`Team "${teamName}" created with team_id: ${teamId}`);

            // Step 3: Update team members in TEAM_MEMBERS table
            await updateTeamMembers(connection, teamId, teamMemberEmails);
            console.log(`Updated members for team "${teamName}"`);
          } else {
            console.log(`Team "${teamName}" already exists, skipping insertion.`);
          }
        }

        console.log('Team registration and member updates completed successfully!');
      } catch (err) {
        console.error('Error occurred:', err);
      }
    });
}

// Run the process
processTeams();