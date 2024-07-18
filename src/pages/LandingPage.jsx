import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Sweat Diary</h1>
        <p className="text-lg text-gray-700">Track your workouts, reach your goals, and stay motivated.</p>
        <div className="mt-8">
          <Link to="/signup" className="mr-4 btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-outline">Log In</Link>
        </div>
      </header>
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
        <p className="text-lg text-gray-700">Connect with others who share your fitness journey.</p>
      </section>
    </div>
  );
}
