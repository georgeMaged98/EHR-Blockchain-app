const main = async () => {
    const accounts = await hre.ethers.getSigners() 
    const clinic = await hre.ethers.getContractFactory("App")
    const myClinic = await clinic.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3")
    const MM1={
      bloodPressure:"10",
      pulse:"11",
      oxygen:"12",
      glucose:"13"
    }
    let pat1=await myClinic.getPatient(0);
    console.log(pat1);
    await myClinic.addVisit(0,"bawaseer2",MM1,"prescription 2..","diagnose 3 ..")
    let pat2=await myClinic.getPatient(0);
    console.log(pat2);




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