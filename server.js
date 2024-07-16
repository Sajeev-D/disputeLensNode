const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
//const { google } = require("googleapis");
//const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/extra', express.static(path.join(__dirname, 'extra')));


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/////////////Code for google cloud console and google sheets api
/* 
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

//Serve the index.html
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the chat.html
app.get('/chat', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


// OpenAI configuration (Code to setup Interaction with Chat GPT)
const configuration = new Configuration({
    apiKey: 'sk-proj-OJ1NfhlIhSENOX7bf1yTT3BlbkFJNXshFv2eOjkxWQDRne1m' // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

let chatHistory = "";

// Handle the initial prompt
app.post('/start_chat', async function (request, response) {
    const { info } = request.body;
    const initialPrompt = `You are an assistant helping with renovation projects. Here is some initial information: ${info}`;
    chatHistory = initialPrompt;
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: chatHistory,
            max_tokens: 150
        });
        chatHistory += `\nGPT: ${completion.data.choices[0].text}`;
        response.json({ message: completion.data.choices[0].text });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        response.status(500).send('Server Error');
    }
});

// Handle user messages
app.post('/send_message', async function (request, response) {
    const { message } = request.body;
    chatHistory += `\nUser: ${message}`;
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: chatHistory,
            max_tokens: 150
        });
        chatHistory += `\nGPT: ${completion.data.choices[0].text}`;
        response.json({ message: completion.data.choices[0].text });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        response.status(500).send('Server Error');
    }
});




app.listen(2000, function () {
    console.log("Server is up at port 2000");
});
