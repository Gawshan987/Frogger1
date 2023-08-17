import React, { useEffect } from "react";

interface Car {
  row: number;
  column: number;
}
interface FrogPosition {
  row: number;
  column: number;
}
interface CollisionCheckerProps {
  frogPosition: FrogPosition;
  cars: Car[];
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollisionChecker: React.FC<CollisionCheckerProps> = ({
  frogPosition,
  cars,
  setGameOver,
}) => {
  useEffect(() => {
    const checkForCollision = () => {
      // Check if frog is in the same row and column as any car
      if (
        // Only for the first car
        cars[0].column === frogPosition.column &&
        cars[0].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
    };

    checkForCollision();
  }, [frogPosition, cars, setGameOver]);

  return null; // No need to render anything for this component
};

export default CollisionChecker;
