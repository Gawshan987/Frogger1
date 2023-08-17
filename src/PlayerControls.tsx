import React, { useEffect, useState } from "react";

interface FrogPosition {
  row: number;
  column: number;
}

interface PlayerControlsProps {
  frogPosition: FrogPosition;
  setFrogPosition: React.Dispatch<React.SetStateAction<FrogPosition>>;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  frogPosition,
  setFrogPosition,
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
      newRow = newRow > 0 ? newRow - 1 : 0;
    } else if (key === "ArrowDown") {
      newRow = newRow < 8 ? newRow + 1 : 8;
    }

    setFrogPosition({ row: newRow, column: newColumn });
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [frogPosition, setFrogPosition]);

  // You can return some JSX here if needed
  return null;
};

export default PlayerControls;
