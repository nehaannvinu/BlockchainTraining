// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NAVI is ERC721 {
    constructor() ERC721("NAVI Coin", "NAVI") {
    }
}