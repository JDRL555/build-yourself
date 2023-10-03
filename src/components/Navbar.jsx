"use client"
import { useState }   from 'react'
import { getSession } from '@/utils/fetch'
import styles         from '@/static/modules/Navbar.module.css'

export default function Navbar() {
  
  const [session, setSession] = useState({})
  
  getSession()
  .then(data => {
    if(data.status == 200) {
      setSession(data.user)
    }
  })

  return (
    <nav className={styles.nav}>
      <h2>Build Yourself</h2>
      <ul>
        <li>
          {session ? session.fullName : "User"}
        </li>
      </ul>
    </nav>
  )
}
