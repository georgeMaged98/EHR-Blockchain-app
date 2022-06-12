const main = async () => {
  // const accountBalance = await deployer.getBalance();
  
  // console.log("Deploying contracts with account: ", deployer.address);
  // console.log("Account balance: ", accountBalance.toString());
     const clinicContractFactory = await hre.ethers.getContractFactory("App");
    const clinicContract = await clinicContractFactory.deploy();
    await clinicContract.deployed();
    //console.log("Contract deployed to:", clinicContract);
  };  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();