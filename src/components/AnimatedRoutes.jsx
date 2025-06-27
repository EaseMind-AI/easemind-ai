import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "../pages/Home";
import Reflection from "../pages/Reflection";
import Mood from "../pages/Mood";
import MoodHistory from "../pages/MoodHistory";
import History from "../pages/History";
import Journal from "../pages/Journal";
import AIChat from "../pages/AIChat";
import Coping from "../pages/Coping";
import BreathingTool from "../pages/BreathingTool";
import GroundingTool from "../pages/GroundingTool";
import MuscleRelaxationTool from "../pages/MuscleRelaxationTool";
import Reminder from "../pages/Reminder";
import Profile from "../pages/Profile";
import Onboarding from "../pages/Onboarding";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route path="/reflection" element={<Reflection />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/MoodHistory" element={<MoodHistory />} />
        <Route path="/History" element={<History />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/ai" element={<AIChat />} />
        <Route path="/coping" element={<Coping />} />
        <Route path="/coping/breathing" element={<BreathingTool />} />
        <Route path="/coping/grounding" element={<GroundingTool />} />
        <Route path="/coping/muscle" element={<MuscleRelaxationTool />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </AnimatePresence>
  );
}
