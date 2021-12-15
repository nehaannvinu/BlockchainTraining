/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
var key = require('./privatekey');


let pkey = key.result; 


const { API_URL} = process.env;

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${pkey}`], 
    },
  },
};
