require("dotenv").config();

const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const bip39 = require("bip39");
const hdkey = require("hdkey");

(async () => {
  //create connection to devnet
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  const mnemonic =
    "utility unique equal average middle shed arch jeans jelly collect sweet soda";
  // let bufferObject = await bip39.mnemonicToSeed(mnemonic);

  // var arrayBuffer = new ArrayBuffer(bufferObject.length);
  // var res = new Uint8Array(arrayBuffer);
  // for (var i = 0; i < bufferObject.length; ++i) {
  //   res[i] = bufferObject[i];
  // }

  // console.log(res);

  let seed = await bip39.mnemonicToSeed(mnemonic);


  const root = hdkey.fromMasterSeed(seed);
  //const masterPrivateKey = root.privateKey.toString('hex');

  const keyPairArray = new Uint8Array("3PQ2yWnJN2WeVij63LKhB5LS8KqrePryHNoszP4YivjAEuc5ct334qEdRdFkYBMtqkiRU7DuDy14HbN7CekGjVDd");

  const myKeypair = web3.Keypair.fromSeed(keyPairArray);
  console.log(myKeyPair.publicKey);

  // let pk = new Uint8Array([
  //   238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
  //   228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4,
  //   68, 94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59,
  //   86, 229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
  // ]);
  // const myKeypair = web3.Keypair.fromSecretKey(pk);

  await connection.requestAirdrop(myKeypair.publicKey, web3.LAMPORTS_PER_SOL);

  console.log("Public address of sender: " + myKeypair.publicKey.toBase58());

  let mint;
  var myToken;

  //create mint
  mint = await splToken.Token.createMint(
    connection,
    myKeypair, //the acc that will pay the fee (from wallet)
    myKeypair.publicKey, //mint authority
    null, //freeze authority
    9, //decimals
    splToken.TOKEN_PROGRAM_ID
  );

  console.log("mint public address: " + mint.publicKey.toBase58());

  //get the token account of this solana address, if it does not exist, create it
  myToken = await mint.getOrCreateAssociatedAccountInfo(myKeypair.publicKey);

  console.log("Token public address: " + myToken.address.toBase58());

  //minting tokens to the token address we just created
  await mint.mintTo(
    myToken.address,
    myKeypair.publicKey, //minting authority
    [], //multisig
    50 * web3.LAMPORTS_PER_SOL
  );

  console.log("Finished minting");
})();
