// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PaintApp from "./components/PaintApp/PaintApp";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header onStartCreating={() => setShowApp(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onStartNow={() => setShowApp(true)} />
                <Features />
                <HowItWorks />
              </>
            }
          />
          <Route path="/app" element={<PaintApp />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
