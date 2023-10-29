import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ComponentFlightDetails.css'
import calendarIcon from '../../assets/img/calendar.png'
import airportIcon from '../../assets/img/aeroport.png'
import planeIcon from '../../assets/img/plane.png'
import piloteIcon from '../../assets/img/pilote.png'
import ticketIcon from '../../assets/img/ticket.png'

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
    <div className='componentFlightDetails'>
        <h1 className='flightId'>Flight {dbFlight.idFlight}</h1>
        <div className='flightDetailsItem'>
            <img src={calendarIcon} alt="Calendar icon"/>
            <h3>Date : </h3>
            <h6>{dbFlight.date}</h6>
        </div>
        <div className='flightDetailsItem'>
            <img src={airportIcon} alt="Airport icon"/>
            <h3>Aerodrome : </h3>
            <h6>{dbFlight.aerodrome}</h6>
        </div>
        <div className='flightDetailsItem'>
            <img src={planeIcon} alt="Plane icon"/>
            <h3>Plane : </h3>
            <h6>{dbFlight.plane}</h6>
        </div>
        <div className='flightDetailsItem'>
            <img src={piloteIcon} alt="Pilote icon"/>
            <h3>Pilote : </h3>
            <h6>{dbPilote.firstname} {dbPilote.lastname}</h6>
        </div>
        <div className='flightDetailsItem'>
            <img src={ticketIcon} alt="Tickets icon"/>
            <h3>Available seats : </h3>
            <h6>{dbFlight.seatsAvailable}</h6>
        </div>
        <div className='flightDetailsItem'>
            <img src={ticketIcon} alt="Tickets icon"/>
            <h3>Available disabled seats : </h3>
            <h6>{dbFlight.disableSeats}</h6>
        </div>
        <div className='flightDetailsItem'>
            <h3>Price : </h3>
            <h6>{dbFlight.price}€</h6>
        </div>
        <button onClick={handleContinue}>Book</button>
    </div>
  )
}

export default ComponentFlightDetails