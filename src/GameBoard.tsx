import React, { useEffect, useRef, useState } from "react";
import CollisionChecker from "./ObjectCollison";
import PlayerControls from "./PlayerControls";

//Initial data for cars on the game board
const initialCars = [
  //list of cars with their starting properties
  // { row: 0, column: 0, color: "bg-pink-500", direction: "left" },
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
  const [isGameReset, setIsGameReset] = useState(false);
  //create a state variable for checking if the game has been played once or more
  //initailze the value as false
  //if the first game var is false then set to true or else do nothing
  //then use that state variable to chose which variable to show
  const [hasPlayed, setHasPlayed] = useState(false);
  //to track if the frog has reached the end of the game
  const [reachedEnd, setReachedEnd] = useState(false);
  //for the modal when the game is completed
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  //for keeping track of the score
  const [score, setScore] = useState(0);
  //basically a ref box that remembers things for you
  const frogPositionRef = useRef({ row: 8, column: 4 });
  //added for personalBest
  const [personalBest, setPersonalBest] = useState(0);

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

    const previousFrogPosition = frogPositionRef.current; // Store the previous frog position

    //set up interval to move cars
    const intervalId = setInterval(moveCars, 450);

    // Check if the frog has reached the end
    if (frogPosition.row === 0) {
      setReachedEnd(true);
      setShowCongratsModal(true);
    }

    //updates the personal best score if the current score is higher
    if (score > personalBest) {
      setPersonalBest(score);
    }

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [frogPosition.row, score]); //including frogposition.row as a dependency

  //for the gameOver and for replaying the game
  const resetGame = () => {
    //reseting the game by initializing the state variables
    setCars(initialCars);
    setFrogPosition({ row: 8, column: 4 });
    setGameOver(false);
    setScore(0);
  };
  // Function to reset the game state
  const resetGameState = () => {
    setCars(initialCars);
    setFrogPosition({ row: 8, column: 4 });
    setGameOver(false);
    setShowCongratsModal(false);
    setReachedEnd(false);
    setScore(0);
  };

  return (
    <>
      {/* whether the player has played the game or not */}
      {!hasPlayed ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-4xl text-center mt-4">
            Welcome to Frogger!
            <div className="text-center mt-4">
              <div className="grid grid-cols-1 gap-4 items-center">
                <h1 className="text-xl">
                  The objective of this game is to cross to the other side
                  without crashing into the other cars moving. To play this game
                  you can use the arrow keys to move around.
                  <div className="mt-4 flex justify-center">
                    <img
                      src="arrowkeys.png"
                      alt="Arrow Keys"
                      className="w-40 h-auto"
                    />
                  </div>
                </h1>
              </div>
            </div>
          </div>
          {/* Start Button */}
          <button
            className="p-4 border border-green-400 hover:bg-green-400"
            onClick={() => setHasPlayed(true)}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          {!gameOver ? (
            <div className="grid grid-cols-9 max-w-[55rem] p-6">
              {/* <p className="col-span-9">{JSON.stringify(cars[0])}</p>
              <p className="col-span-9">{JSON.stringify(frogPosition)}</p>
              <p className="col-span-9">{JSON.stringify(gameOver)}</p> 
              <p className="col-span-9">GREEN CAR{JSON.stringify(cars[7])}</p> */}
              <p className="col-span-9 text-center mb-4 text-3xl">Frogger</p>
              <p className="col-span-9 text-xl">
                Score: {score} | Personal Best : {personalBest}
              </p>
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
                      {/* prop for collisionchecker */}
                      <CollisionChecker
                        frogPosition={frogPosition}
                        cars={cars}
                        setGameOver={setGameOver}
                      />
                      {/* prop for playercontrols */}
                      <PlayerControls
                        frogPosition={frogPosition}
                        setFrogPosition={setFrogPosition}
                        setScore={setScore}
                      />

                      {frogPosition.row === rowIndex &&
                        frogPosition.column === columnIndex && (
                          //for the frog
                          <div className="flex items-center justify-center w-full h-full">
                            <span
                              role="img"
                              aria-label="Frog"
                              style={{ fontSize: "50px" }}
                            >
                              🐸
                            </span>
                          </div>
                        )}
                      {car && (
                        <div className="flex items-center justify-center w-full h-full">
                          <i className="text-white fas fa-car"></i>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="grid grid-row-1 items-center justify-center space-y-4">
              {gameOver ? (
                <>
                  <div className="text-4xl text-red-600 ">Game Over</div>
                  {/* for the play again button */}
                  <button
                    className="p-4 border border-green-400 hover:bg-green-500"
                    onClick={() => {
                      resetGame();
                      resetGameState();
                      setScore(0);
                    }}
                  >
                    Play Again
                  </button>
                  <button
                    className="p-4 border border-green-400 hover:bg-green-400 mt-4"
                    onClick={() => {
                      setHasPlayed(false);
                      resetGameState();
                      //resets score to 0
                      setScore(0);
                    }}
                  >
                    Home
                  </button>
                </>
              ) : (
                //why is this here?i forgot
                <p className="text-4xl "></p>
              )}
            </div>
          )}
        </>
      )}
      {reachedEnd && showCongratsModal && (
        //display a modal overlay
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-2xl font-semibold mb-4">
              Congrats, you've reached the end of the game!
            </p>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => {
                //close the modal and reset the game
                setShowCongratsModal(false);
                resetGame();
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameBoard;
