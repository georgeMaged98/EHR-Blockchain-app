import { useState } from 'react'
import PatientForm from './Components/Forms/PatientForm'
import VisitForm from './Components/Forms/VisitForm'
import ClinicPage from './Pages/ClinicPage'
import PatientPage from './Pages/PatientPage'
import EntryPage from './Pages/EntryPage'
import { Routes, Route, Link } from 'react-router-dom'
import SinglePatientPage from './Pages/SinglePatientPage'
import RegisterForm from './Components/Forms/RegisterForm'
import LoginForm from './Components/Forms/LoginForm'
import PasswordContext from './Contexts/PasswordContext'

function App() {
  const [password, SetPassword] = useState('')
  return (
    <PasswordContext.Provider value={[password, SetPassword]}>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<EntryPage />} />
          <Route path="/patients" exact element={<ClinicPage />} />
          <Route path="/patients/:id" exact element={<PatientPage />} />
          <Route path="/register" exact element={<RegisterForm />} />
          <Route path="/login" exact element={<LoginForm />} />
        </Routes>
      </div>
    </PasswordContext.Provider>
  )
}

export default App
