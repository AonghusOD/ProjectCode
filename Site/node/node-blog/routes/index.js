let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
mongoose.connect("localhost:27017/blog");
let Schema = mongoose.Schema;

const airSchema = new Schema(
  {
    airReading: String
  },
  { collection: "air" }
); 
const airModel = mongoose.model("airInfo", airSchema);


let blogSchema = new Schema(
  {
    noMessages: String
  },
  { collection: "message" }
);
const MessagesModel = mongoose.model("messagesInfo", blogSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
});

router.post("/setNoMessages", async function (req, res, next) {
  console.log(req.body)
  const data = await MessagesModel.updateOne({}, req.body,{upsert: true});
  //var data = new MessagesModel(req.body)
  //MessagesModel.updateOne({}, data);
  //const data = new MessagesModel({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  //data.overwrite(req.body);
  //data.save()
  res.end()
});

router.post("/getNoMessages", function (req, res, next) {
  //let theDoc = MessagesModel.findOne({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  MessagesModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getNoMessages: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

router.post("/getAir", function (req, res, next) {
  airModel.find().then(function (docs) {
    //wrong thing
    let theDoc = docs[docs.length-1]
     //console.log("/getAir: " + theDoc)
     docs = JSON.stringify(docs)
     console.log("/getAir: docs" + docs)
    //theDoc = JSON.stringify(theDoc)
    //res.status(200).json(theDoc)
    res.status(200).json(docs)
  });
});

module.exports = router;
