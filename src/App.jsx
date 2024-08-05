// App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Statistics from "./components/Statistics";
import Modal from "./components/Modal";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar openModal={openModal} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/home" />: <LandingPage openModal={openModal} />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
            <Route path="/statistics" element={user ? <Statistics /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <Modal isOpen={!!modalContent} onClose={closeModal}>
          {modalContent === 'login' && <Login closeModal={closeModal} />}
          {modalContent === 'signup' && <Signup closeModal={closeModal} />}
        </Modal>
      </BrowserRouter>
    </div>
  );
}

export default App;