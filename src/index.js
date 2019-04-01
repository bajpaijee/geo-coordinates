import "babel-polyfill";
import cluster from "cluster";

if (cluster.isMaster) {
  var numWorkers = require("os").cpus().length;
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  cluster.on("online", function() {});

  cluster.on("exit", function() {
    cluster.fork();
  });
} else {
  require("./server.js");
}
