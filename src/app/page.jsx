"use client"
import Link from "next/link"
import "@/static/app.css"

export default function App() {
  return (
    <main>
      <h1>Welcome to Build Yourself</h1>
      <p>Where we're here to help you to <b>build your best version</b></p>
      <p><b>Register now to start with us!</b></p>
      <div className="btnContainer">
        <Link className="btn" href="/signup">Register now!</Link>
        <Link className="btn" href="/signin">Do you have an account? Login now!</Link>
      </div>
    </main>
  )
}
