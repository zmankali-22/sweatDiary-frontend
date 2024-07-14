import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, loading} = useSignup()

    const handleSubmit = async(e) => {
        e.preventDefault()

        await signup(email, password)
    }
  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign UP</h3>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button disabled={loading}> Sign UP</button>
        {error && <div className="error">{error}</div>}
  
    </form>
  )
}
