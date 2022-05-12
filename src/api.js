const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/test',(req,res) => {
    res.json({
        hello: "test!"
      });

})

router.post('/newrequest', (req,res) =>{
    
    console.log(req.body);
    res.json({status: 'ok'})
})

router.post('/testpost',(req,res) => {
    res.json({
        hello: "hit the POST!"
      });
})

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);