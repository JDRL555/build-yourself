import { Schema, model, models }              from 'mongoose'
import z                                      from 'zod'
import { EMAIL_REGEX, SEXS, MONGO_ID_REGEX }  from '@/utils/constants'
import Routines                               from '@/models/Routine.js'

const userSchema = new Schema({
  fullName: { type: Schema.Types.String, required: true },
  email:    { type: Schema.Types.String, required: true, unique: [true, "The email must be unique"] },
  password: { type: Schema.Types.String, required: true },
  weight:   { type: Schema.Types.Number, required: true },
  height:   { type: Schema.Types.Number, required: true },
  sex:      { type: Schema.Types.String, required: true, enum: SEXS },
  routine:  { type: Schema.Types.ObjectId, required: true, ref: Routines }
},{ timestamps: true, versionKey: false })

const validateSchema = z.object({
  fullName: z.string(),
  email: z.string().regex(EMAIL_REGEX),
  password: z.string().min(6),
  weight: z.number(),
  height: z.number(),
  sex: z.enum(SEXS),
  routine: z.string().regex(MONGO_ID_REGEX)
})

const validateLoginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX),
  password: z.string().min(6)
})

export function validateLogin(obj) {
  return validateLoginSchema.safeParse(obj)
}

export function validateUser(obj) {
  return validateSchema.safeParse(obj)
}

export default models.User ?? model("User", userSchema)