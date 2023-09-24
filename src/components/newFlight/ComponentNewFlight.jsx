import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ComponentNewFlight.css'

function ComponentNewFlight() {
    const [idFlight,setIdFlight] = useState('')
    const [plane,setPlane] = useState('')
    const [aerodrome,setAerodrome] = useState('')
    const [maxSeats,setMaxSeats] = useState(0)
    const [availableSeats,setAvailableSeats] = useState(0)
    const [disableSeats,setDisableSeats] = useState(0)
    const [date,setDate] = useState('')
    const [duration,setDuration] = useState('')
    const [price,setPrice] = useState(0)
  
    const navigate = useNavigate()

    const user = localStorage.getItem("user")
    if (!user || user === null || JSON.parse(user).role !== "pilote") {navigate("/")}
    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const newFlight = JSON.stringify({
                idFlight: idFlight,
                plane: plane,
                pilote: JSON.parse(user)._id,
                aerodrome: aerodrome,
                seats: maxSeats,
                seatsAvailable: availableSeats,
                date: date,
                duration: duration,
                price: price,
                disableSeats: disableSeats
            })
            axios.put(`http://localhost:5000/api/flights/add/flight/${newFlight}`).then((response)=>{
                navigate("/")
            })
        } catch(error) {
            console.log(error.message)
        }
        
    }
  return (
    <div className='component_new_flight'>
        <h1>Sign</h1>
        <form onSubmit={handleSubmit} className='form_new_flight'>
            <label>ID of the flight : </label>
            <input type="text" placeholder='ID of the flight' value={idFlight} onChange={e=>setIdFlight(e.target.value)}/>
            <label>Plane model : </label>
            <input type="text" placeholder='Plane model' value={plane} onChange={e=>setPlane(e.target.value)}/>
            <label>Aerodrome : </label>
            <input type="text" placeholder='Aerodrome' value={aerodrome} onChange={e=>setAerodrome(e.target.value)}/>
            <label>Maximum seats : </label>
            <input type="text" placeholder='Maximum seats' value={maxSeats} onChange={e=>setMaxSeats(e.target.value)}/>
            <label>Available seats : </label>
            <input type="text" placeholder='Available seats' value={availableSeats} onChange={e=>setAvailableSeats(e.target.value)}/>
            <label>Disabled available seats : </label>
            <input type="text" placeholder='Disabled available seats' value={disableSeats} onChange={e=>setDisableSeats(e.target.value)}/>
            <label>Date : </label>
            <input type="text" placeholder='Date' value={date} onChange={e=>setDate(e.target.value)}/>
            <label>Duration : </label>
            <input type="text" placeholder='Duration' value={duration} onChange={e=>setDuration(e.target.value)}/>
            <label>Price : </label>
            <input type="text" placeholder='Price' value={price} onChange={e=>setPrice(e.target.value)}/>
            <button type='submit'>Validate</button>
        </form>
    </div>
  )
}

export default ComponentNewFlight