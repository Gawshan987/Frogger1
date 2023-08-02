import React, { useEffect, useState } from "react";

const initialCars = [
  { row: 1, column: 1, color: "bg-red-300" },
  { row: 4, column: 4, color: "bg-blue-300" },
  { row: 7, column: 7, color: "bg-green-300" },
];

const GameBoard = () => {
  const [cars, setCars] = useState(initialCars);

  useEffect(() => {
    const moveCars = () => {
      setCars((prevCars) =>
        prevCars.map((car) => ({
          ...car,
          column: car.column > 0 ? car.column - 1 : 8, // If car is at the leftmost position, move it to the rightmost position
        }))
      );
    };

    const intervalId = setInterval(moveCars, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-9 max-w-[55rem]">
      {[...Array(9)].map((_, rowIndex) =>
        [...Array(9)].map((_, columnIndex) => {
          // Determine if a car is at the current position
          const car = cars.find(
            (car) => car.row === rowIndex && car.column === columnIndex
          );

          return (
            <div
              className={`w-24 h-24 border border-gray-500 ${
                car ? car.color : "bg-gray-300"
              }`}
              key={`${rowIndex}-${columnIndex}`}
            >
              {car && (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="fas fa-car text-white"></i>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
