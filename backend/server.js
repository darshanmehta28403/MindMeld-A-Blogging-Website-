require('dotenv').config()
const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

const blogroute = require('./routes/blogRoutes')
const userroute = require('./routes/userRoutes')
const tagroute = require('./routes/tagRoutes')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/readblog/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', (req, res, next) => {
    console.log(req.path, req.method);
    // res.json({ message: 'Here is the response' });
    next(); // Remove or keep it based on your requirements
});

app.use('/api/blogs', blogroute)
app.use('/api/users', userroute)
app.use('/api/tags', tagroute)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Connected to db and listening on port ',process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})

app.get(('/'), (req, res)=>{
    res.json({mssg: "Hello Response !"})
})