import {Schema, model, models}        from 'mongoose'
import Exercise                       from '@/models/Exercise.js'
import { MONGO_ID_REGEX, WEEK_REGEX } from '@/utils/constants.js'
import z                              from 'zod'

const routineSchema = new Schema({
  name: Schema.Types.String,
  days: { type: Schema.Types.Number, default: null },
  exercises: {
    monday:     [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    tuesday:    [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    wednesday:  [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    thursday:   [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    friday:     [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    saturday:   [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
    sunday:     [{ type: Schema.Types.ObjectId, default: null, ref: Exercise }],
  }
}, { timestamps: true, versionKey: false })

const validateSchema = z.object({
  name: z.string(),
  days: z.number().min(1),
  exercises: z.record(z.string().regex(WEEK_REGEX), z.array(z.string().regex(MONGO_ID_REGEX)).min(1))
})

export function validateRoutine(obj) {
  return validateSchema.safeParse(obj)
}

export default models.Routine ?? model("Routine", routineSchema)