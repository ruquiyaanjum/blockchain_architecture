// Define the mining rate in milliseconds (1000ms = 1 second)
const MINE_RATE = 1000; // Time taken to mine a block is set to 1 second
// Set the initial difficulty level for mining blocks
const INITIAL_DIFFICULTY = 2;
// Define the data for the genesis block (the first block in the blockchain)
const GENESIS_DATA = {
timestamp: 1, // The timestamp for the genesis block (arbitrary value)
prevHash: "0x000", // Hash of the previous block (none for the genesis block)
hash: "0x123", // Hash of the genesis block (example value)
difficulty: INITIAL_DIFFICULTY, // Set the difficulty for the genesis block
nonce: 0, // Nonce value for the genesis block (initially zero)
data: [], // Data array for the genesis block (empty initially)
};
// Export the configuration constants for use in other files
module.exports = { GENESIS_DATA, MINE_RATE };