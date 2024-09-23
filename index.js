// const express = require("express");
// const { ethers } = require("ethers");
// const abi = require("./abi.json"); // Import the ABI file

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Replace with your Infura or another node provider RPC URL
// const rpcUrl = "https://bsc-dataseed1.binance.org/";
// const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// // Contract address
// const contractAddress = "0xbe6Ad1eB9876cf3D3f9b85fEeCfB400298E80143";
// const contract = new ethers.Contract(contractAddress, abi, provider);

// app.get("/api/total-supply", async (req, res) => {
//   try {
//     const totalSupply = await contract.totalSupply();
//     res.json(totalSupply.toString()); // Return only the value as a string
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch total supply" });
//   }
// });

// app.get("/api/circulating-supply", async (req, res) => {
//   try {
//     const totalSupply = await contract.totalSupply();
//     const circulatingSupply = totalSupply.mul(90).div(100); // Calculate circulating supply
//     res.json(circulatingSupply.toString()); // Return only the value
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch circulating supply" });
//   }
// });
// // Convert BigNumber to string
// // lockedWallet: {
// //   walletAddress: "Wallet #3",
// //   percentage: "10%",
// //   reason: "CoinGecko determined as locked",
// // },
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: "Failed to fetch circulating supply" });
// //   }
// // });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const { ethers } = require("ethers");
const abi = require("./abi.json"); // Make sure this file exists

const rpcUrl = "https://bsc-dataseed1.binance.org/";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const contractAddress = "0xbe6Ad1eB9876cf3D3f9b85fEeCfB400298E80143";
const contract = new ethers.Contract(contractAddress, abi, provider);

module.exports = async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/api/total-supply") {
      try {
        const totalSupply = await contract.totalSupply();
        res.status(200).json(totalSupply.toString());
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch total supply" });
      }
    } else if (req.url === "/api/circulating-supply") {
      try {
        const totalSupply = await contract.totalSupply();
        const circulatingSupply = totalSupply.mul(90).div(100);
        res.status(200).json(circulatingSupply.toString());
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch circulating supply" });
      }
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
