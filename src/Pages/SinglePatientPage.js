import React from 'react'
import { useLocation } from 'react-router-dom'
import VisitForm from '../Components/Forms/VisitForm'

export default function SinglePatientPage() {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  console.log(id)
  return (
    <div>
      <h3 className="app-title">Visit Form</h3>
      <VisitForm />

      
    </div>
  )
}
