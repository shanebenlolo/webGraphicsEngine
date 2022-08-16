import { Suspense } from "react";
import { MainUi } from "./components/MainUi";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
          <MainUi />
      </Suspense>
    </div>
  );
}

export default App;
