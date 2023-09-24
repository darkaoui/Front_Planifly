import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useSearchParams } from 'react-router-dom'
import ComponentResultFlights from '../components/resultflights/ComponentResultFlights'

function ResultFlights() {
  
  const [queryParameters] = useSearchParams()
  const filters = JSON.parse(queryParameters.get('filter'))

  return (
    <div className='resultflight'>
        <Header/>
        <h1>{filters.aerodrome} - {filters.plane} - {filters.date}</h1>
        <ComponentResultFlights aerodrome={filters.aerodrome} plane={filters.plane} date={filters.date}/>
        <Footer/>
    </div>
  )
}

export default ResultFlights