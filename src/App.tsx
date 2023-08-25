import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WidgetTable from "./components/WidgetTable";
import EditWidget from "./components/EditWidget";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={WidgetTable} />
        <Route path="/edit" Component={EditWidget} />
      </Routes>
    </div>
  );
}

export default App;
