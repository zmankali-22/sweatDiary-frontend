import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import landingImage from "../assets/landingImage.jpg";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to Sweat Diary
        </h1>
        <p className="text-lg text-gray-700">
          Track your workouts, reach your goals, and stay motivated.
        </p>
        <div className="mt-4">
          <Link to="/signup" className="mr-4 btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline">
            Log In
          </Link>
        </div>
      </header>

      <motion.img
        src={landingImage}
        alt="Sweat Diary Landing"
        className="mx-auto rounded-lg shadow-lg"
        style={{ maxWidth: "90%", maxHeight: "70vh" }} 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </div>
  );
}
