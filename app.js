const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; // Choose a unique port for your application

// Enable Express's built-in JSON parsing middleware
app.use(express.json());

// Define endpoints for PUT and POST requests at '/message'
app.put('/message', handleRequest);
app.post('/message', handleRequest);

// This function handles incoming requests
function handleRequest(req, res) {
    const timestamp = new Date().toISOString();
    const logMessage = `Logged! (${timestamp}) The Message is: ${JSON.stringify(req.body)}\n`;

    // Append the timestamp and JSON body to the log file
    fs.appendFile('webrtc-listener-log.txt', logMessage, function (err) {
        if (err) {
            logError(err);
            return res.status(500).send('An error occurred'); // Send a 500 status if there was an error writing to the log
        }
        console.log(logMessage); // Also log the message to the console
        res.send('Received');
    });
}

// This function logs errors to a separate file
function logError(err) {
    const timestamp = new Date().toISOString();
    const errorMessage = `${timestamp} - ${err.toString()}\n`;

    // Append the error message to the error log
    fs.appendFile('webrtc-listener-error.log', errorMessage, function (error) {
        if (error) console.error('Error logging the error: ', error); // Log to the console if there was an error writing to the error log
    });
}

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
