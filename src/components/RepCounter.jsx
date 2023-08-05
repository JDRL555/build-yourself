import { useSelector, useDispatch }     from 'react-redux'
import styles                           from "@/static/Counter.module.css"
import { 
  incrementRep, decrementRep,resetRep 
}  from '@/utils/features/repCounterSlice'

export default function RepCounter() {
  const dispatch                = useDispatch()  
  const repCounter              = useSelector(state => state.repReducer.value)
  
  const onPlusRepCounter        = () => dispatch(incrementRep())
  const onSubtractRepCounter    = () => dispatch(decrementRep())
  
  return (
    <div className={styles.counters}>
      <p>Number of Reps:</p>
      <div className={styles.counterContainer}>
        <button 
          className={styles.subtract}
          onClick={onSubtractRepCounter}
        >
          -
        </button> 
        <p className={styles.counter}>{repCounter}</p> 
        <button 
          className={styles.plus}
          onClick={onPlusRepCounter}
        >
          +
        </button>
      </div>
    </div>
  )
}
