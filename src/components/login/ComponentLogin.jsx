import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ComponentLogin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const jsonLogs = JSON.stringify({email:email,password:password})
            axios.post(`http://localhost:5000/api/login/${jsonLogs}`).then((response)=>{
                localStorage.setItem('user',JSON.stringify(response.data.data))
                localStorage.setItem('token',JSON.stringify(response.data.token))
                navigate("/")
            })
        } catch(error) {
            console.log(error.message)
        }
        
    }

    const handleSignButton = () => {
        navigate('/sign')
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/>
            <button type='submit'>Validate</button>
        </form>
        <button onClick={handleSignButton}>Sign</button>
    </div>
  )
}

export default ComponentLogin