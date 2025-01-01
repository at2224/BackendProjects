// client using the front end sends network request through the URL which goes through the network to find the server via IP address.
// Server then reads the request, processes it, and sends a response in the form of HTML to the client
// URL is human-speak for IP address
// URL -> http://localhost:8080
// IP -> 127.0.0.1:8080

// Q: So if URL can be converted to IP address, does changing the path change the IP address? Does it just change the port? 

// define server using express:
const express = require('express'); //use express
const app = express(); // server app
const PORT = 8080;
// app.listen(PORT, () => {})

// nodemon to run dynamic server. Only use in dev env tho not prod. So run `npm install --save-dev nodemon` to do so.
// write `"dev": "nodemon server.js"` in package.json > scripts to run dynamic server in terminal
// write npm run dev to run dev script in package.json (which is now nodemon server.js)
// ctrl c to kill server

// Endpoints (endpoints receive requests). Location/routes of client request methods (get, post, put, delete etc)
app.get('/', (req, res) => {
    console.log("Hello", req.method);
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server has started on ${PORT}`)); // app listens for incoming requests at IP address specifically at the port. goes at end of code
