// Importimi i framework express
const express = require("express");
// Therrija e metodave te express
const app = express();
// Importimi i librarise mongoose
const mongoose = require('mongoose')
// Importimi i librarise multer, upload i imazheve
const multer = require("multer")
// Importimi i librarise uuid-v4 per gjenerim e id qe do te perdoret per
//emertimin e imazheve
const {v4: uuidv4 } = require('uuid')
// Importimi i metodes path e cila eshte e integruar nga node/express
const path = require("path")
// Importimi i modeleve
const itemModel = require("../models/item")


// Konfigurimet e nevojshme per upload e imazheve ne mongoDB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images');
    },
    filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
    })
    const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
    } else {
    cb(null, false)
    }}
    let upload = multer({ storage, fileFilter })

    app.post("/create", upload.single('photo'), async (req, res) => {
        try {
        // Merrja dhe ruajtja te dhenat nga frontend (input-et e form-es, React)
        const newItem = new itemModel({
        ...req.body,
        // Imazhi
        photo: req.file.filename });
        // Ruajtje e te dhenave ne mongo DB
        await newItem.save();
        console.log(newItem)
        // Mesazhi i suksesit
        res.status(200).send(newItem);
        } catch (err) {
        console.error("Error creating item:", err);
        // Nese ka gabime nga ana e funksionit
        res.status(500).send("Not created" + err);
        }
        });

        //Route Read All
app.get("/readAll", async (req, res) => {
try {
// Gjen dhe ruan te gjitha informacionet nga modeli; {} === te gjithe
//elementet
const items = await itemModel.find({});
// Kalimi i informacionit ne frontend dhe mesazhi i suksesit
console.log(items)
res.status(200).send(items);
} catch (err) {
// Nese ka gabime nga ana e funksionit
console.log("Date not shown" + err)
res.status(500).send("Date not shown" + err);
}
});

//Route Read One
// Tek path kemi nevoje per nje info unike; mund te jete id ose slug
// id e marrin nga DB; slug e krijojme si fushe/key tek models
app.get("/readOne/:id", async (req, res) => {
try {
// Marrja e vleres se id-se nga frontend (e merr nga useParams dhe /Route)
const itemId = req.params.id;
// Gjetja e elementit me id e kerkuar
const item = await itemModel.findById({ _id: itemId });
// Kalimi i infomacionit ne frontend dhe mesazhi i suksesit
res.status(200).send(item);
} catch (err) {
// Nese ka gabime nga ana e funksionit
console.log("Info not shown " + err);
res.status(500).send("Info not shown " + err);
}
});


//Route Update
// Perdoret metoda patch:update nje ose disa fusha
app.patch("/update/:id", upload.single('photo'), async (req, res) => {
try {
// Marrja e vleres se id-se nga frontend (e merr nga useParams dhe
//Route)
const itemId = req.params.id;
// Merrja dhe ruajtja te dhenat te ndryshuara nga frontend (input-et e
//form-es ne React)
const itemInfo = {...req.body};
// Kontrolli nese imazhi/foto eshte ndryshuar
if (req.file) {
itemInfo.photo = req.file.filename;
}
// Update ne mongo DB
// $set - tregon qe do te behet update me te dhenat e reja
// new:true - duhet te ktheje si pergjigje elementin e update-uar
const itemUpdated = await itemModel.findByIdAndUpdate(
{_id: itemId},
{$set: itemInfo},
{new: true}
);
// Kalimi i infomacionit ne frontend dhe mesazhi i suksesit
console.log("Data update" + itemUpdated);
res.status(200).send(itemUpdated);
} catch (err) {
// Nese ka gabime nga ana e funksionit
console.log("Item not updated " + err);
res.status(500).send("Item not updated " + err);
}
});

//Delete
// Delete - Perdoret metoda delete
app.delete("/delete/:id", async (req, res) => {
    try {
    // Marrja e vleres se id-se nga frontend (e merr nga useParams dhe
    //Route)
    const itemId = req.params.id;
    // Fshirja e elementit me id e percaktuar
    await itemModel.deleteOne({_id: itemId });
    // Mesazhi i suksesit
    console.log("Item Deleted");
    res.status(200).send("Item Deleted");
    } catch (err) {
    // Nese ka gabime nga ana e funksionit
    console.log("Item not deleted " + err);
    res.status(500).send("Item not deleted " + err); }

    });

// Therritja e Route
const itemRouter = require("./routes/itemRouter");
// images emri i folderit te krijuar per ruajtjen e imazheve
app.use("/images", express.static(path.join(__dirname, "/images")));
// Therrit router
app.use(itemRouter);

