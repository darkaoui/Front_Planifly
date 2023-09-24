import React, { useEffect, useState } from 'react'
import './ComponentResultFlights.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ComponentResultFlights({aerodrome,plane,date}) {

    const navigate = useNavigate()
    const [dbFlights, setDbFligths] = useState([])

    const selectFlight = (flight) => {
        navigate("/flight?id=" + flight.idFlight)
    }

    useEffect(() => {
        const filters = JSON.stringify({aerodrome:aerodrome,plane:plane,date:date})
        axios.get(`http://localhost:5000/api/flights/filter/${filters}`).then((response)=>{
            setDbFligths(response.data)
        })
    })

  return (
    <div className='componentresultflights'>
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
  )
}

export default ComponentResultFlights