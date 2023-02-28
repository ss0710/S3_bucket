require("dotenv").config();
var fs = require("fs");
var S3 = require("aws-sdk/clients/s3");

var bucketName = process.env.AWS_BUCKET_NAME;
var region = process.env.AWS_BUCKET_REGION;
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;

var s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload a file to s3
function uploadFile(file, cb) {
  var fileStream = fs.createReadStream(file.path);

  var uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  s3.upload(uploadParams)
    .promise()
    .then(function (result) {
      cb(result, null);
    })
    .catch(function (error) {
      cb(null, error);
    });
}

exports.uploadFile = uploadFile;
