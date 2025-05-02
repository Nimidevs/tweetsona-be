const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require('path')
const authRoute = require('./routes/auth')
const analyzeRoute = require('./routes/analyze')
const generateRoute = require('./routes/generate')

require("dotenv").config();
const app = express();


const port = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/auth', authRoute)
app.use('/analyze', analyzeRoute)
app.use('/generate', generateRoute)

app.listen(port, () => {
    console.log(`listening at port: ${port}`)
});
