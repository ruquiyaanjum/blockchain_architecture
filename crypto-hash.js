//// Import the crypto module from Node.js for cryptographic functions
//const crypto = require("crypto");
//// Define a function to create a SHA-256 hash from input values
//const cryptoHash = (...inputs) => {
//// Create a new SHA-256 hash object
//const hash = crypto.createHash("sha256");
//// Sort the input values, join them into a single string, and update the hash with
//this string
//hash.update(inputs.sort().join("")); // e.g., for inputs "world" and "hello", this
//would result in "helloworld"
//// Return the resulting hash in hexadecimal format
//return hash.digest("hex");
//};
//// Example usage (commented out)
//// result = cryptoHash("world", "hello"); // Uncomment to see the result of hashing
//// Export the cryptoHash function for use in other files
//module.exports = cryptoHash;
//// Uncomment the following line to log the result of the hashing (currently
//commented out)
//// console.log(result);

// Import the crypto module from Node.js for cryptographic functions
const crypto = require("crypto");

// Define a function to create a SHA-256 hash from input values
const cryptoHash = (...inputs) => {
  // Create a new SHA-256 hash object
  const hash = crypto.createHash("sha256");

  // Sort the input values, join them into a single string, and update the hash with the string
  hash.update(inputs.sort().join("")); // This correctly updates the hash with sorted input

  // Return the resulting hash in hexadecimal format
  return hash.digest("hex");
};

// Example usage (commented out)
// result = cryptoHash("world", "hello"); // Uncomment to see the result of hashing

// Export the cryptoHash function for use in other files
module.exports = cryptoHash;

// Uncomment the following line to log the result of the hashing (currently commented out)
// console.log(result);
