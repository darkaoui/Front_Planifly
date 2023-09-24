import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ComponentProfile() {
  const [dbFlights, setDbFlights] = useState([])

  const navigate = useNavigate()

  const user = localStorage.getItem("user")

  if(!user || JSON.parse(user) === null) {
    navigate('/login')
  }

  const selectFlight = (flight) => {
    navigate("/flight?id=" + flight.idFlight)
  }

  useEffect(() => {
      axios.get(`http://localhost:5000/api/users/flights/${JSON.parse(user)._id}`).then((response)=>{
          setDbFlights(response.data)
      })
  }, [])
  return (
    <div>
      <div className='profileflights'>
        {dbFlights.length === 0 ?
            (<h3 className='noflight'>No flight found</h3>)
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
                    {dbFlights.map((flight,index)=>(
                        <tr onClick={()=>selectFlight(flight)} key={index}>
                            <td>{flight.aerodrome}</td>
                            <td>{flight.plane}</td>
                            <td>{flight.date}</td>
                        </tr>
                    ))}
                </tbody>            
            </table>
            )
        }
    </div>
    </div>
  )
}

export default ComponentProfile