import { NextResponse }               from 'next/server'
import { MONGO_URI }                  from '@/utils/constants.js'
import { connectToDB }                from '@/utils/db.js'
import Exercise, { validateExercise } from '@/models/Exercise.js'

export async function GET(request) {
  try {
    connectToDB(MONGO_URI)
    let filter    = request.nextUrl.searchParams.get("filter")
    let response  = { msg: "Here's the exercises", exercises: {} }
    
    if(filter) {
      filter            = JSON.parse(filter)
      const exercise     = await Exercise.find(filter)
      response.exercises = exercise
      response.msg      = `Here's the exercise with id ${id}`
      return NextResponse.json(response)
    }

    const exercises    = await Exercise.find()
    console.log(exercises)

    response.exercises = exercises
    
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "ERROR trying to get the exercises..."}, {status: 500})
  }
}

export async function POST(request) {
  try {
    connectToDB(MONGO_URI)
    const body    = await request.json()
    const result  = validateExercise(body)

    if(result.error) {
      return NextResponse.json({error: JSON.parse(result.error.message)}, {status: 400})
    }

    const newExercise     = new Exercise(body)
    const savedExercise   = await newExercise.save()

    return NextResponse.json({msg: "Exercise saved successfully", exercise: savedExercise}, {status: 201})

  } catch (error) {
    console.log(error)
    if(error?.keyPattern) {
      return NextResponse.json({error: `The '${error.keyValue.name}' value already exists`}, {status: 400})   
    }
    return NextResponse.json({error: "Something went wrong..."}, {status: 500})   
  }
}