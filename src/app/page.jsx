"use client"
import { useState, useEffect }          from 'react'
import { useSelector, useDispatch }     from 'react-redux'
import { resetSerie }                   from '@/utils/features/serieCounterSlice'
import { resetRep }                     from '@/utils/features/repCounterSlice'
import Link                             from "next/link"
import SerieCounter                     from "@/components/serieCounter"
import RepCounter                       from "@/components/RepCounter"
import "@/static/app.css"

export default function App() {
  const [ href, setHref ] = useState("/")

  const serieCounter  = useSelector(state => state.serieReducer.value)
  const repCounter    = useSelector(state => state.repReducer.value)
  
  const dispatch = useDispatch()  
  
  const onReset = () => {
    dispatch(resetSerie())
    dispatch(resetRep())
  }

  useEffect(() => {
    serieCounter != 0 || repCounter != 0 ? setHref("/workout") : setHref("/")
  }, [serieCounter, repCounter])

  return (
    <main>
      <h1>Welcome to Build Yourself</h1>
      <SerieCounter />
      <RepCounter />
      <div className="btnContainer">
        <button className="btn" onClick={onReset}>Reset</button>
        <Link className="btn" href={href}>Start workout</Link>
      </div>
    </main>
  )
}
