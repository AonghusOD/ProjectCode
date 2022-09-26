let express = require("express");
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog");

const awsIot = require("aws-iot-device-sdk");
deviceRoot = "esp32/pub/";


// Configuring body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const device = awsIot.device({
  clientId: "AonghusMQTT", //AonghusMQTTClient  Your own device name . . . whatever you like
  host: "a8p9udme32jcv-ats.iot.eu-west-1.amazonaws.com", // your IOT setup
  //port: 8883,
  keyPath:
    "./certs/cb200e58a2a2c0207863b7399b96b9f94c483151025c093179680a23bd02184c-private.pem.key", // put these files in same directory as this file
  certPath:
    "./certs/cb200e58a2a2c0207863b7399b96b9f94c483151025c093179680a23bd02184c-certificate.pem.crt",
  caPath: "./certs/AmazonRootCA1.pem",
});

let Schema = mongoose.Schema;

const airSchema = new Schema(
  {
    TEMP: String,
    HUM: String,
    LUX: String,
    PH: Number,
    TDS: String,
    CO2: Number,
    HVOC: Number,
    TIME: String,
    STAMP: String,
  },
  { collection: "air" }
);
const airModel = mongoose.model("airInfo", airSchema);

let blogSchema = new Schema(
  {
    noMessages: String,
  },
  { collection: "message" }
);
const MessagesModel = mongoose.model("messagesInfo", blogSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/setNoMessages", async function (req, res, next) {
  console.log(req.body);
  const data = await MessagesModel.updateOne({}, req.body, { upsert: true });
  res.end();
});

router.post("/getNoMessages", function (req, res, next) {
  MessagesModel.find().then(function (docs) {
    let theDoc = docs[docs.length - 1];
    console.log("/getNoMessages: " + theDoc);
    res.status(200).json(theDoc);
  });
});

router.post("/getAir", function (req, res, next) {
  airModel.find().sort({ _id: -1 }).limit(10).then(function (docs) {
    let theDoc = docs[docs.length - 1];
    docs = JSON.stringify(docs);
    console.log("/getAir: docs" + docs);
    res.status(200).json(docs);
  });
});

router.post("/setAir", async function (req, res, next) {
  console.log(req.body)
  var data = new airModel(req.body)
  data.save()
  res.end()
});

function sendData(topicName, data) {
  console.log("STEP - Sending data to AWS  IoT Core: " + JSON.stringify(data));

  console.log(
    "---------------------------------------------------------------------------------"
  );
  return device.publish(topicName, JSON.stringify(data)); //  "signInEtc" in the topic
}

// We connect our client to AWS  IoT core.
device.on("connect", function () {
  console.log("STEP - Connecting to AWS  IoT Core");
  console.log(
    "---------------------------------------------------------------------------------"
  );
  device.subscribe("esp32/pub");
  device.subscribe(deviceRoot);
});

// Set handler for the device, it will get the messages from subscribers topics.
device.on("message", function (topic, payload) {
  console.log("message", topic, payload.toString());
 
  var stringBuf = payload.toString('utf-8');
  var myobj3 = JSON.parse(stringBuf);

  airModel.insertMany(myobj3, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
  });
 
});



device.on("error", function (topic, payload) {
  console.log("Error:", topic, payload.toString());
});


module.exports = router;