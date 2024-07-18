import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import landingImage from "../assets/landingImage.jpg";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Sweat Diary</h1>
        <p className="text-lg text-gray-700">
          Track your workouts, reach your goals, and stay motivated.
        </p>
        <div className="mt-8">
          <Link to="/signup" className="mr-4 btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline">
            Log In
          </Link>
        </div>
      </header>

      {/* Apply animation to the image */}
      <motion.img
        src={landingImage}
        alt="Sweat Diary Landing"
        className="mx-auto rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }} 
      />

      <section className="py-8">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <ul className="list-disc pl-6">
          <li>Track your workouts</li>
          <li>Monitor your progress</li>
          <li>Set and achieve goals</li>
          <li>Stay motivated with reminders</li>
        </ul>
      </section>

      <section className="py-8">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg text-gray-700">
          Connect with others who share your fitness journey.
        </p>
      </section>
    </div>
  );
}
