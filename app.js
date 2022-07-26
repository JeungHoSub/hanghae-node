
// const mongoose = require("mongoose");
const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

 /* mongoose.connect("mongodb+srv://wlwjsan:!jeunga1125@cluster0.yrmjgdx.mongodb.net/test123?retryWrites=true&w=majority")
    .then(function(aaa) {
        console.log("연결성공")
    })
    .catch(function(bbb) {
        console.log(bbb);
        console.log("연결실패");
    })
    
    */

const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");


const requestMiddelware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.json());
app.use(requestMiddelware);

app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!");
});

// 자바스크립트라는 언어로 코드를 짜고 node.js로 실행을 했지만 express.js라는 도구를 이용해서 만들었어요
