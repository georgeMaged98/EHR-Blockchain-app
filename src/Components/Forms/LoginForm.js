import React, { useState } from 'react'
import { hash } from '../../helpers/encryption'
import { getContract } from '../../helpers/metamaskVerification'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()
  const initialClinicData = {
    password: '',
  }
  const [clinicData, setClinicData] = useState(initialClinicData)
  const [error, setError] = useState('')
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
    setClinicData(initialClinicData)
    console.log('FORM SUBMITTED', clinicData)
    const contract = await getContract()
    console.log(clinicData.password)
    const hashedPassword = hash(clinicData.password)
    console.log(hashedPassword)
    const res = await contract.validatePassHash(hashedPassword)
    console.log(res)
    setError('Login Failed')
    if (res) {
      localStorage.setItem('password', clinicData.password)
      setError('')
      navigate('../patients')
    }
  }

  return (
    <div>
      <form>
        <table className="form-table">
          <tbody>
            <tr>
              <td className="form-td">
                <label className="app-label">Password:</label>
              </td>
              <td className="form-td">
                <input
                  type="password"
                  placeholder="Enter Clinic Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={clinicData.password}
                  className="app-input"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="form-td">
                <p>{error}</p>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="form-td">
                <button onClick={(e) => handleSubmit(e)} className="app-btn">
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
