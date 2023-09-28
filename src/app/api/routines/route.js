import { NextResponse }             from 'next/server'
import { MONGO_URI }                from '@/utils/constants.js'
import { connectToDB }              from '@/utils/db.js'
import Routine, { validateRoutine } from '@/models/Routine.js'

export async function GET(request) {
  try {
    connectToDB(MONGO_URI)
    let filter  = request.nextUrl.searchParams.get("filter")
    let response  = { msg: "Here's the routines", routines: {} }
    
    if(filter) {
      try {
        filter = JSON.parse(filter)
        console.log(filter)  
      } catch {
        return NextResponse.json({msg: "The filter must be a JSON: Example: {'name': 'push-up'}"}, {status: 400})
      }
      const filters     = Object.keys(filter)
      const routines    = await Routine.find(filter).populate("exercises.monday exercises.tuesday exercises.wednesday exercises.thursday exercises.friday exercises.saturday exercises.sunday").exec()
      
      if(filters.length > 1) {
        response.msg  = `Here's the filters ${filters}`
      }else{
        response.msg  = `Here's the filter ${filters[0]}`
      }
      
      response.routines = routines
  
      return NextResponse.json(response)
    }

    const routines    = await Routine.find().populate("exercises.monday exercises.tuesday exercises.wednesday exercises.thursday exercises.friday exercises.saturday exercises.sunday").exec()

    response.routines = routines
    
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "ERROR trying to get the routines..."}, {status: 500})
  }
}

export async function POST(request) {
  try {
    connectToDB(MONGO_URI)
    const body      = await request.json()
    if(!body?.exercises || typeof body.exercises != "object") {
      return NextResponse.json({error: "The exercises are required and must be an object"}, {status: 400})
    }

    body.days       = Object.keys(body.exercises).length

    const result    = validateRoutine(body)

    if(result.error) {
      return NextResponse.json({error: JSON.parse(result.error.message)}, {status: 400})
    }

    const newRoutine     = new Routine(body)
    const savedRoutine   = await newRoutine.save()

    return NextResponse.json({msg: "Routine saved successfully", routine: savedRoutine}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Something went wrong..."}, {status: 500})
  }
}

export function PUT(request) {
  const id      = request.nextUrl.searchParams.get("id")
  let response  = { msg: `Updating the routine ${id}` }

  if(!id) {
    response.msg = "The id's required to update the routine"
    return NextResponse.json(response, {status: 400})
  }
  
  return NextResponse.json(response)
}

export function DELETE(request) {
  const id      = request.nextUrl.searchParams.get("id")
  let response  = { msg: `Deleting the routine ${id}` }

  if(!id) {
    response.msg = "The id's required to delete the routine"
    return NextResponse.json(response, {status: 400})
  }
  
  return NextResponse.json(response)
}