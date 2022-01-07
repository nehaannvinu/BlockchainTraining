//Transfer Token EXAMPLE
//Receipient pays the transaction fee for transaction
//(Custom Minting)

const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

(async () => {
  const fromSecretKey = new Uint8Array([
    238, 190, 196, 247, 181, 90, 139, 127, 153, 151, 203, 35, 72, 25, 35, 153,
    228, 250, 216, 202, 105, 252, 199, 150, 60, 96, 230, 45, 155, 65, 219, 4,
    68, 94, 74, 154, 147, 221, 109, 237, 78, 29, 9, 178, 89, 203, 231, 230, 59,
    86, 229, 60, 149, 201, 124, 247, 99, 159, 148, 116, 242, 169, 150, 96,
  ]);

  const toSecretKey = new Uint8Array([
    108, 128, 184, 59, 100, 4, 99, 235, 184, 74, 43, 183, 102, 227, 189, 160,
    18, 159, 51, 47, 9, 104, 142, 29, 252, 49, 38, 109, 167, 113, 157, 30, 136,
    104, 27, 150, 44, 176, 11, 214, 147, 211, 176, 64, 15, 109, 69, 203, 35,
    232, 59, 14, 42, 91, 134, 219, 79, 67, 203, 30, 70, 14, 187, 185,
  ]);

  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

  let from = web3.Keypair.fromSecretKey(fromSecretKey);
  let to = web3.Keypair.fromSecretKey(toSecretKey);

  let mintAddress = new web3.PublicKey("JDd7RTEt8W3DY7D9Fm5Tkd4QUtG7Tp3XsCabGjPiVwmM");

  const tk = new splToken.Token(
    connection,
    mintAddress,
    splToken.TOKEN_PROGRAM_ID,
    to
  );


  let fromTokenAccount = await tk.getOrCreateAssociatedAccountInfo(
    from.publicKey
  );

  let toTokenAccount = await tk.getOrCreateAssociatedAccountInfo(
    to.publicKey
  );

  console.log("Token address of sender: " + fromTokenAccount.address.toBase58());
  console.log("Token address of receiver: " + toTokenAccount.address.toBase58());

  await tk.mintTo(
    fromTokenAccount.address, //dest
    from.publicKey, //authority
    [],
    100 * web3.LAMPORTS_PER_SOL //amount
  );

  // Add token transfer instructions to transaction
  let transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      from.publicKey,
      [],
      20 * web3.LAMPORTS_PER_SOL
    )
  );

  // Sign transaction, broadcast, and confirm
  let signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [to, from]
  );

  console.log("SIGNATURE: ", signature);
  console.log("SUCCESS");
})();
