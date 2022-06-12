const {encrypt,hash}=require('./inc')
const main = async () => {
    const accounts = await hre.ethers.getSigners() 
    const app = await hre.ethers.getContractFactory("App")
    const myApp = await app.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3")
    let pass="samer"
    let passHash=hash(pass)

    await myApp.createClinic(encrypt("samoraa alone clinic",pass),passHash);
    console.log(await myApp.validatePassHash(passHash))
    console.log(await myApp.validatePassHash("samer"))

    // await myApp.createClinic("georgetoo alone clinic");
    // await myApp.createClinic("samoraa and georgetoo clinic");
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