import { Suspense } from "react";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

import { WebglCanvas } from "./components/webglCanvas/WebglCanvas";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Navbar />
        <Routes>
          <Route path="/" element={<WebglCanvas />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
