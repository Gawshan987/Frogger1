import React, { useEffect, useState } from "react";

//Initial data for cars on the game board
const initialCars = [
  //list of cars with their starting properties
  { row: 1, column: 1, color: "bg-red-500", direction: "right" },
  { row: 2, column: 2, color: "bg-orange-500", direction: "left" },
  { row: 3, column: 3, color: "bg-purple-500", direction: "right" },
  { row: 4, column: 4, color: "bg-blue-300", direction: "left" },
  { row: 5, column: 5, color: "bg-black", direction: "right" },
  { row: 6, column: 6, color: "bg-yellow-500", direction: "right" },
  { row: 7, column: 7, color: "bg-green-500", direction: "left" },
];

//define the gameboard component
const GameBoard = () => {
  //cars is a state variable that hold the current value of cars
  //setCars is the updater function allows you to update the value of "cars"
  //and initialCars is an array of objects that are the cars, and it
  const [cars, setCars] = useState(initialCars);
  //State to track frog's position and update it
  const [frogPosition, setFrogPosition] = useState({ row: 8, column: 4 });
  const [gameOver, setGameOver] = useState(false);

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

      // check for collision
      object();
    };

    //set up interval to move cars
    const intervalId = setInterval(moveCars, 1000);

    // const intervalId2 = setInterval(handleKeyPress, 500);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  // console.log(cars);

  //for the gameOver and for replaying the game
  const handleGameOver = () => {
    // const playAgain = window.confirm("Game Over. Do you want to replay?");
    setGameOver(true);

    //reseting the game by initializing the state variables
    setCars(initialCars);
    setFrogPosition({ row: 8, column: 4 });
    setGameOver(false);
  };

  //to check for collision
  const object = () => {
    console.log(frogPosition);
    console.log(cars[0].row, cars[0].column, cars[0].color);
    if (
      //only for the first car
      cars[0].column === frogPosition.column &&
      cars[0].row === frogPosition.row
    ) {
      console.log("gameOver");
      handleGameOver();
      return;
    }
  };
  // object();
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
    //console.log(initialCars[0]);

    //update frog's position
    setFrogPosition({ row: newRow, column: newColumn });
  };

  const [lastKeyPress, setLastKeyPress] = useState<KeyboardEvent | null>(null);
  useEffect(() => {
    const keyPressIntervalId = setInterval(() => {
      if (lastKeyPress) {
        handleKeyPress(lastKeyPress);
        setLastKeyPress(null); // Reset the lastKeyPress state
      }
    }, 400);
    const keyDownListener = (event: KeyboardEvent) => {
      setLastKeyPress(event);
    };
    // Add a global event listener to capture key presses
    window.addEventListener("keydown", keyDownListener);
    // Clean up the interval and event listener on unmount
    return () => {
      clearInterval(keyPressIntervalId);
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [lastKeyPress]);

  return (
    //creating a grid container
    <>
      {gameOver ? (
        "Game Over"
      ) : (
        <div className="grid grid-cols-9 max-w-[55rem]">
          {/* //loop through each row */}
          {[...Array(9)].map((_, rowIndex) =>
            //loop through each column
            [...Array(9)].map((_, columnIndex) => {
              // Determine if a car is at the current position
              const car = cars.find(
                //if the car's row and column match the car will store the car
                //the "(car)" is finding what matches
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
      )}
    </>
  );
};

export default GameBoard;
