const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Change this to your desired port

// Define a route to handle GET requests
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'screenshot.png');

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send('File not found');
    }

    // Stream the file to the response
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
