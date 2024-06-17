const mongoose = require("mongoose");
// Krijohet schema; tabela; modele;
// Informacionet do te ruhen ne formen e nje objekti - key eshte fusha
// Key: name, description, photo, ownerItem;(mund te vendosin edhe
//informacione te tjera){karakteristikat}
// Emrat e key-ve dhe Schema-ve i vendosni ju
const itemSchema = new mongoose.Schema({
// Analogji: key jane emertimet e kolonave ne nje tabele
name: {
type: String,
required: true,
},
description: {
type: String,
},
photo: {
type: String,
}});
// Krijimi i modelit ne mongoDB
const Item = mongoose.model("Item", itemSchema);
//Exportimi i modelit
module.exports = Item;