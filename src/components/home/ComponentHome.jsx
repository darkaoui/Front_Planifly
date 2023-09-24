import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './ComponentHome.css'

function ComponentHome() {
    const [aerodromeName,setAerodromeName] = useState('')
    const [planeName,setPlaneName] = useState('')
    const [flightDate,setFlightDate] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const filters = JSON.stringify({aerodrome:aerodromeName,plane:planeName,date:flightDate})
        navigate(`/resultflights?filter=${filters}` )
    }
  return (
    <div className='ComponentHome'>
        <h1>To reach the sky, plan a flight</h1>
        <form className='home_inputs' onSubmit={handleSubmit}>
          <label>Localization : </label>
          <input type="text" className='input_aerodrome' placeholder="Aerodrome" value={aerodromeName} onChange={e=>setAerodromeName(e.target.value)}/>
          <label>Plane : </label>
          <input type="text" className='input_plane' placeholder= "Plane" value={planeName} onChange={e=>setPlaneName(e.target.value)}/>
          <label>Date : </label>
          <input type="text" className='input_date' placeholder="Date" value={flightDate} onChange={e=>setFlightDate(e.target.value)}/>
          <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default ComponentHome