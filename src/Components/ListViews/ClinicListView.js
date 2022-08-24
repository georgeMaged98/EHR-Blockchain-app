import React from 'react'
import { data } from './FakeData'
import ListView from './ListView'

export default function ClinicListView() {
  return (
    <div>
      <ListView data={data} />
    </div>
  )
}
