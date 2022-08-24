pragma solidity ^0.8.4;
import "hardhat/console.sol";


contract App {
    uint public clinicsCnt;
    mapping(address => Clinic ) public clinics;
    // mapping(address=> uint) public accounts;
    struct Clinic{
        // uint id;
        address senderAddress;
        string  name;
        uint patientsCnt;
        mapping(uint => Patient) patients;
        string passHash;
        
    }

    struct MedicalMeasurement{
        string bloodPressure;
        string  pulse;
        string  oxygen;
        string  glucose;
    
    }
     
    struct Visit {
        string reason;
        MedicalMeasurement MM;
        string prescription;
        string diagnosis;
        uint patientAddress;
    
    }
    struct patientListElement{
        uint patientId;
        string name;
        string yearOfBirth;
        string weight;
        string height;
        string sex;
    }
    struct Patient{
        // uint id;
        string name;
        string yearOfBirth;
        string weight;
        string height;
        string sex;
        MedicalMeasurement MM;
        uint visitsCnt;
        address clinicAddress;
        mapping(uint => Visit ) visits;
    }
    

    constructor() { 
        clinicsCnt=0;
    }
 
    function validatePassHash(string memory passHash_) external view returns (bool){
        Clinic storage clinic= clinics[msg.sender] ;
        string memory passHash=clinic.passHash;
        bool ans=keccak256(abi.encodePacked((passHash)))==keccak256(abi.encodePacked((passHash_)));
        return (ans);
    }
    function createClinic(string memory clinicName_,string memory passHash_) public{
        Clinic storage clinic= clinics[msg.sender] ;
        //=Clinic(1, clinicName_,1);
        clinic.name=clinicName_;
        clinic.senderAddress=msg.sender;
        clinic.patientsCnt=0;    
        clinicsCnt++;  
        clinic.passHash=passHash_;  
    }
    function getClinic() external view returns (string memory,uint ) {
        Clinic storage clinic= clinics[msg.sender] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");
        return (clinic.name,clinic.patientsCnt); 
    }
    // function getAllClinic() external view returns (map memory) {
    //     return clinics;
    // }
    function addPatient(       
        string memory patientName_,
        string memory patientYearOfBirth_,
        string memory patientWeight_,
        string memory patientHeight_,
        string memory patientSex_,
        MedicalMeasurement memory MM_) 
        public {
        address clinicAddress=msg.sender;
        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");

        //mapping(uint => Visit ) visits;
        Patient storage patient=clinic.patients[clinic.patientsCnt];
        patient.name=patientName_;
        patient.yearOfBirth=patientYearOfBirth_;
        patient.weight=patientWeight_;
        patient.height=patientHeight_;
        patient.sex=patientSex_;
        patient.MM=MM_;
        patient.visitsCnt=0;
        clinic.patientsCnt++;

    }
     function getPatient(uint id_) external view returns (       
        string memory ,
        string memory ,
        string memory ,
        string memory ,
        string memory ,
        MedicalMeasurement memory ,
        uint )  {
        address clinicAddress=msg.sender;

        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");

        //mapping(uint => Visit ) visits;
        Patient storage patient=clinic.patients[id_];
        return (patient.name,patient.yearOfBirth,patient.weight,patient.height,patient.sex,patient.MM,patient.visitsCnt);
    }




    function getAllPatients() external view returns (patientListElement[] memory)  {
        address clinicAddress=msg.sender;

        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");
        patientListElement[] memory ans = new patientListElement[](clinic.patientsCnt);
        for (uint i = 0; i <clinic.patientsCnt ; i++) {
            Patient storage patient=clinic.patients[i];
            ans[i] = patientListElement(i,patient.name,patient.yearOfBirth,patient.weight,patient.height,patient.sex);
        }
        return ans;
        //mapping(uint => Visit ) visits;
      //  return (patient.name,patient.yearOfBirth,patient.weight,patient.height,patient.sex,patient.MM,patient.visitsCnt);
    }


    function addVisit(       
        uint  _patientAddress,
        string memory _reason,
        MedicalMeasurement memory _MM,
        string memory _prescription,
        string memory _diagnosis) 
        public {
        address clinicAddress=msg.sender;

        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");

        //mapping(uint => Visit ) visits;
        Patient storage patient=clinic.patients[_patientAddress];
        patient.MM=_MM;
        Visit storage visit =patient.visits[patient.visitsCnt];
        visit.diagnosis=_diagnosis;
        visit.patientAddress=_patientAddress;
        visit.reason=_reason;
        visit.prescription=_prescription;
        visit.MM=_MM;
        patient.visitsCnt++;

    }


    function getVisit(uint _visitId,uint  _patientAddress) external view returns (     
        string memory ,
        MedicalMeasurement memory ,
        string memory ,
        string memory  )  {
        address clinicAddress=msg.sender;

        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");

        //mapping(uint => Visit ) visits;
        Patient storage patient=clinic.patients[_patientAddress];
        Visit storage visit=patient.visits[_visitId];
        return (visit.reason,visit.MM,visit.prescription,visit.diagnosis);
    }
    function getAllVisits(uint  _patientAddress) external view returns (Visit[] memory)  {
        address clinicAddress=msg.sender;
        Clinic storage clinic= clinics[clinicAddress] ;
        require(msg.sender==clinic.senderAddress,"unauthorized Clinic");
        Patient storage patient=clinic.patients[_patientAddress];
        Visit[] memory ans = new Visit[](patient.visitsCnt);
        for (uint i = 0; i <patient.visitsCnt ; i++) {
            Visit storage visit=patient.visits[i];
            ans[i] = visit;
        }
        return ans;
        //mapping(uint => Visit ) visits;
      //  return (patient.name,patient.yearOfBirth,patient.weight,patient.height,patient.sex,patient.MM,patient.visitsCnt);
    }

}

