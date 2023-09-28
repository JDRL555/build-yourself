import { useSelector }  from 'react-redux'
import styles           from '@/static/modules/ProgressBar.module.css'

export default function ProgressBar() {
  const step = useSelector(state => state.step.value)
  
  return (
    <div className={styles.progress_container}>
      <div className={styles.progress_bar}>
        <div className={styles.progress}></div>
      </div>
      <p>{step}/3 steps completed</p>
    </div>
  )
}
