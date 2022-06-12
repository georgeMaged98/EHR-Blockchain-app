import React, { useEffect } from 'react'
import '../App.css'
import VisitForm from '../Components/Forms/VisitForm'

import { getContract } from '../helpers/metamaskVerification'

export default function VisitPage() {
  useEffect(() => {
    get().then((data) => {
      console.log(data)
    })
  }, [])

  const create = async () => {
    const contract = await getContract()

    // await contract.createClinic('Samoura CLINIC')
  }

  const get = async () => {
    const contract = await getContract()
    // const data = await contract.getClinic(0)
    // return data
  }

  return (
    <div>
      <h1 className="app-title">Visit Page</h1>
      <div className="content">
        <VisitForm />
        {/* <ClinicListView /> */}
        {/* <button onClick={() => create()}>CREATE</button> */}
        {/* <button onClick={() => get()}>GET</button> */}
      </div>
    </div>
  )
}
