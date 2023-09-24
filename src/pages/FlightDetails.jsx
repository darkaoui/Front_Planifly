import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useSearchParams } from 'react-router-dom'
import ComponentFlightDetails from '../components/flightdetails/ComponentFlightDetails'

function FlightDetails() {
  const [queryParameters] = useSearchParams()
  return (
    <div>
        <Header/>
        <h1 className='flighttitle'>{queryParameters.get("id")}</h1>
        <ComponentFlightDetails flightId={queryParameters.get("id")}/>
        <Footer/>
    </div>
  )
}

export default FlightDetails