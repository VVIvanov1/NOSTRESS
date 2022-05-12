const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors')

const app = express();
app.use(cors({origin:'project5380228.tilda.ws'}))
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
})

router.post('/testpost',(req,res) => {
    res.json({
        hello: "hit the POST!"
      });
})

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);