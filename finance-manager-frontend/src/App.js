import React from "react";
import Header from "./components/pages/Header/Header";
import "./App.css";
import FmContent from "./components/pages/FmContent/FmContent";
import AuthGlobalState from "./components/context/authContext/AuthGlobalState";

function App() {
  return (
    <div className="App">
      <AuthGlobalState>
        <Header />
        <FmContent />
      </AuthGlobalState>
    </div>
  );
}

export default App;
