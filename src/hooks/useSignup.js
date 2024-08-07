// hooks/useSignup.js
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, confirmPassword) => {
        setLoading(true)
        setError(null)

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return false
        }

        try {
            const response = await fetch('https://sweatdiary-server.onrender.com/api/user/signup', {
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
                return false
            }

            if (response.ok) {
                // Store the user in local storage
                localStorage.setItem('user', JSON.stringify(json))

                // update the authcontext
                dispatch({ type: 'LOGIN', payload: json })

                setLoading(false)
                return true
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
            setLoading(false)
            return false
        }
    }

    return { signup, error, loading }
}