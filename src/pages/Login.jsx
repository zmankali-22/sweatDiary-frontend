import { useState } from "react"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(email, password)
    }
  return (
    <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Login</button>
  
    </form>
  )
}
