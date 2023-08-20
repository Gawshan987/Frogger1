import React, { useEffect, useState } from "react";

interface FrogPosition {
  row: number;
  column: number;
}

interface PlayerControlsProps {
  frogPosition: FrogPosition;
  setFrogPosition: React.Dispatch<React.SetStateAction<FrogPosition>>;
  setScore: React.Dispatch<React.SetStateAction<number>>; // Added setScore prop
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  frogPosition,
  setFrogPosition,
  setScore,
}) => {
  const keyDownListener = (event: KeyboardEvent) => {
    const { key } = event;
    let newRow = frogPosition.row;
    let newColumn = frogPosition.column;

    if (key === "ArrowLeft") {
      newColumn = newColumn > 0 ? newColumn - 1 : 0;
    } else if (key === "ArrowRight") {
      newColumn = newColumn < 8 ? newColumn + 1 : 8;
    } else if (key === "ArrowUp") {
      if (newRow > 0) {
        setScore((prevScore) => prevScore + 1); // Increase score when moving forward
        newRow--;
      }
    } else if (key === "ArrowDown") {
      if (newRow < 8) {
        setScore((prevScore) => Math.max(prevScore - 1, 0)); // Decrease score if > 0 when moving backward
        newRow++;
      }
    }
    setFrogPosition({ row: newRow, column: newColumn });
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [frogPosition, setFrogPosition]);

  return null;
};

export default PlayerControls;
