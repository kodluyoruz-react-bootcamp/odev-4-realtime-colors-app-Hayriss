const redisClient = require("./redis");

function Colors() {
  this.client = redisClient.getClient();  //redise baglantı saglandı
}

module.exports = new Colors();

Colors.prototype.upsert = function (color) {
  this.client.hset("colorHex", color);
};

Colors.prototype.list = function (callback) {
  this.client.hgetall("colorHex", function (err, reply) {
    return callback(reply);
  });
};