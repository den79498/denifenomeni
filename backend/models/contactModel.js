const mongoose= require("mongoose")

const conctatSchema = new mongoose.Schema({
    contactName: {
        type: String,
        require: true  
    },
    contactSurname:{
        type: String,
        require: true
    },
    contactEmail:{
        type: String,
        require: true
    },
    contactComment:{
        type:String,
        require: true
    },
})

const Contact = mongoose.model("Contact", conctatSchema)

module.exports = Contact