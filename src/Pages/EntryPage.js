import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EntryPage() {
  let navigate = useNavigate()

  return (
    <div>
      <h1 className="app-title">Welcome to EHR</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <button className="app-btn" onClick={() => navigate('register')}>
                Register as new Cninic
              </button>
            </td>
            <td>
              <button className="app-btn" onClick={() => navigate('/login')}>
                Login
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
