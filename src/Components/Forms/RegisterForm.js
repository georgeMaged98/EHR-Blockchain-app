import React, { useState, useContext, useEffect } from 'react'
import { getContract } from '../../helpers/metamaskVerification'
import { hash } from '../../helpers/encryption'
import { useNavigate } from 'react-router-dom'
import PasswordContext from '../../Contexts/PasswordContext'
import { encrypt, decrypt } from '../../helpers/encryption'

export default function RegisterForm() {
  const [password, setPassword] = useContext(PasswordContext)
  const [clinicFound, setClinicFound] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const initialClinicData = {
    name: '',
    password: '',
  }
  const [clinicData, setClinicData] = useState(initialClinicData)

  const getClinicDetails = async () => {
    try {
      const contract = await getContract()
      const data = await contract.getClinic()
      return data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  useEffect(() => {
    getClinicDetails().then((data) => {
      console.log(data)
      if (!data) setClinicFound(false)
      else setClinicFound(true)
    })
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setClinicData((initialData) => {
      return {
        ...initialData,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!clinicFound) {
      setError('')
      setClinicData(initialClinicData)
      console.log('FORM SUBMITTED', clinicData)
      const contract = await getContract()

      try {
        contract
          .createClinic(
            encrypt(clinicData.name, clinicData.password),
            hash(clinicData.password)
          )
          .then((newClinic) => {
            console.log(newClinic)
            setPassword(clinicData.password)
            localStorage.setItem('password', clinicData.password)
            setClinicFound(true)
          })
      } catch (err) {
        console.log(err)
      }
    } else {
      setError('Clinic already registered by this account')
    }
  }

  return (
    <div>
      <form>
        <table className="form-table">
          <tbody>
            <tr>
              <td className="form-td">
                <label className="app-label">Name:</label>
              </td>
              <td className="form-td">
                <input
                  placeholder="Enter Clinic Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={clinicData.name}
                  className="app-input"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <td className="form-td">
                <label className="app-label">Password:</label>
              </td>
              <td className="form-td">
                <input
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={clinicData.password}
                  className="app-input"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="form-td">
                <p className="form-err">{error}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="form-td">
                <button onClick={(e) => handleSubmit(e)} className="app-btn">
                  Add Clinic
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="form-td">
                <button
                  onClick={(e) => navigate('../patients')}
                  className="app-btn"
                >
                  View Clinic Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
