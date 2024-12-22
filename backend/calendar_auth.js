const { google } = require('googleapis');
const path = require('path');

// OfficialCUDenverAI Club google calendar authentication
const authenticateServiceAccount = () => {
  // Optionally, use an environment variable for the path of the service account file
  const SERVICE_ACCOUNT_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'cudenveraicalendar-23d94fc6babc.json');
  
  // Ensure you have the correct scope for the access you need
  const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: SCOPES,
    });

    // Return the authenticated client
    return auth;
  } catch (error) {
    console.error('Error authenticating Google API:', error);
    throw error;  // Re-throw the error if you want to handle it elsewhere
  }
};

module.exports = authenticateServiceAccount;