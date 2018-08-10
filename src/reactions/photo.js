import State from "../State";
import S3Upload from "../S3Upload";
import debug from "debug";

var log = debug("mbcl-directory:reactions:photo");

State.on("photo:upload", files => {
  S3Upload(files, "uploads");
}).on("photo:uploaded", file => {
  log(file);
});
