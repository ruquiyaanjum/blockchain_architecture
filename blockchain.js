// Import necessary modules and classes
const Block = require("./block");
const cryptoHash = require("./crypto-hash");
class Blockchain {
constructor() {
this.chain = [Block.genesis()]; // Start the chain with the genesis block
}
addBlock({ data }) {
const newBlock = Block.mineBlock({
prevBlock: this.chain[this.chain.length - 1],
data,
});
this.chain.push(newBlock); // Add the new block to the chain
}
replaceChain(chain) {
if (chain.length <= this.chain.length) {
console.error("The incoming chain is not longer");
return;
}
if (!Blockchain.isValidChain(chain)) {
console.error("The incoming chain is not valid");
return;
}
this.chain = chain; // Replace the chain with the new valid chain
}
static isValidChain(chain) {
if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
return false; // Validate the genesis block
}
for (let i = 1; i < chain.length; i++) {
const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
const lastDifficulty = chain[i - 1].difficulty;
const realLastHash = chain[i - 1].hash;
if (prevHash !== realLastHash) return false;
const validatedHash = cryptoHash(
timestamp,
prevHash,
nonce,
difficulty,
data
);
if (hash !== validatedHash) return false;
if (Math.abs(lastDifficulty - difficulty) > 1) return false;
}
return true; // Return true if the chain is valid
}
}
module.exports = Blockchain;