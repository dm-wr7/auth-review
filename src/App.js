import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  return (
    <div className="App">
      <div className="user">
        {isLoggedIn ? (
          <h1>Current user: {user.email}</h1>
        ) : (
          <h1>No user logged in</h1>
        )}
      </div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  )
}

export default App
