import React, { useEffect, useState } from "react";

//Initial data for cars on the game board
const initialCars = [
  //list of cars with their starting properties
  { row: 1, column: 1, color: "bg-red-300", direction: "right" },
  { row: 2, column: 2, color: "bg-orange-500", direction: "left" },
  { row: 3, column: 3, color: "bg-purple-500", direction: "right" },
  { row: 4, column: 4, color: "bg-blue-300", direction: "left" },
  { row: 5, column: 5, color: "bg-black", direction: "right" },
  { row: 6, column: 6, color: "bg-yellow-500", direction: "right" },
  { row: 7, column: 7, color: "bg-green-300", direction: "left" },
];

//define the gameboard component
const GameBoard = () => {
  //cars is a state variable that hold the Current value of cars that
  //will change over time based on the users interactions
  //setCars is the updater function allows you to update the value of "cars"
  //and initialCars is an array of objects that are the cars, and it
  //allows you to update the value of the "cars" state variable
  //State to keep track of car positions and update them
  const [cars, setCars] = useState(initialCars);
  //State to track frog's position and update it
  const [frogPosition, setFrogPosition] = useState({ row: 8, column: 4 });

  //use useEffect to move cars at regular intervals
  useEffect(() => {
    //function to update car positions based on direction
    const moveCars = () => {
      setCars((prevCars) =>
        prevCars.map((car) => {
          //Move each car according to its direction
          const newRow = car.row;
          let newColumn = car.column;
          //if direction of car is left
          if (car.direction === "left") {
            //if car column is greater than 0 then -1 else set car column to 8
            newColumn = newColumn > 0 ? newColumn - 1 : 8;
          } else {
            //else increment car column by 1 and loop within grid boundaries (0 to 8)
            newColumn = (newColumn + 1) % 9;
          }

          return {
            ...car,
            column: newColumn,
          };
        })
      );
    };

    //set up interval to move cars
    const intervalId = setInterval(moveCars, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  //handlekeypress to move the frog
  const handleKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
    let newRow = frogPosition.row;
    let newColumn = frogPosition.column;

    //update frog's position based on arrow key press
    if (key === "ArrowLeft") {
      newColumn = newColumn > 0 ? newColumn - 1 : 0;
      //move frog left if within bounds
    } else if (key === "ArrowRight") {
      newColumn = newColumn < 8 ? newColumn + 1 : 8;
      //move frog right if within bounds
    } else if (key === "ArrowUp") {
      newRow = newRow > 0 ? newRow - 1 : 0;
      //move frog up if within bounds
    } else if (key === "ArrowDown") {
      newRow = newRow < 8 ? newRow + 1 : 8;
      //move frog down if within bounds
    }

    //update frog's position
    setFrogPosition({ row: newRow, column: newColumn });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [frogPosition]);

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
              {frogPosition.row === rowIndex &&
                frogPosition.column === columnIndex && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      role="img"
                      aria-label="Frog"
                      style={{ fontSize: "70px" }}
                    >
                      🐸
                    </span>
                  </div>
                )}
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
