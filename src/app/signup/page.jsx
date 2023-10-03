"use client"
import { useSelector }  from 'react-redux'
import Swal             from 'sweetalert2'
import AccountForm      from '@/components/AccountForm'
import PersonalForm     from '@/components/PersonalForm'
import Routines         from '@/components/Routines'
import ProgressBar      from '@/components/ProgressBar'
import { createUser }   from '@/utils/fetch'

export default function SignUp() {
  const step      = useSelector(state => state.step.value)
  const userData  = useSelector(state => state.users.value)

  if(step == 3) {
    createUser(userData)
    .then(data => {
      if(data.status != 201) {
        Swal.fire({
          title: data.msg,
          text: JSON.stringify(data.error),
          icon: "error",
          confirmButtonText: "Retry"
        })
        .then(() => window.location.href = "/signup")
      }else{
        Swal.fire({
          title: "SUCCESS",
          text: data.msg,
          icon: "success",
          confirmButtonText: "Sign in right now!"
        })
        .then(() => window.location.href = "/signin")
      }
    })
  }

  return (
    <main>
      <section className="register_list">
        {step == 0 && <AccountForm />}
        {step == 1 && <PersonalForm />}
        {step == 2 && <Routines />}
        {
          step == 3 &&
          Swal.fire({
            title: "Creating the user, please wait...",
            icon: "info",
            showConfirmButton: false
          })
        }
      </section>
      <ProgressBar />
    </main>
  )
}
