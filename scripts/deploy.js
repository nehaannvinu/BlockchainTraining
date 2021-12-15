async function main() {
    const NAVI = await ethers.getContractFactory("NAVI")
  
    // Start deployment, returning a promise that resolves to a contract object
    const NAVI = await NAVI.deploy()
    console.log("Contract deployed to address:", NAVI.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  