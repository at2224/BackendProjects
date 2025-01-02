import express from 'express' // more modern importing syntax. add `"type": "module",` to package.json

const app = express();
const PORT = process.env.PORT || 5000;

console.log('hello world');

app.listen(PORT, () => {
    console.log(`Server has started on PORT: ${PORT}`);
});

