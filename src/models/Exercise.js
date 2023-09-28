import { Schema, model, models} from 'mongoose'
import z                        from 'zod'
import { TIME_REGEX }           from '../utils/constants.js'

const exerciseSchema = new Schema({
  name:   { type: Schema.Types.String, unique: [true, "The name must be unique"] },
  reps:   Schema.Types.Number,
  series: Schema.Types.Number,
  rest:   Schema.Types.String,
  workTime: { type: Schema.Types.String, default: null },
  category: { type: Schema.Types.String, enum: ["gym", "home", "calisthenic"], default: "home" }
}, { timestamps: true, versionKey: false })

const validateSchema = z.object({
  name: z.string(),
  reps: z.number().int().min(1),
  series: z.number().int().min(1),
  rest: z.string().regex(TIME_REGEX, {message: "The rest must be something like this: 02:20"}),
  workTime: z.string().regex(TIME_REGEX, {message: "The rest must be something like this: 02:20"}).optional(),
  category: z.enum(["gym", "home", "calisthenic"]).default("home")
})

export function validateExercise(obj) {
  return validateSchema.safeParse(obj)
}

export default models.Exercise ?? model("Exercise", exerciseSchema)