import React, { useState, useContext } from 'react'
import { getContract } from '../../helpers/metamaskVerification'
import { encrypt, decrypt } from '../../helpers/encryption'
import PasswordContext from '../../Contexts/PasswordContext'

export default function PatientForm() {
  const password = localStorage.getItem('password')

  const initialPatientData = {
    name: '',
    yearOfBirth: '',
    weight: '',
    height: '',
    sex: '',
    bloodPressure: '',
    pulse: '',
    oxygen: '',
    glucose: '',
  }
  const [patientData, setPatientData] = useState(initialPatientData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setPatientData((initialData) => {
      return {
        ...initialData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setPatientData(initialPatientData)
      console.log('FORM SUBMITTED', patientData)
      const contract = await getContract()
      const medicalMes = {
        bloodPressure: encrypt(patientData.bloodPressure, password),
        pulse: encrypt(patientData.pulse, password),
        oxygen: encrypt(patientData.oxygen, password),
        glucose: encrypt(patientData.glucose, password),
      }

      await contract.addPatient(
        encrypt(patientData.name, password),
        encrypt(patientData.yearOfBirth, password),
        encrypt(patientData.weight, password),
        encrypt(patientData.height, password),
        encrypt(patientData.sex, password),
        medicalMes
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <form>
        <table className="form-table">
          <tbody>
            <tr>
              <td className="form-td">
                <table className="form-table">
                  <tbody>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Name:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Name"
                          name="name"
                          onChange={(e) => handleChange(e)}
                          value={patientData.name}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Year Of Birth:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Year of Birth"
                          name="yearOfBirth"
                          onChange={(e) => handleChange(e)}
                          value={patientData.yearOfBirth}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Weight:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Weight"
                          name="weight"
                          onChange={(e) => handleChange(e)}
                          value={patientData.weight}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Height:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Height"
                          name="height"
                          onChange={(e) => handleChange(e)}
                          value={patientData.height}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Sex:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Sex"
                          name="sex"
                          onChange={(e) => handleChange(e)}
                          value={patientData.sex}
                          className="app-input"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="form-td">
                <table className="form-table">
                  <tbody>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Blood Pressure:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Blood Pressure"
                          name="bloodPressure"
                          onChange={(e) => handleChange(e)}
                          value={patientData.bloodPressure}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Glucose:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Glucose"
                          name="glucose"
                          onChange={(e) => handleChange(e)}
                          value={patientData.glucose}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Oxygen:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Oxygen"
                          name="oxygen"
                          onChange={(e) => handleChange(e)}
                          value={patientData.oxygen}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Pulse:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Patient Pulse"
                          name="pulse"
                          onChange={(e) => handleChange(e)}
                          value={patientData.pulse}
                          className="app-input"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button onClick={(e) => handleSubmit(e)} className="app-btn">
                  Add Patient
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
