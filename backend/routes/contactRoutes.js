const express = require ("express")
const contactModel = require("../models/contactModel")
const app= express()



// Create, add
app.post('/create', async(req,res) => {
    try {
     const newContact = new contactModel(req.body)
     await newContact.save()
     res.status(200).send("Marr laps e leter me tpkituru")
    }catch (err){
      console.log("Error:"+err)
      res.status(500).send(err)
    }
})



module.exports = app