const { ethers } = require("ethers");
const abi = require("../abi.json"); // Import the ABI file

const rpcUrl = "https://bsc-dataseed1.binance.org/";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const contractAddress = "0xbe6Ad1eB9876cf3D3f9b85fEeCfB400298E80143";
const contract = new ethers.Contract(contractAddress, abi, provider);

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const totalSupply = await contract.totalSupply();
      const circulatingSupply = totalSupply.mul(90).div(100); // Calculate circulating supply
      res.send(circulatingSupply.toString()); // Return only the value as plain text
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch circulating supply"); // Plain text error message
    }
  } else {
    res.status(405).send("Method Not Allowed"); // Plain text method not allowed message
  }
};