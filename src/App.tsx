import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GameBoard from "./GameBoard";
import PlayerControls from "./PlayerControls";

export default function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}
