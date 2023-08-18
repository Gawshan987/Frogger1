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
      if (
        // Only for the second car
        cars[1].column === frogPosition.column &&
        cars[1].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      if (
        // Only for the third car
        cars[2].column === frogPosition.column &&
        cars[2].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      if (
        // Only for the fourth car
        cars[3].column === frogPosition.column &&
        cars[3].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      if (
        // Only for the fifth car
        cars[4].column === frogPosition.column &&
        cars[4].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      if (
        // Only for the sixth car
        cars[5].column === frogPosition.column &&
        cars[5].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      if (
        // Only for the seventh car
        cars[6].column === frogPosition.column &&
        cars[6].row === frogPosition.row
      ) {
        setGameOver(true);
        return;
      }
      // if (
      //   // Only for the eight car
      //   cars[7].column === frogPosition.column &&
      //   cars[7].row === frogPosition.row
      // ) {
      //   setGameOver(true);
      //   return;
      // }
    };

    checkForCollision();
  }, [frogPosition, cars, setGameOver]);

  return null; // No need to render anything for this component
};

export default CollisionChecker;
