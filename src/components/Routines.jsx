import { useState, useEffect }      from 'react'
import { useSelector, useDispatch}  from 'react-redux'
import { getRoutines }              from '@/utils/fetch.js'
import { setColumn }                from '@/utils/redux/features/userSlice.js'
import { changeStep }               from '@/utils/redux/features/stepSlice.js'
import styles                       from '@/static/modules/Routines.module.css'

export default function Routines() {
  const step                    = useSelector(state => state.step.value)
  const dispatch                = useDispatch()
  
  const [routines, setRoutines] = useState({})
  const [loading, setLoading]   = useState(true)
  const [id, setId]             = useState("")

  const onSelectRoutine = id => {
    setId(id)
    dispatch(setColumn({key: "routine", value: id}))
  }

  const onCompleted = () => {
    const progress = document.querySelector(".ProgressBar_progress__ZUKg6")
    progress.style.width = `${((step + 1) / 3) * 100}%`
    dispatch(changeStep())
  }

  useEffect(() => {
    getRoutines()
    .then(data => {
      setRoutines(data.routines)
      setLoading(false)
    })
    console.log(routines)
  }, [])
  if(loading) return <h1>Loading the routines...</h1>
  if(!routines) return <h1>There's no routines:c</h1>
  return (
    <div>
    <h1>Select your routine</h1>
    <p>Please select the routine is better for you</p>
      {routines.map(routine => (
        <div className={styles.routine_list}>
          <h1>Routine {routine.name}</h1>
          <h2>Exercises:</h2>
          { 
            Object.keys(routine.exercises).map((key, i) => (
              <>
                <h3>{routine.exercises[key].length > 1 && key}</h3>
                <ul className={styles.exercises}>    
                  {
                    routine.exercises[key].map(exercise => (
                      <li>{exercise.name}: {exercise.reps} reps</li>
                    ))
                  }
                </ul>
              </>
            ))
          }
          <button
            className={styles.btn_routine}
            onClick={() => onSelectRoutine(routine._id)}
          >
            Select
          </button>
        </div>
      ))}
    <button 
      className={styles.btn_completed} 
      disabled={!id}
      onClick={onCompleted}
    >
      Register now!
    </button>
    </div>
  )
}
