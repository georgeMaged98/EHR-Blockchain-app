const main = async () => {
    const accounts = await hre.ethers.getSigners() 
    const clinic = await hre.ethers.getContractFactory("App")
    const myClinic = await clinic.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3")
    const MM1={
      bloodPressure:"1",
      pulse:"2",
      oxygen:"3",
      glucose:"4"
    }
    await myClinic.addPatient("smr","1999","80","170","male",MM1)
    await myClinic.addPatient("grg","1999","50","175","male",MM1)

    await myClinic.addPatient("samoraa","1999","80","170","male",MM1)
    await myClinic.addPatient("georgetoo","1999","50","175","male",MM1)




    // console.log(await myClinic.pat())
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