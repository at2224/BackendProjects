import express from 'express'; // more modern importing syntax. add `"type": "module",` to package.json
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

// Q: When to destructure imports?
// A: When you only need one export (coding package) from an import module

const app = express();
const PORT = process.env.PORT || 5000;

// Look or HTML files and send them back as a result
// get file path from url of current module
const __filename = fileURLToPath(import.meta.url); // get access to file name
// get dir name from file path
const __dirname = dirname(__filename); // get access to dir name

// serve all files from /public dir
//middleware
// when user visits a web page, the server has to serve them a static or dynamic html page. Here we use static
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
// serving up html file from the /public dir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has started on PORT: ${PORT}`);
});

