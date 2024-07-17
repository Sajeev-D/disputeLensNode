const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//const { google } = require("googleapis");
const fs = require("fs");
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/extra', express.static(path.join(__dirname, 'extra')));

/////////////Code for google cloud console and google sheets api
/* 
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Load the service account key file
const keyFilePath = 'path-to-your-service-account-key.json'; // Replace with the path to service account key file
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Google Sheets ID
const spreadsheetId = 'your-spreadsheet-id'; // Replace with Google Sheets ID


// Route to handle form submissions
app.post('/submit_form', async function (request, response) {
    const { name, email } = request.body;
    if (name && email) {
        try {
            const sheets = google.sheets({ version: "v4", auth });
            const result = await sheets.spreadsheets.values.append({
                spreadsheetId,
                range: "Sheet1!A:B", // Adjust the range as needed
                valueInputOption: "RAW",
                resource: {
                    values: [[name, email]],
                },
            });
            response.send('Form submission successful!');
        } catch (error) {
            console.error("Error writing to Google Sheets:", error);
            response.status(500).send('Server Error');
        }
    } else {
        response.status(400).send('Name and Email are required');
    }
});
 */













// Route to serve the index.html
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(2000, function () {
    console.log("Server is up at port 2000");
});
