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
    noEmployees: String
  },
  { collection: "employees" }
);
const EmployeeModel = mongoose.model("employeeInfo", blogSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
});

router.post("/setNoEmployees", async function (req, res, next) {
  console.log(req.body)
  const data = await EmployeeModel.updateOne({}, req.body,{upsert: true});
  //var data = new EmployeeModel(req.body)
  //EmployeeModel.updateOne({}, data);
  //const data = new EmployeeModel({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  //data.overwrite(req.body);
  //data.save()
  res.end()
});

router.post("/getNoEmployees", function (req, res, next) {
  //let theDoc = EmployeeModel.findOne({_id : ObjectId("6222018bb2e6654c58c8cb22")});
  EmployeeModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getNoEmployees: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

router.get("/getAir", function (req, res, next) {
  airModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getAir: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

module.exports = router;
