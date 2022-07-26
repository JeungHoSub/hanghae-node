const mongoose = require("mongoose");


const connect = () => {
   // mongoose.connect("mongodb+srv://wlwjsan:!jeunga1125@cluster0.yrmjgdx.mongodb.net/?retryWrites=true&w=majority").catch((err) => {
    mongoose.connect("mongodb://127.0.0.1:27017/spa_mall", { ignoreUndefined : true })
    .catch((err) => {
        console.error(err);
    });
};

module.exports = connect;

