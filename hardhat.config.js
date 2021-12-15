/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 
 module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "ropsten",
   networks: {
     hardhat: {},
     ropsten: {
       url: "https://ropsten.infura.io/v3/f1f7644d6c0046f38d8d8550a23f60d4",
       accounts: [`735c7ad3de455cc1895dacf010e67bf2f522f12d3df43d3b67bff285736d4570`], 
     },
   },
 };