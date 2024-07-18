import { motion } from "framer-motion";
import landingImage from "../assets/landingImage.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Sweat Diary
        </h1>
        <p className="text-md text-gray-700">
          Track your workouts, reach your goals, and stay motivated.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant = "link">
            <Link to="/signup" >
              Get Started
            </Link>
          </Button>
          <Button asChild variant= "secondary">
            <Link to="/login" >
              Log In
            </Link>
          </Button>
        </div>
      </header>

      {/* Apply animation to the image */}
      <motion.img
        src={landingImage}
        alt="Sweat Diary Landing"
        className="mx-auto rounded-lg shadow-lg"
        style={{ maxWidth: "90%", maxHeight: "70vh", display: "block" }} 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </div>
  );
}

