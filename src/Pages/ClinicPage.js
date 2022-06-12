import React, { useEffect, useState } from 'react'
import '../App.css'
import ClinicForm from '../Components/Forms/RegisterForm'
import ClinicListView from '../Components/ListViews/ClinicListView'
import { Table } from 'react-bootstrap'
import { getContract } from '../helpers/metamaskVerification'
import PatientForm from '../Components/Forms/PatientForm'
import { Link } from 'react-router-dom'
import { encrypt, decrypt } from '../helpers/encryption'
export default function ClinicPage() {
  const initialClinicDetails = {
    id: '',
    name: '',
  }
  const [patientsList, setPatientsList] = useState([])
  const [clinicDetails, setClinicDetails] = useState(initialClinicDetails)
  const password = localStorage.getItem('password')

  useEffect(() => {
    getPats().then((data) => {
      if (data) setPatientsList(data)
    })

    getClinicDetails().then((data) => {
      console.log(decrypt(data[0], password))
      if (data) {
        const clinicData = {
          id: Number(data[1]),
          name: decrypt(data[0], password),
        }
        setClinicDetails(clinicData)
      }
    })
  }, [])

  const getPats = async () => {
    try {
      const contract = await getContract()
      const data = await contract.getAllPatients()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getClinicDetails = async () => {
    try {
      const contract = await getContract()
      const data = await contract.getClinic()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className="app-title">ClinicPage</h1>
      <div className="content">
        <h3 className="app-title">Clinic Name: {clinicDetails.name}</h3>
        <PatientForm />
        {/* <ClinicListView /> */}
        {/* <button onClick={() => create()}>CREATE</button> */}
        {/* <button onClick={() => get()}>GET</button> */}
        <Table striped bordered size="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Year of Birth</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Sex</th>
              <th>View Patient</th>
            </tr>
          </thead>
          <tbody>
            {patientsList.map((patient, idx) => (
              <tr key={idx} className="list-row">
                {console.log(patient)}
                <td>{Number(patient[0])}</td>
                <td>{decrypt(patient[1], password)}</td>
                <td>{decrypt(patient[2], password)}</td>
                <td>{decrypt(patient[3], password)}</td>
                <td>{decrypt(patient[4], password)}</td>
                <td>{decrypt(patient[5], password)}</td>
                <td>
                  <Link to={`/patients/${patient[0]}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
