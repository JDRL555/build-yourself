import { NextResponse }             from 'next/server'
import bcrypt                       from 'bcrypt'
import { MONGO_URI }                from '@/utils/constants.js'
import { connectToDB }              from '@/utils/db.js'
import User, { validateUser }       from '@/models/User.js'
import Routine                      from '@/models/Routine.js'

export async function GET(request) {
  connectToDB(MONGO_URI)
  let filter    = request.nextUrl.searchParams.get("filter")
  let response  = { msg: "Here's the users", users: {} }
  
  if(filter) {
    try {
      filter = JSON.parse(filter)  
    } catch {
      return NextResponse.json({msg: "The filter must be a JSON: Example: {'name': 'push-up'}"}, {status: 400})
    }
    const filters   = Object.keys(filter)
    const users     = await User.find(filter)
    
    if(filters.length > 1) {
      response.msg  = `Here's the filters ${filters}`
    }else{
      response.msg  = `Here's the filter ${filters[0]}`
    }
    
    response.users = users

    return NextResponse.json(response)
  }
  const users           = await User.find()
  const users_info      = []

  for await(const user of users) {
    const user_routine  = await Routine.find({_id: user.routine}).populate("exercises.monday exercises.tuesday exercises.wednesday exercises.thursday exercises.friday exercises.saturday exercises.sunday").exec()
    const user_obj      = user.toObject()
    user_obj.routine    = user_routine[0]
    users_info.push(user_obj)
  }
  
  console.log(users_info) 
  return NextResponse.json({users_info})
}

export async function POST(request) {
  try {
    connectToDB(MONGO_URI)
    let body        = await request.json()
    const result    = validateUser(body)

    if(result.error) {
      return NextResponse.json({msg: "Something went wrong... Try again", error: JSON.parse(result.error.message), status: 400}, {status: 400})
    }

    const hashed_password = await bcrypt.hash(body.password, bcrypt.genSaltSync(10))
    body = { ...body, password: hashed_password }

    const newUser   = new User(body)
    const savedUser = await newUser.save()

    return NextResponse.json({msg: "User saved successfully", status: 201, routine: savedUser}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({msg: "Something went wrong... Try again", error, status: 500}, {status: 500})
  }
}