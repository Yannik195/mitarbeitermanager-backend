const express = require('express')
const app = express()
const port = 3000

// ÄNDERUNG

//cors
const cors = require("cors")
app.use(cors())

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


//Routes
const employeeRoute = require("./routes/employees")
const loginRoute = require("./routes/login")

app.use("/employees", employeeRoute)
app.use("/login", loginRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})