import React from 'react'
import { useState } from "react";
import "./App.scss";
import Row from "./components/Row/Row"

const App = () => {
  const targetWord = "REACT";
  const maxAttempts = 6;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    const updatedGuesses:string[] = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if (currentGuess === targetWord || updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="main">
      <h1>Wordle</h1>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} targetWord={targetWord} />
      ))}
      {!isGameOver && (
        <>
          <input
            className="main__input"
            onChange={handleInputChange}
            maxLength={targetWord.length}
            placeholder="Enter your guess"
          />
          <button onClick={handleGuess} className="main__button">Guess</button>
        </>
      )}
      {isGameOver && currentGuess !== targetWord && (
        <p>{`Game over! The word was: ${targetWord}`}</p>
      )}
    </div>
  );
};

export default App;
