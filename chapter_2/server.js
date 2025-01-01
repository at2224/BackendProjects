// client using the front end sends network request through the URL which goes through the network to find the server via IP address.
// Server then reads the request, processes it, and sends a response in the form of HTML to the client
// URL is human-speak for IP address
// URL -> http://localhost:8080
// IP -> 127.0.0.1:8080

// install steps:
// npm install -y
// npm install express
// npm install --save-dev nodemon
// write `"dev": "nodemon server.js" in package.json > scripts
// write desc in package.json

// Q: So if URL can be converted to IP address, does changing the path change the IP address? Does it just change the port? 
// A: No, just the domain name (example.com) = IP

// start: 
// define server using express:
const express = require('express'); //use express
const app = express(); // server app
const PORT = 8080;
// app.listen(PORT, () => {})


let data = ['james']

// Middleware - protective layer before we hit endpoinds to expect to receive json data
app.use(express.json());

// nodemon to run dynamic server. Only use in dev env tho not prod. So run `npm install --save-dev nodemon` to do so.
// write `"dev": "nodemon server.js"` in package.json > scripts to run dynamic server in terminal
// write npm run dev to run dev script in package.json (which is now nodemon server.js)
// ctrl c to kill server

// Endpoints (endpoints receive requests). Location/routes of client request methods (get, post, put, delete etc)
// app.get('/', (req, res) => {
//     console.log("Hello", req.method);
//     // need to do something with res
//     res.sendStatus(200);
// });



// WEbsite endpoints (sending back html for whe nuser enters a url in browser)

app.get('/', (req, res) => {
    res.send(`
        <body style = "background: pink;color:blue;">
            <h1> DATA: </h1>
            <p> ${JSON.stringify(data)} </p>
            
        </body>
            `);
});

// Q: If I hve a website with mujltile webpages, do I need to do endpoints for each webpage?
// A: Yes

app.get('/dashboard', (req, res) => {
    res.send('<h1> Dashboard </h1>');
});

// API endpoints (client requesting data)
// CRUD create, read update, delete

app.get('/api/data', (req, res) => {
    res.send(data)
});

app.post('/api/data', (req, res) => {
    // create user at sign up button. Client sends network request to server to make the action
    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201);
});

app.listen(PORT, () => console.log(`Server has started on ${PORT}`)); // app listens for incoming requests at IP address specifically at the port. goes at end of code
