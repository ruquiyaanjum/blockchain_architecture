//// Import the hex-to-binary library for converting hexadecimal to binary
//const hexToBinary = require("hex-to-binary");
//// Import constants for the genesis block data and mining rate from the config file
//const { GENESIS_DATA, MINE_RATE } = require("./config");
//// Import the cryptoHash function for generating hashes
//const cryptoHash = require("./crypto-hash");
//// Define the Block class to represent a single block in the blockchain
//class Block {
//// Constructor to initialize a block with its properties
//constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
//this.timestamp = timestamp; // Time when the block was created
//this.prevHash = prevHash; // Hash of the previous block
//this.hash = hash; // Hash of the current block
//this.data = data; // Data stored in the block
//this.nonce = nonce; // Number used for mining the block
//this.difficulty = difficulty; // Difficulty level for mining
//}
//// Static method to create the genesis block (the first block in the blockchain)
//static genesis() {
//return new this(GENESIS_DATA); // Return a new block with genesis data
//}
//// Static method to mine a new block based on the previous block and new data
//static mineBlock({ prevBlock, data }) {
//let hash, timestamp; // Initialize variables for hash and timestamp
//const prevHash = prevBlock.hash; // Get the hash of the previous block
//let { difficulty } = prevBlock; // Get the difficulty level from the previous
//block
//let nonce = 0; // Initialize nonce to 0
//do {
//nonce++; // Increment the nonce for each attempt
//timestamp = Date.now(); // Get the current timestamp
//// Adjust the difficulty based on the previous block and current timestamp
//difficulty = Block.adjustDifficulty({
//originalBlock: prevBlock,
//timestamp,
//});
//// Generate a new hash using the current values
//hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
//} while (
//// Continue looping until the hash meets the difficulty requirement
//hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
//);
//// Return a new block with the mined values
//return new this({
//timestamp,
//prevHash,
//data,
//difficulty,
//nonce,
//hash,
//});
//}
//// Static method to adjust the mining difficulty based on time taken
//static adjustDifficulty({ originalBlock, timestamp }) {
//const { difficulty } = originalBlock; // Get the original difficulty
//if (difficulty < 1) return 1; // Ensure difficulty doesn't drop below 1
//const difference = timestamp - originalBlock.timestamp; // Calculate time
//difference
//// If mining took too long, decrease difficulty; otherwise, increase it
//if (difference > MINE_RATE) return difficulty - 1; // Decrease difficulty
//return difficulty + 1; // Increase difficulty
//}
//}
//// Example of creating a block with specific properties
//const block1 = new Block({
//hash: "0xacb", // Example hash
//timestamp: "2/09/22", // Example timestamp
//prevHash: "0xc12", // Example previous hash
//data: "hello", // Example data
//});
//// Uncomment to create and log the genesis block
//// const genesisBlock = Block.genesis();
//// console.log(genesisBlock);
//// Uncomment to mine a new block based on block1 and log the result
//// const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
//// console.log(result);
//// // Uncomment to log block1
//// console.log(block1);
//// Export the Block class for use in other files
//module.exports = Block;


// Import the hex-to-binary library for converting hexadecimal to binary
const hexToBinary = require("hex-to-binary");
// Import constants for the genesis block data and mining rate from the config file
const { GENESIS_DATA, MINE_RATE } = require("./config");
// Import the cryptoHash function for generating hashes
const cryptoHash = require("./crypto-hash");

// Define the Block class to represent a single block in the blockchain
class Block {
  // Constructor to initialize a block with its properties
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp; // Time when the block was created
    this.prevHash = prevHash; // Hash of the previous block
    this.hash = hash; // Hash of the current block
    this.data = data; // Data stored in the block
    this.nonce = nonce; // Number used for mining the block
    this.difficulty = difficulty; // Difficulty level for mining
  }

  // Static method to create the genesis block (the first block in the blockchain)
  static genesis() {
    return new this(GENESIS_DATA); // Return a new block with genesis data
  }

  // Static method to mine a new block based on the previous block and new data
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp; // Initialize variables for hash and timestamp
    const prevHash = prevBlock.hash; // Get the hash of the previous block
    let { difficulty } = prevBlock; // Get the difficulty level from the previous block
    let nonce = 0; // Initialize nonce to 0

    do {
      nonce++; // Increment the nonce for each attempt
      timestamp = Date.now(); // Get the current timestamp
      // Adjust the difficulty based on the previous block and current timestamp
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      // Generate a new hash using the current values
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      // Continue looping until the hash meets the difficulty requirement
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    // Return a new block with the mined values
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  // Static method to adjust the mining difficulty based on time taken
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock; // Get the original difficulty
    if (difficulty < 1) return 1; // Ensure difficulty doesn't drop below 1
    const difference = timestamp - originalBlock.timestamp; // Calculate time difference
    // If mining took too long, decrease difficulty; otherwise, increase it
    if (difference > MINE_RATE) return difficulty - 1; // Decrease difficulty
    return difficulty + 1; // Increase difficulty
  }
}

// Export the Block class for use in other files
module.exports = Block;
