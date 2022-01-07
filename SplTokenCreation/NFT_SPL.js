var web3 = require("@solana/web3.js");
var splToken = require("@solana/spl-token");

(async () => {
  // Connect to cluster
  var connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  const mySecretKey = new Uint8Array([
    238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
    228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4,
    68, 94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59,
    86, 229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
  ]);

  var myKeyPair = web3.Keypair.fromSecretKey(mySecretKey);

  //create new token mint
  let mint = await splToken.Token.createMint(
    connection,
    myKeyPair,
    myKeyPair.publicKey,
    null,
    9,
    splToken.TOKEN_PROGRAM_ID
  );

  //get the token account of the myKeyPair Solana address, if it does not exist, create it
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    myKeyPair.publicKey
  );

  console.log("Token address of NFT: " + fromTokenAccount.address.toBase58());

  //minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mint.mintTo(
    fromTokenAccount.address, //who it goes to
    myKeyPair.publicKey, // minting authority
    [], // multisig
    1 * web3.LAMPORTS_PER_SOL // how many
  );

  await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    myKeyPair.publicKey,
    []
  );

  console.log("Finshed minting");
})();
