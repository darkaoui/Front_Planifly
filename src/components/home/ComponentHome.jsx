import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './ComponentHome.css'
import searchIcon from '../../assets/img/loupe.png'

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
          <input type="text" className='input_aerodrome' placeholder="Aerodrome" value={aerodromeName} onChange={e=>setAerodromeName(e.target.value)}/>
          <input type="text" className='input_plane' placeholder= "Plane" value={planeName} onChange={e=>setPlaneName(e.target.value)}/>
          <input type="text" className='input_date' placeholder="Date" value={flightDate} onChange={e=>setFlightDate(e.target.value)}/>
          <button type='submit'><img src={searchIcon} alt="Icone search"/></button>
        </form>
    </div>
  )
}

export default ComponentHome