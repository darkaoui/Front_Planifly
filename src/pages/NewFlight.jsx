import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import ComponentNewFlight from '../components/newFlight/ComponentNewFlight'

function NewFlight() {
  return (
    <div>
        <Header/>
        <ComponentNewFlight/>
        <Footer/>
    </div>
  )
}

export default NewFlight