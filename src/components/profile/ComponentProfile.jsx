import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ComponentProfile.css'

function ComponentProfile() {
  const [dbPassengerFlights, setDbPassengerFlights] = useState([])
  const [dbPiloteFlights, setDbPiloteFlights] = useState([])

  const navigate = useNavigate()

  const user = localStorage.getItem("user")

  if(!user || JSON.parse(user) === null) {
    navigate('/login')
  }

  const selectFlight = (flight) => {
    navigate("/flight?id=" + flight.idFlight)
  }

  const cancelBook = (idFlight) => {
    const data = new FormData()
    data.append("flight",idFlight)
    data.append("passenger",JSON.parse(user)._id)
    axios.delete(`http://localhost:5000/api/flights/delete/passenger/${idFlight}/${JSON.parse(user)._id}`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then((response)=>{
            console.log("Book deleted")
            navigate("/")
      })
  }

  const removeFlight = (idFlight) => {
    axios.delete(`http://localhost:5000/api/flights/delete/${idFlight}`).then((response)=>{
            console.log("Flight deleted")
            navigate("/")
      })
  }

  useEffect(() => {
      axios.get(`http://localhost:5000/api/users/flights/${JSON.parse(user)._id}`).then((response)=>{
            setDbPassengerFlights(response.data)
            axios.get(`http://localhost:5000/api/flights/pilote/${JSON.parse(user)._id}`).then((response)=>{
                setDbPiloteFlights(response.data)
            })
      })
  }, [])
  return (
    <div className='profileComponent'>
        <div className='profileflights'>
            <h1>Flight(s) booked</h1>
            {dbPassengerFlights.length === 0 ?
                (<h6 className='noflight'>No flight found</h6>)
            : (
                <table className='tableflights'>
                    <thead>
                        <tr>
                            <th>Aerodrome</th>
                            <th>Plane</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dbPassengerFlights.map((flight,index)=>(
                            <tr key={index}>
                                <td onClick={()=>selectFlight(flight)} >{flight.aerodrome}</td>
                                <td onClick={()=>selectFlight(flight)} >{flight.plane}</td>
                                <td onClick={()=>selectFlight(flight)} >{flight.date}</td>
                                <td onClick={()=>cancelBook(flight.idFlight)}>X</td>
                            </tr>
                        ))}
                    </tbody>            
                </table>
                )
            }
        </div>
    
        {
        user
          && JSON.parse(user) !== null
          && JSON.parse(user).role === "pilote" ?
            (
                <div className='pilotesflights'>
                    <h1>Flight(s) created</h1>
                {dbPiloteFlights.length === 0 ?
                    (<h6 className='noflight'>No flight found</h6>)
                : (
                    <table className='tableflights'>
                        <thead>
                            <tr>
                                <th>Aerodrome</th>
                                <th>Plane</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dbPiloteFlights.map((flight,index)=>(
                                <tr key={index}>
                                    <td onClick={()=>selectFlight(flight)}>{flight.aerodrome}</td>
                                    <td onClick={()=>selectFlight(flight)}>{flight.plane}</td>
                                    <td onClick={()=>selectFlight(flight)}>{flight.date}</td>
                                    <td onClick={()=>removeFlight(flight.idFlight)}>X</td>
                                </tr>
                            ))}
                        </tbody>            
                    </table>
                    )
                }
            </div> 
            )
          :(<></>)
        }

    </div>
  )
}

export default ComponentProfile