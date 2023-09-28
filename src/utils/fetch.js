import { 
  SERVER_API, EXERCISES_ROUTE, ROUTINES_ROUTE, USERS_ROUTE, WEEK_DAYS 
}  from '@/utils/constants.js'

export async function loadExercises() {
  let today         = new Date().getDay()
  const res         = await fetch(SERVER_API + ROUTINES_ROUTE)
  const data        = await res.json()
  console.log(data)
  const exercises   = data.routines[0].exercises
  
  today = WEEK_DAYS.find(day => WEEK_DAYS.indexOf(day) == today - 1)
  
  const todayExercises = exercises[today]

  return todayExercises
}

export async function getRoutines() {
  const res   = await fetch(SERVER_API + ROUTINES_ROUTE)
  const data  = await res.json()
  return data
}

export async function getExercises() {
  const res   = await fetch(SERVER_API + EXERCISES_ROUTE)
  const data  = await res.json()
  return data
}

export async function createUser(data) {
  let res = await fetch(SERVER_API + USERS_ROUTE, { 
    method: "POST", 
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    } 
  })
  res     = await res.json()
  return res
}