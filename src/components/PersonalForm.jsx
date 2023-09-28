import { useSelector, useDispatch}  from 'react-redux'
import { setColumn }                from '@/utils/redux/features/userSlice.js'
import { changeStep }               from '@/utils/redux/features/stepSlice.js'
import { SEXS }                     from '@/utils/constants.js'
import styles                       from '@/static/modules/Form.module.css'

export default function PersonalForm() {
  const userData                = useSelector(state => state.users.value)
  const step                    = useSelector(state => state.step.value)
  const dispatch                = useDispatch()

  const data = [
    {text: "weight",  title: "Weight (kg)", type: "number"}, 
    {text: "height",  title: "Height (m)", type: "number"}, 
    {text: "sex",     title: "Sex (M: Male, F: Female, O: Other)", type: "select"},  
  ]
  
  const onChange = e => {
    dispatch(setColumn({key: [e.target.name], value: e.target.value}))
  }

  const onSubmit = e => {
    e.preventDefault()
    const progress = document.querySelector(".ProgressBar_progress__ZUKg6")
    progress.style.width = `${((step + 1) / 3) * 100}%`
    dispatch(changeStep())
  }

  return (
    <div className="step">
      <h1>Personal Info</h1>
      <p>Now we need to know more about your body to recommend you!</p>
      <form className={styles.form} onSubmit={onSubmit}>
        {data.map(data => (
          data.type != "select" 
          ?  
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
          :
          <div className={styles.container}>
            <label htmlFor={data.text}>{data.title}</label>
            <select   
              name="sex"  
              onChange={onChange}
            >
              {SEXS.map(sex => (
                <option value={sex}>{sex}</option>
              ))}
            </select>
          </div>
        ))
        }
        <button 
          type='submit'
          disabled={ 
            !userData.weight || 
            !userData.height || 
            !userData.sex 
          }
        >
          Register
        </button>
      </form>
    </div>
  )
}
