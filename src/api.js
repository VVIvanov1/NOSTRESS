const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();

const requestSchema = new mongoose.Schema({
  page: String,
  url: String,
  headline: String,
  name: String,
  phone: String,
  email: String,
  date: { type: Date },
});

const usr = process.env.USER
const pw = process.env.PASS

async function main(obj) {
  await mongoose.connect(
    `mongodb+srv://${usr}:${pw}@cluster0.tvtvx.mongodb.net/orders?retryWrites=true&w=majority`
  );

  const Order = mongoose.model("Order", requestSchema);
  const ord = new Order({
    page: obj.page,
    url: obj.url,
    headline: obj.headline,
    name: obj.name,
    phone: obj.phone,
    email: obj.email
    
  });
  await ord.save();
}

router.get("/", (req, res) => {
  console.log(req.ips);
  res.json({
    hello: "hi!",
  });
});

router.post("/newrequest", async (req, res) => {
  let d = new Date();
  d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
  let obj = req.body;
  obj.date = d;

  let ress = await main(obj);
  // console.log(ress);
  res.json(obj);
});

router.get("/getrequests", async (req, res) => {
  await mongoose.connect(
    "mongodb+srv://vasily:1981Febr@cluster0.tvtvx.mongodb.net/orders?retryWrites=true&w=majority"
  );
  
  const Order = mongoose.model("Order", requestSchema);

  let orders = await Order.find();
  console.log(orders);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
