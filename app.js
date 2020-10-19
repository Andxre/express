const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');


// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

console.log(mongoose.connection.readyState)




// Execute Express
const app = express();
app.use(bodyParser.json());

// Import Routes
const postsRoute = require('./routes/posts');

// Middlewares - Function that executes when routes are being hit 
app.use(cors());
app.use('/posts', postsRoute);



// Routes
app.get('/', (req, res) => {
    res.send('Main');

});


// Boot up server
app.listen(3000);

