"use client"
import { useState } from 'react'
import Swal         from 'sweetalert2'
import styles       from '@/static/modules/Form.module.css'

export default function SignIn() {
  const [userData, setUserData] = useState({})

  const data = [
    {text: "email", title: "Email", type: "email"}, 
    {text: "password", title: "Password", type: "password"},  
  ]

  const onChange = e => {
    setUserData({...userData, [e.target.name]: e.target.value})  
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(userData)
    Swal.fire("Login in...")
  }

  return (
    <main>
      <h1>Sign in with your account!</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        {data.map(data => (
          <div className={styles.container}>
            <label htmlFor={data.text}>{data.title}</label>
            <input 
              type={data.type}      
              name={data.text}
              id={data.text} 
              required 
              onChange={onChange} 
            />
          </div>
        ))}
        <button 
          type='submit'
          disabled={ 
            !userData.email || 
            !userData.password 
          }
        >
          Login now
        </button>
      </form>
    </main>
  )
}
