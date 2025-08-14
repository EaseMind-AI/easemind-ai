import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from "./components/AnimatedRoutes";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1800); // Fast but smooth
    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
