import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./ComponentSign.css"

function ComponentSign() {
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [role,setRole] = useState('')
  const [idCard,setIdCard] = useState(null)
  const [pilotLicense,setPilotLicense] = useState(null)
  const [isPasswordConfirmed,setIsPassWordConfirmed] = useState(true)
  const [cannotSign,setCannotSign] = useState(false)

  const navigate = useNavigate()

  const validInformation = () => {
    return confirmPassword === password
    && firstname != ''
    && lastname != ''
    && firstname != ''
    && email != ''
    && firstname != ''
    && role != ''
    && (role === "passenger" || idCard != null)
    && (role === "passenger" || pilotLicense != null)

  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      setIsPassWordConfirmed(true)
      setCannotSign(false)
      try {
          if(validInformation()) {
            setCannotSign(false)
            setIsPassWordConfirmed(true)
            const formData = new FormData()
            formData.append("idCard",idCard)
            formData.append("pilotLicense",pilotLicense)
            formData.append("firstname",firstname)
            formData.append("lastname",lastname)
            formData.append("email",email)
            formData.append("password",password)
            formData.append("role",role)
            console.log(formData)
            await axios.post("http://localhost:5000/api/sign", formData, { headers: {'Content-Type': 'multipart/form-data'} }).then((response)=>{
              localStorage.setItem('user',JSON.stringify(response.data.data))
              localStorage.setItem('token',JSON.stringify(response.data.token))
              navigate("/")
            })
          }else {
            setCannotSign(true)
            if (confirmPassword != password){
              setIsPassWordConfirmed(false)
            } 
          }
      } catch(error) {
          console.log(error.message)
      }
      
  }
return (
  <div className='componentHome'>
      <h1>Sign</h1>
      <form onSubmit={handleSubmit}>
          <label>Firstname : </label>
          <input type="text" placeholder='Firstname' value={firstname} onChange={e=>setFirstname(e.target.value)}/>
          <label>Lastname : </label>
          <input type="text" placeholder='Lastname' value={lastname} onChange={e=>setLastname(e.target.value)}/>
          <label>Email : </label>
          <input type="email" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Password : </label>
          <input type="password" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
          <label>Confirm password : </label>
          <input type="password" placeholder='Confirm your password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
          {
            !isPasswordConfirmed ?
            (<h3 className='errorMessage'>Confirmation password must be the same</h3>)
            :(<></>)
          }
          <label>Role : </label>
          <div onChange={e=>setRole(e.target.value)}>
            <label className='radioLabel'>Pilote </label><input type="radio" value="pilote" name="role" />
            <label className='radioLabel'>Passenger </label><input type="radio" value="passenger" name="role" />
          </div>
          {
            role == "pilote" ?
            (<div className='formPilote'>
              <label>Id Card : </label>
              <input type="file" accept="image/*" onChange={e=>setIdCard(e.target.files[0])}/>
              <label>Pilot License : </label>
              <input type="file" accept="image/*" onChange={e=>setPilotLicense(e.target.files[0])}/>
            </div>)
            :(<></>)
          }
          <button type='submit' className='submitButton'>Validate</button>
          {
            cannotSign ?
            (<h3 className='errorMessage'>Cannot sign, invalid information</h3>)
            :(<></>)
          }
      </form>
  </div>
)
}

export default ComponentSign