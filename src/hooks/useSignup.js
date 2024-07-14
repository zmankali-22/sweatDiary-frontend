import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useSignup = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

   const {dispatch} = useAuthContext()

    const signup = async (email, password) => {

        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:3001/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setLoading(false)
            
        }
        if (response.ok) {
            // Store the user in local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the authcontext
            dispatch({ type: 'LOGIN', payload: json })

            setLoading(false)
        }
    }

    return { signup, error, loading }
}