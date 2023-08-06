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

  return (
    <div className="grid grid-cols-9 max-w-[55rem]">
      {[...Array(9)].map((_, rowIndex) =>
        [...Array(9)].map((_, columnIndex) => (
          <div
            className={`w-24 h-24 border border-gray-500 ${
              frogPosition.row === rowIndex &&
              frogPosition.column === columnIndex
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
            key={`${rowIndex}-${columnIndex}`}
          >
            {frogPosition.row === rowIndex &&
              frogPosition.column === columnIndex && (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    role="img"
                    aria-label="Frog"
                    style={{ fontSize: "1px" }}
                  >
                    🐸
                  </span>
                </div>
              )}
          </div>
        ))
      )}
    </div>
  );
};

export default PlayerControls;
