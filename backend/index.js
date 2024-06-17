const express = require("express")
const { default: mongoose } = require("mongoose")
const moongoose = require("mongoose")
const cors = require ("cors")
const session = require('express-session')
const contactRoute = require("./routes/contactRoutes")
const app = express()
app.use(cors())
app.use(session({
secret: "This will be secret", resave: false,
saveUninitialized: true,
cookie: { maxAge: 1000 * 60 * 60 * 24}}));
app.use(express.json({ limit: "1000mb", extended: true }));

//mongo DB
mongoose.connect('mongodb+srv://deniluca35:JFwrubmaSnd1quyS@cluster0.aozr0kc.mongodb.net/Barcelona?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Something is wrong", err))


    app.unsubscribe('/', () =>{
    res.send("Hello")
})
 
app.use(contactRoute)
app.listen(5000, () =>{
    console.log("Server Created")
})
