import React from 'react'

export default function ListView({ data }) {
  return (
    <div>
      {data.map((item, idx) => (
        <li key={idx}>{item.name}</li>
      ))}
    </div>
  )
}
