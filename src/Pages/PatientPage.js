import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

import '../App.css'
import PatientForm from '../Components/Forms/PatientForm'
import VisitForm from '../Components/Forms/VisitForm'
import { useLocation } from 'react-router-dom'

import { getContract } from '../helpers/metamaskVerification'
import { decrypt } from '../helpers/encryption'

export default function PatientPage() {
  const initialPatientDetails = {
    id: '',
    name: '',
    yearOfBirth: '',
    sex: '',
    weight: '',
    height: '',
    bloodPressure: '',
    oxygen: '',
    pulse: '',
    glucose: '',
  }
  const [visitsList, setVisitsList] = useState([])
  const [patientDetails, setPatientDetails] = useState(initialPatientDetails)
  const [toggle, setToggle] = useState(false)
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const password = localStorage.getItem('password')

  useEffect(() => {
    getVisits().then((data) => {
      console.log(data)
      setVisitsList(data)
    })

    getPatientDetails().then((data) => {
      const patiendData = {
        name: decrypt(data[0], password),
        yearOfBirth: decrypt(data[1], password),
        weight: decrypt(data[2], password),
        height: decrypt(data[3], password),
        sex: decrypt(data[4], password),
      }
      setPatientDetails(patiendData)
    })
  }, [])

  const getVisits = async () => {
    const contract = await getContract()
    const data = await contract.getAllVisits(id)
    return data
  }

  const getPatientDetails = async () => {
    const contract = await getContract()
    const data = await contract.getPatient(id)
    return data
  }

  return (
    <div>
      <h1 className="app-title">Patient Page</h1>
      <div className="content">
        <h2>Patient Details: </h2>
        <h4>Name: {patientDetails.name}</h4>
        <h4>Year Of Birth: {patientDetails.yearOfBirth}</h4>
        <h4>Weight: {patientDetails.weight}</h4>
        <h4>Height: {patientDetails.height}</h4>
        <h4>Sex: {patientDetails.sex}</h4>

        <VisitForm toggle={toggle} setToggle={setToggle} patientAddress={id} />
        <Table striped bordered size="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Reason</th>
              <th>Prescription</th>
              <th>Diagnosis</th>
              <th>Blood Pressure</th>
              <th>Pulse</th>
              <th>Oxygen</th>
              <th>Glucose</th>
            </tr>
          </thead>
          <tbody>
            {visitsList.map((visit, idx) => (
              <tr key={idx} className="list-row">
                <td>{Number(visit[4])}</td>
                <td>{visit[0]}</td>
                <td>{visit[2]}</td>
                <td>{visit[3]}</td>
                <td>{Number(visit[1][0])}</td>
                <td>{Number(visit[1][1])}</td>
                <td>{Number(visit[1][2])}</td>
                <td>{Number(visit[1][3])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
