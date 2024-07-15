import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const {login, error, loading} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(email, password)
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
        <button disabled={loading}>Login</button>
        {error && <div className="error">{error}</div>}
  
    </form>
  )
}
