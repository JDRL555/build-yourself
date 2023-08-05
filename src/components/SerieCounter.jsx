import { useSelector, useDispatch }     from 'react-redux'
import styles                           from "@/static/Counter.module.css"
import { 
  incrementSerie, decrementSerie
}  from '@/utils/features/serieCounterSlice'

export default function SerieCounter() {
  const serieCounter            = useSelector(state => state.serieReducer.value)
  const dispatch                = useDispatch()  
  
  const onPlusSerieCounter      = () => dispatch(incrementSerie())
  const onSubtractSerieCounter  = () => dispatch(decrementSerie())
  
  return (
    <div className={styles.counters}>
      <p>Number of Series:</p> 
      <div className={styles.counterContainer}>
        <button 
          className={styles.subtract}
          onClick={onSubtractSerieCounter}
        >
          -
        </button> 
        <p className={styles.counter}>{serieCounter}</p> 
        <button 
          className={styles.plus}
          onClick={onPlusSerieCounter}
        >
          +
        </button>
      </div>
    </div>
  )
}
