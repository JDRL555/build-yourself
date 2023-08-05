"use client"
import { useState } from 'react'
import styles from "@/static/Workout.module.css"

export default function WorkoutPage() {

  const [count, setCount] = useState(3)
  
  setTimeout(()=>count >= 1 && setCount(count - 1), 1000)

  return (
    <main>
      { count != 0 && <h1 className={styles.count}>{count}</h1> }
      {
        count == 0 && 
        <h1>WORK!</h1>
      }
    </main>
  )
}
