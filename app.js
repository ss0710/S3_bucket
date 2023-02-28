require("dotenv").config();
var express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");

var { uploadFile, getFileStream } = require("./s3");

var app = express();
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/images/:key", (req, res) => {
  var key = req.params.key;

  var readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images", upload.single("image"), (req, res) => {
  //   console.log(req.file);
  uploadFile(req.file, function (result, error) {
    if (result) {
      console.log(result);
    } else {
      console.log(error);
    }
  });
  res.send("all good");
});

app.listen(8000, function (req, res) {
  console.log("server listening on port 8000");
});
