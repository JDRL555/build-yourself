"use client"
import { useState }     from 'react'
import Link             from "next/link"
import styles           from "@/static/modules/Workout.module.css"

export default function Workout({ exercises }) {

  const [count, setCount]       = useState(3)
  const [exercise, setExercise] = useState(0)

  setTimeout(()=>count >= 1 && setCount(count-1), 1000)

  const onNextExercise = () => {
    if(exercise < exercises.length - 1) setExercise(exercise+1)
  }
  
  return (
    <div>
      { 
        count == 0 
        ? 
        <section className={styles.exercise_container}>
          <h2>{exercises[exercise].name}</h2>
          <hr />
          <h4>Repeticiones: {exercises[exercise].reps}</h4>
          <h4>Serie: {exercises[exercise].series}</h4>
          <Link href="/" className={styles.stop}>
            Stop
          </Link>
          <button className={styles.completed} onClick={onNextExercise}>
            {exercise < exercises.length - 1 ? "Completed" : "Finish"}
          </button>
        </section> 
        : 
        <h1 className={styles.count}>{count}</h1> 
      }
    </div>
  )
}
