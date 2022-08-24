import React, { useState } from 'react'
import { getContract } from '../../helpers/metamaskVerification'

export default function VisitForm({ toggle, setToggle, patientAddress }) {
  const initialVisitData = {
    reason: '',
    prescription: '',
    diagnosis: '',
    bloodPressure: '',
    pulse: '',
    oxygen: '',
    glucose: '',
  }
  const [visitData, setVisitData] = useState(initialVisitData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setVisitData((initialData) => {
      return {
        ...initialData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    console.log(patientAddress)
    e.preventDefault()
    console.log('FORM SUBMITTED', visitData)
    const contract = await getContract()
    const medicalMes = {
      bloodPressure: visitData.bloodPressure,
      pulse: visitData.pulse,
      oxygen: visitData.oxygen,
      glucose: visitData.glucose,
    }
    await contract.addVisit(
      patientAddress,
      visitData.reason,
      medicalMes,
      visitData.prescription,
      visitData.diagnosis
    )
    setToggle(!toggle)
    setVisitData(initialVisitData)
  }

  return (
    <div>
      <form>
        <table className="form-table">
          <tbody>
            <tr>
              <td className="form-td">
                <table>
                  <tbody className="form-table">
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Reason:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Visit Reason"
                          name="reason"
                          onChange={(e) => handleChange(e)}
                          value={visitData.reason}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Diagnosis</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Visit Diagnosis"
                          name="diagnosis"
                          onChange={(e) => handleChange(e)}
                          value={visitData.diagnosis}
                          className="app-input"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="form-td">
                        <label className="app-label">Prescription:</label>
                      </td>
                      <td className="form-td">
                        <input
                          placeholder="Enter Visit Prescription"
                          name="prescription"
                          onChange={(e) => handleChange(e)}
                          value={visitData.prescription}
                          className="app-input"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="form-td">
                <table>
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
                          value={visitData.bloodPressure}
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
                          value={visitData.glucose}
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
                          value={visitData.oxygen}
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
                          value={visitData.pulse}
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
                  Add Visit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
