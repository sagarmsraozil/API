const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/database');
const userRoute = require('./routes/userRoute');
const studentRoute = require('./routes/studentRoute');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(userRoute);
app.use(studentRoute);



app.listen(90);