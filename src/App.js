import React from "react";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Projects />
      </main>
    </div>
  );
}
