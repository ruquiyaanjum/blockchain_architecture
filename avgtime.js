// Import the Blockchain class from the blockchain module
const Blockchain = require("./blockchain");
// Create a new instance of the Blockchain
const blockchain = new Blockchain();
// Add a new block with the data "new data" to the blockchain
blockchain.addBlock({ data: "new data" });
// Log the last block in the chain to the console
console.log(blockchain.chain[blockchain.chain.length - 1]);
// Initialize variables to keep track of timestamps and time differences
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;
// Create an array to store the time taken to mine each block
const times = [];
// Loop 1000 times to add blocks to the blockchain
for (let i = 0; i < 1000; i++) {
// Get the timestamp of the last block added to the blockchain
prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
// Add a new block with data indicating its index (e.g., "block 0", "block 1", etc.)
blockchain.addBlock({ data: `block ${i}` });
// Get the newly added block
nextBlock = blockchain.chain[blockchain.chain.length - 1];
// Get the timestamp of the newly added block
nextTimestamp = nextBlock.timestamp;
// Calculate the time difference between the new block's timestamp and the
previous block's timestamp
timeDiff = nextTimestamp - prevTimestamp;
// Add the time difference to the array of times
times.push(timeDiff);
// Calculate the average time taken to mine blocks so far
averageTime = times.reduce((total, num) => total + num) / times.length;
// Log the time taken to mine the current block, its difficulty, and the average
time taken to mine blocks
console.log(
`Time to mine block :${timeDiff}ms,Difficulty:${nextBlock.difficulty},Average
time:${averageTime}ms`
);
}