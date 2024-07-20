// components/Footer.jsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-teal-400">
              Sweat Diary
            </h2>
            <p className="text-sm text-gray-300">
              Track your fitness journey
            </p>
          </div>
          <div className="text-sm text-gray-300">
            <p>
              &copy; {currentYear} Sweat Diary. All rights reserved.
            </p>
            <p className="mt-1">
              Created with passion for fitness enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
