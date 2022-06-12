const {decrypt}=require('./inc')

const main = async () => {
    const accounts = await hre.ethers.getSigners() 
    const app = await hre.ethers.getContractFactory("App")
    const myApp = await app.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3")
    let cypher=await myApp.getClinic();
    console.log(cypher)
    console.log(decrypt(cypher[0],"samer"));
    // console.log(await myApp.getClinic(1));
    // console.log(await myApp.getClinic(2));

    //  console.log(await myClinic)
    // console.log(accounts[0].address)
    //console.log(msg.address)

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