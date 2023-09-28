import { NextResponse }               from 'next/server'
import { connectToDB }                from '@/utils/db.js'
import { MONGO_URI, MONGO_ID_REGEX }  from '@/utils/constants.js'
import Exercise, { 
  validateExercise, 
  validateSchema 
} from '@/models/Exercise.js'

export async function GET(request, {params}) {
  const { id } = params 

  if(!MONGO_ID_REGEX.test(id)) {
    return NextResponse.json(
      {error: "Invalid mongo ID", expected: "Something like: 64dc27..."}, 
      {status: 400}
    )
  }

  const foundExercise = await Exercise.findById(id)

  if(!foundExercise) {
    return NextResponse.json({error: "Exercise not found"}, {status: 404})
  }

  return NextResponse.json({msg: `Here's the exercise with id ${id}`, exercise: foundExercise})
}

export async function PUT(request, {params}) {
  try {
    await connectToDB(MONGO_URI)
    const { id }      = params 

    if(!MONGO_ID_REGEX.test(id)) {
      return NextResponse.json(
        {error: "Invalid mongo ID", expected: "Something like: 64dc27..."}, 
        {status: 400}
      )
    }

    const body        = await request.json()
    const { Values }  = validateSchema.keyof()
    const keys        = Object.keys(Values)
    let valid
    let i = 0

    for(const [key, value] of Object.entries(body)) {
      if(keys.includes(key)) {
        const result = validateSchema.shape[key].safeParse(value)
        if(!result.success) {
          valid = false
          break
        } 
      }
      valid = true
    }

    if(!valid) {
      return NextResponse.json({error: "Invalid keys or invalid data type", expected: keys}, {status: 400})
    }

    await Exercise.findByIdAndUpdate(id, body)

    return NextResponse.json({msg: "Exercise updated successfully"})

  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Something went wrong..."}, {status: 500})   
  }
}