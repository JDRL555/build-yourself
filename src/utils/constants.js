const MONGO_URI       = process.env.NEXT_PUBLIC_MONGO_URI
const SERVER_API      = process.env.NEXT_PUBLIC_SERVER_API

const EXERCISES_ROUTE = process.env.NEXT_PUBLIC_EXERCISES_ROUTE
const ROUTINES_ROUTE  = process.env.NEXT_PUBLIC_ROUTINES_ROUTE
const USERS_ROUTE     = process.env.NEXT_PUBLIC_USERS_ROUTE

const SECRET_KEY      = process.env.NEXT_PUBLIC_SECRET_KEY

const MAX_AGE         = (60 * 60) * 6

const WEEK_DAYS       = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const SEXS            = ["M", "F", "O"]

const TIME_REGEX      = /^(0\d|[1-5]\d)(?::(0\d|[1-5]\d))?(?:.(00\d|0[1-9]\d|[1-9]\d{2}))?$/gm
const MONGO_ID_REGEX  = /^[0-9a-fA-F]{24}$/
const WEEK_REGEX      = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
const EMAIL_REGEX     = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm

export {
  MONGO_URI, SERVER_API, EXERCISES_ROUTE, ROUTINES_ROUTE, USERS_ROUTE,
  WEEK_DAYS, SEXS, SECRET_KEY,
  MAX_AGE, TIME_REGEX, MONGO_ID_REGEX, WEEK_REGEX, EMAIL_REGEX
}