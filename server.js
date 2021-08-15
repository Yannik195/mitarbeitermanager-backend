const express = require('express')
const app = express()
const port = 3000

//ENV
require("dotenv/config")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Database
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to DB")
});

const employeeRoute = require("./routes/employees")

app.use("/employees", employeeRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})