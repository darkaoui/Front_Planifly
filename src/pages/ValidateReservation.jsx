import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import ComponentValidateReservation from '../components/validateReservation/ComponentValidateReservation'
import { useNavigate, useSearchParams } from 'react-router-dom'

function ValidateReservation() {
    const [queryParameters] = useSearchParams()
    const user = localStorage.getItem("user")

    const navigate = useNavigate()

    if(!user || JSON.parse(user) === null) {
        navigate('/login')
    }
  return (
    <div>
        <Header/>
        <ComponentValidateReservation flight={queryParameters.get("flight")} user={JSON.parse(user)._id}/>
        <Footer/>    
    </div>
  )
}

export default ValidateReservation