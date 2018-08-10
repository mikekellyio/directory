import AWS from "aws-sdk";
import State from "./State";

var albumBucketName = "mbcl-2018-directory";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:ffbace8d-3347-40d4-9970-f1ee5a4477ea";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});

var addPhotos = (files, albumName) => {
  return files.map(file => {
    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + "//";

    var photoKey = albumPhotosKey + fileName;
    var data = s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      },
      function(err, data) {
        if (err) {
          State.emit("notify", "error", err.message);
          return;
        }
        State.emit("photo:uploaded", data);
      }
    );
    return data;
  });
};

export default addPhotos;
