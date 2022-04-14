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
    airReading: String,
    Temp: String,
    Hum: String,
    LUX: String,
    PH: String,
    TDS: String,
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
  //var data = new MessagesModel(req.body)
  //MessagesModel.updateOne({}, data);
  //const data = new MessagesModel({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  //data.overwrite(req.body);
  //data.save()
  res.end();
});

router.post("/getNoMessages", function (req, res, next) {
  //let theDoc = MessagesModel.findOne({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  MessagesModel.find().then(function (docs) {
    let theDoc = docs[docs.length - 1];
    console.log("/getNoMessages: " + theDoc);
    // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc);
  });
});

router.post("/getAir", function (req, res, next) {
  airModel.find().then(function (docs) {
    //wrong thing
    let theDoc = docs[docs.length - 1];
    //console.log("/getAir: " + theDoc)
    docs = JSON.stringify(docs);
    console.log("/getAir: docs" + docs);
    //theDoc = JSON.stringify(theDoc)
    //res.status(200).json(theDoc)
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

// device.send(payload).then(
//   (data) => {
//     var data = new airModel(payload)
//       data.save()
//   },
//   (error) => {
//     // error handling.
//   }
// );

// We connect our client to AWS  IoT core.
device.on("connect", function () {
  console.log("STEP - Connecting to AWS  IoT Core");
  console.log(
    "---------------------------------------------------------------------------------"
  );
  device.subscribe("esp32/pub");
  device.subscribe(deviceRoot);
  //airModel.updateOne({}, deviceRoot,{upsert: true});
  //  sendData("signInEtcTopic", {connectStatus: "node.js is connected"})
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
  // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
  //   if (error) {
  //     console.error(error)
  //   }
  // })

  //var newData = new airModel(payload.body());
  //var data = new airModel(JSON.stringify(payload));
  //data.save();
});

// device.send(payload {
//   console.log("message", topic, payload.toString());
//   var data = new airModel(payload);
//   data.save()
// });

device.on("error", function (topic, payload) {
  console.log("Error:", topic, payload.toString());
});


// device.on("message", insertEvent);


// function insertEvent(topic,payload) {
//   console.log(topic + ":" + payload)
//   var key=topic.replace(deviceRoot,'');
//   console.log(payload.Hum)
  //var data = new airModel(payload.Hum)
  //data.save()
  //airModel.update({}, { $set: { Hum: 'foo' } });
//   airModel.update(
//   { _id:key }, 
//   { $push: { events: { event: {  value:payload, when:new Date() } } } }, 
//   { upsert:true },

//   function(err,docs) {  
//   if(err) {
//      console.log("Insert fail")// Improve error handling       
//     }
// }

// );

//}

module.exports = router;