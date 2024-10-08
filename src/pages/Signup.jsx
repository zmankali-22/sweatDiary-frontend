// components/Signup.jsx
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const ErrorMessage = ({ message }) => (
  <Alert variant="destructive" className="mt-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default function Signup({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, loading } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(email, password, confirmPassword);
    if (success) {
      closeModal();
      navigate('/home');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold mb-6">Sign Up</h3>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing up...
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
      
      {error && <ErrorMessage message={error} />}
    </form>
  );
}