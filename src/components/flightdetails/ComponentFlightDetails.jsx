import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ComponentFlightDetails({flightId}) {
    const [dbFlight, setDbFlight] = useState({})
    const [dbPilote, setDbPilote] = useState({})

    const navigate = useNavigate()

    const user = localStorage.getItem("user")

    const handleContinue = () => {
        if(!user || JSON.parse(user) === null) {
            navigate('/login')
        } else {
            navigate('/validatereservation?flight=' + dbFlight.idFlight)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/flights/${flightId}`).then((response)=>{
            setDbFlight(response.data)
            setDbPilote(response.data.pilote)
        })
    }, [])
  return (
    <div>
        <div>{dbFlight.idFlight}</div>
        <div>Date : {dbFlight.date}</div>
        <div>Aerodrome : {dbFlight.aerodrome}</div>
        <div>Plane : {dbFlight.plane}</div>
        <div>Pilote : {dbPilote.firstname} {dbPilote.lastname}</div>
        <div>Available seats : {dbFlight.seatsAvailable}</div>
        <div>Available disabled seats : {dbFlight.disableSeats}</div>
        <div>Price : {dbFlight.price}€</div>
        <button onClick={handleContinue}>Continue</button>
    </div>
  )
}

export default ComponentFlightDetails