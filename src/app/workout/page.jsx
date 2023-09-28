import Workout            from '@/components/Workout'
import { loadExercises }  from '@/utils/fetch.js'

export default async function WorkoutPage() {
  const exercises = await loadExercises()
  return (
    <main>
      <Workout exercises={exercises} />
    </main>
  )
}
