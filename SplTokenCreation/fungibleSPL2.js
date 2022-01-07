require("dotenv").config();

const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

(async () => {
  //create connection to devnet
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  result = await splToken.Token.getMinBalanceRentForExemptAccount(connection);
  await console.log(result);

  //generate keypair and airdrop 1000000000 Lamports (1 SOL)
  let pk = new Uint8Array([
    238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
    228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4,
    68, 94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59,
    86, 229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
  ]);
  const myKeypair = web3.Keypair.fromSecretKey(pk);
  await connection.requestAirdrop(myKeypair.publicKey, web3.LAMPORTS_PER_SOL);
  console.log("Public address of sender: " + myKeypair.publicKey.toBase58());

  const mintToken = new web3.PublicKey(
    "5irKhdDBM1hXUMoxSe6vzdMue7PmbUfep44iCrz8Vz4J"
  );

  //set timeout to account for airdrop finalization
  const tk = new splToken.Token(
    connection,
    mintToken,
    splToken.TOKEN_PROGRAM_ID,
    myKeypair
  );

  console.log("Minting address:", myKeypair.publicKey);

  let tokAcc = await tk.getOrCreateAssociatedAccountInfo(myKeypair.publicKey);
  console.log("Token address:" + tokAcc.address.toBase58());

  await tk.mintTo(
    tokAcc.address,
    myKeypair.publicKey, //minting authority
    [], //multisig
    100 * web3.LAMPORTS_PER_SOL //How many (50 tokens)
  );
})();
