const web3 =  require("@solana/web3.js");

(async () => {
  // Connect to cluster
  console.log(web3.clusterApiUrl('devnet'))
  const connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed',
  );

  //Testing connection 
  //console.log(await connection.getEpochInfo())

  // Generate a new random public key
  const from = web3.Keypair.generate();

  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    web3.LAMPORTS_PER_SOL, //10^7 Lamports in 1 SOL
  );
  await connection.confirmTransaction(airdropSignature);

  const to = "3Gm54E6ujH6wzURU2GdCkLz9SXLxGHDrj9knhW6ZgDHM";


  // Add transfer instruction to transaction
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: web3.LAMPORTS_PER_SOL / 100,
    }),
  );

  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from], //check format
  );
  console.log('SIGNATURE', signature);

  console.log("Finished Transaction");
})();
