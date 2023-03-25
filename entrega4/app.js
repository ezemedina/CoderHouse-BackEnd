const express = require('express');
const router = require('./routes/index.routes')
const port = 8080 || process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(port, () => {
    console.log(`Listening server ${server.address().port}`);
});
