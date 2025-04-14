const express = require("express");
const path = require('path')
const authRoute = require('./routes/auth')

require("dotenv").config();
const app = express();


const port = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`listening at port: ${port}`)
});
