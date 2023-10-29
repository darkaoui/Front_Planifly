import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ComponentValidateReservation.css'

function ComponentValidateReservation({flight,user}) {
  const [validSeats,setValidSeats] = useState(0)
  const [disableSeats, setDisableSeats] = useState(0)
  const [isValidated,setIsValidated] = useState(false)

  const navigate = useNavigate()

  const handleValidation = (event) => {
    event.preventDefault()
    try {
        const newPassenger = JSON.stringify({
          idFlight: flight, 
          idPassenger: user, 
          seatQuantity: validSeats, 
          disableSeatQuantity: disableSeats
        })
        axios.put(`http://localhost:5000/api/flights/add/passenger/${newPassenger}`).then((response)=>{
          setIsValidated(true)
        })
    } catch(error) {
        console.log(error.message)
    }
  }

  return (
    <div>
      {
        !isValidated?
        (<div>
          <h1>Book flight : {flight}</h1>
          <form onSubmit={handleValidation}>
            <label>Valid seats quantity</label>
            <input type="number" value={validSeats} onChange={(e)=> setValidSeats(e.target.value)}/>
            <label>Disabled seats quantity</label>
            <input type="number" value={disableSeats} onChange={(e)=> setDisableSeats(e.target.value)}/>
            <button type='submit'>Validate</button>
          </form>
        </div>)
        :(<div className='bookFinished'>
          <h1>Thank you, your reservation is done !</h1>
          <button onClick={() => navigate('/')}>Go back to home page</button>
        </div>)
      }
      
    </div>
  )
}

export default ComponentValidateReservation