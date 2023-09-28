import { useState }                 from 'react'
import { useSelector, useDispatch}  from 'react-redux'
import { setColumn }                from '@/utils/redux/features/userSlice.js'
import { changeStep }               from '@/utils/redux/features/stepSlice.js'
import styles                       from '@/static/modules/Form.module.css'

export default function AccountForm() {
  const userData                = useSelector(state => state.users.value)
  const step                    = useSelector(state => state.step.value)
  const dispatch                = useDispatch()
  const [confirm, setConfirm]   = useState("")

  const data = [
    {text: "fullName", title: "Fullname", type: "text"}, 
    {text: "email", title: "Email", type: "email"}, 
    {text: "password", title: "Password", type: "password"}, 
    {text: "confirm", title: "Confirm your password", type: "password"}, 
  ]
  
  const onChange = e => {
    dispatch(setColumn({key: [e.target.name], value: e.target.value}))
  }

  const onConfirmChange = e => setConfirm(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    const progress = document.querySelector(".ProgressBar_progress__ZUKg6")
    progress.style.width = `${((step + 1) / 3) * 100}%`
    dispatch(changeStep())
  }

  return (
    <div className="step">
      <h1>Account Info</h1>
      <p>First at all, give us all the data that will be related with your account!</p>
      <form className={styles.form} onSubmit={onSubmit}>
        {data.map(data => (
          <div className={styles.container}>
            <label htmlFor={data.text}>{data.title}</label>
            <input 
              type={data.type}      
              name={data.text}
              id={data.text} 
              required 
              onChange={data.text == "confirm" ? onConfirmChange : onChange} 
            />
          </div>
        ))}
        <button 
          type='submit'
          disabled={
            confirm != userData.password || 
            !userData.fullName || 
            !userData.email || 
            !userData.password 
          }
        >
          Next
        </button>
      </form>
    </div>
  )
}
