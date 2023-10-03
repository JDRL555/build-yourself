import { NextResponse }                       from 'next/server'
import { headers, cookies }                    from 'next/headers'
import bcrypt                                 from 'bcrypt'
import jwt                                    from 'jsonwebtoken'
import cookie                                 from 'cookie'
import { MONGO_URI, SECRET_KEY, MAX_AGE }     from '@/utils/constants.js'
import { connectToDB }                        from '@/utils/db.js'
import User, { validateUser, validateLogin }  from '@/models/User.js'
import Routine                                from '@/models/Routine.js'

export async function GET(request) {
  connectToDB(MONGO_URI)
  let filter        = request.nextUrl.searchParams.get("filter")
  const session     = request.nextUrl.searchParams.get("session")
  let response      = { msg: "Here's the users", users: {} }
  
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

  if(session) {
    const cookieStore = cookies()
    const token       = cookieStore.get("session")

    if(token) {
      try {
        const user = jwt.verify(token.value, SECRET_KEY)
        return NextResponse.json(
          {
            error: false,
            msg: "Here's the user", 
            user, 
            status: 200
          }, 
          {
            status: 200
          }
        )
      } catch (error) {
        return NextResponse.json(
          {
            error: true,
            msg: "Invalid token. Please make sure you're logged successfully", 
            user: {}, 
            status: 400
          }, 
          {
            status: 400
          }
        )
      }
    } else return NextResponse.json(
      {
        error: true,
        msg: "You're not logged. Please login", 
        user: {}, 
        status: 401
      }, 
      {
        status: 401
      }
    )

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
    const headersList = headers()
    const login       = headersList.get("login") 
    let body          = await request.json()
    
    if(!login) {
      const result  = validateUser(body)
      if(result.error) {
        return NextResponse.json({msg: "Something went wrong... Try again", error: JSON.parse(result.error.message), status: 400}, {status: 400})
      }
  
      const hashed_password = await bcrypt.hash(body.password, bcrypt.genSaltSync(10))
      body = { ...body, password: hashed_password }
  
      const newUser   = new User(body)
      const savedUser = await newUser.save()
  
      return NextResponse.json({msg: "User saved successfully", status: 201, savedUser}, {status: 201})
    }

    const result      = validateLogin(body)
    console.log(result)

    if(result.error) {
      let msg     = "Something went wrong... Try again"
      const error = JSON.parse(result.error.message)[0]

      console.log(error)
      
      if(error.code == "too_small") msg = "The password must be at least 6 characters"
      
      return NextResponse.json({msg, error, status: 400}, {status: 400})
    }

    let userFound = await User.findOne({email: body.email}).lean()

    if(!userFound) {
      return NextResponse.json({msg: "Incorrect email or not registered", status: 404}, {status: 404})
    }
    
    const valid_password = await bcrypt.compare(body.password, userFound.password)

    if(!valid_password) {
      return NextResponse.json({msg: "Incorrect password", status: 400}, {status: 400})
    }

    const token = jwt.sign(userFound, SECRET_KEY, { expiresIn: MAX_AGE })

    const cookieSerialized = cookie.serialize("session", token, {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/"
    })

    return NextResponse.json(
      {
        msg: `Welcome ${userFound.fullName}`, 
        status: 200, 
        body
      }, 
      {
        status: 200,
        headers: {"Set-Cookie": cookieSerialized}
      }
    )

  } catch (error) {
    console.log(error)
    return NextResponse.json({msg: "Something went wrong... Try again", error, status: 500}, {status: 500})
  }
}