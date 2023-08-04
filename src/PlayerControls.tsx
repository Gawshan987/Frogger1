import React, { useEffect, useState } from "react";

const PlayerControls = () => {
  const [frogPosition, setFrogPosition] = useState({ row: 8, column: 4 });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          setFrogPosition((prevPosition) => ({
            ...prevPosition,
            column: Math.max(prevPosition.column - 1, 0),
          }));
          break;
        case "ArrowRight":
          setFrogPosition((prevPosition) => ({
            ...prevPosition,
            column: Math.min(prevPosition.column + 1, 8),
          }));
          break;
        case "ArrowUp":
          setFrogPosition((prevPosition) => ({
            ...prevPosition,
            row: Math.max(prevPosition.row - 1, 0),
          }));
          break;
        case "ArrowDown":
          setFrogPosition((prevPosition) => ({
            ...prevPosition,
            row: Math.min(prevPosition.row + 1, 8),
          }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });
  return <div></div>;
};

export default PlayerControls;
