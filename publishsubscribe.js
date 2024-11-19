const redis = require("redis");
const CHANNELS = {
TEST: "TEST",
BLOCKCHAIN: "BLOCKCHAIN",
};
class PubSub {
constructor({ blockchain }) {
this.blockchain = blockchain;
this.publisher = redis.createClient();
this.subscriber = redis.createClient();
// Handle connection errors
this.publisher.on("error", (err) => console.error("Redis Publisher Error:", err));
this.subscriber.on("error", (err) => console.error("Redis Subscriber Error:",
err));
this.subscriber.subscribe(CHANNELS.TEST);
this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
this.subscriber.on("message", (channel, message) =>
this.handleMessage(channel, message)
);
}
handleMessage(channel, message) {
console.log(`Message received. Channel: ${channel} Message: ${message}`);
const parsedMessage = JSON.parse(message);
if (channel === CHANNELS.BLOCKCHAIN) {
this.blockchain.replaceChain(parsedMessage);
}
}
publish({ channel, message }) {
this.publisher.publish(channel, message);
}
broadcastChain() {
this.publish({
channel: CHANNELS.BLOCKCHAIN,
message: JSON.stringify(this.blockchain.chain),
});
}
// Graceful shutdown
shutdown() {
this.publisher.quit();
this.subscriber.quit();
}
}
module.exports = PubSub;