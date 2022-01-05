const web3 = require("@solana/web3.js");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

let pk = new Uint8Array([
  238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
  228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4, 68,
  94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59, 86,
  229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
]);

const myKeyPair = web3.Keypair.fromSecretKey(pk);

const airdropSign = await connection.requestAirdrop(myKeyPair.publicKey, web3.LAMPORTS_PER_SOL);