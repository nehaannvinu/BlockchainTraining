async function main() {
    const NAVI = await ethers.getContractFactory("NAVI")
  
    // Start deployment, returning a promise that resolves to a contract object
    const NAV = await NAVI.deploy()
    console.log("Contract deployed to address:", NAV.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  