"use client"
import Link           from "next/link"
import { useState }   from 'react'
import { getSession } from '@/utils/fetch.js'
import "@/static/app.css"

export default function App() {
  
  const [session, setSession] = useState({})
  const [loading, setLoading] = useState(true)
  
  getSession()
  .then(data => {
    setLoading(false)
    if(data.status == 200) {
      setSession(data.user)
    }
  })

  if(loading) return (
    <main>
      <h1>Loading, please wait...</h1>
    </main>
  )

  return (
    <main>
      <h1>Welcome {session ? `back, ${session.fullName}` : "to Build Yourself!"}</h1>
      {
        session 
        ?
        (
          <>
            <p>Get ready to the workout!</p>
            <div className="btnContainer">
              <Link className="btn" href="/workout">Workout now!</Link>
            </div>
          </>
        )
        :
        (
          <>
            <p>Where we're here to help you to <b>build your best version</b></p>
            <p><b>Register now to start with us!</b></p>
            <div className="btnContainer">
              <Link className="btn" href="/signup">Register now!</Link>
              <Link className="btn" href="/signin">Do you have an account? Login now!</Link>
            </div>
          </>
        ) 
      }
    </main>
  )
}
