const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const keypair1 = web3.Keypair.fromSecretKey(
  new Uint8Array([
    238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
    228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4,
    68, 94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59,
    86, 229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
  ])
);

const keypair2 = web3.Keypair.fromSecretKey(
  new Uint8Array([
    97, 105, 9, 158, 248, 111, 198, 71, 103, 96, 160, 179, 212, 114, 84, 51,
    232, 209, 115, 128, 27, 104, 42, 225, 168, 135, 123, 172, 63, 71, 146, 41,
    1, 252, 232, 12, 123, 77, 134, 152, 137, 72, 243, 39, 213, 138, 25, 64, 55,
    138, 151, 99, 163, 21, 128, 144, 222, 250, 255, 104, 38, 133, 111, 82,
  ])
);

const keypair3 = web3.Keypair.fromSecretKey(
  new Uint8Array([
    101, 93, 177, 29, 99, 58, 37, 51, 186, 118, 107, 246, 168, 61, 118, 92, 62,
    63, 72, 201, 221, 13, 49, 248, 39, 189, 198, 145, 186, 238, 85, 74, 80, 153,
    243, 7, 39, 185, 215, 140, 70, 249, 246, 110, 10, 34, 231, 216, 240, 237,
    174, 40, 214, 171, 45, 29, 81, 165, 95, 130, 38, 249, 146, 181,
  ])
);

const minSigners = [keypair1, keypair2];
const signers = [keypair1.publicKey, keypair2.publicKey, keypair3.publicKey];

console.log("Public Key 1 : " + keypair1.publicKey);
console.log("Public Key 2 : " + keypair2.publicKey);
console.log("Public Key 3 : " + keypair3.publicKey);

setTimeout(async function () {
  const tk = new splToken.Token(
    connection,
    keypair1.publicKey,
    splToken.TOKEN_PROGRAM_ID,
    keypair1
  );

  //constructing multsig address
  let multisig = await tk.createMultisig(2, signers);
  console.log("Address of multisig:" + multisig);

  //Creating a mint
  let mint = await splToken.Token.createMint(
    connection,
    keypair1, //payer
    multisig, //mint authority
    multisig, //freeze authority
    9,
    splToken.TOKEN_PROGRAM_ID
  );
  console.log("Mint address" + mint.publicKey.toBase58());

  let myToken = await mint.getOrCreateAssociatedAccountInfo(keypair1.publicKey);
  console.log("Token public address: " + myToken.address.toBase58());

  await mint.mintTo(
    myToken.address,  //dest
    multisig, //authority
    minSigners, //min no. of signers 
    100 * web3.LAMPORTS_PER_SOL //amount
  );
}, 2000);
