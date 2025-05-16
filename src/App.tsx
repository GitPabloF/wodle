import React,{ useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import "./App.scss";
import loader from './assets/loader.svg'
import Row from "./components/Row/Row"

type Data = {
  artist: string
}

const App = () => {
  const { width, height } = useWindowSize()
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const maxAttempts = 6;
  const emptyRows = [];

  const [error, setError] = useState(false)
  const [artist, setArtist] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const targetWord: string | null = artist ? artist.toLocaleUpperCase() : null;
  const gamePlayable = !!targetWord && !error && !isGameOver && !isGameWon;


  const fetchArtist = async() => {
    try{
      const response = await fetch(`${apiUrl}/randomArtist`)
      if(!response.ok) throw new Error()
      const data:Data = await response.json()
      setArtist(data.artist)
      setIsLoading(false)
    } catch {
      setError(true)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.toUpperCase()
    setInputValue(value);
    setCurrentGuess(value)
  };

  const handleGuess = () => {
    if(!gamePlayable) return 
    setInputValue('')
    const updatedGuesses:string[] = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if(currentGuess === targetWord ) setIsGameWon(true);
   
    if (updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }
  };

  for (let i = 0; i < 6 - guesses.length; i++) {
    if(!targetWord) continue
    emptyRows.push(<Row key={i}  targetWord={targetWord} />);
  }

  useEffect(() =>{
    fetchArtist()
  }, [])

  return (
    <div className="main">
      {targetWord && ( 
      <>
        <h1 className='main__title'>WODLE - {isGameOver} - {isGameWon}</h1>
        <p className='main__description'>Guess the artist or band 🎵</p>
        <p className='main__subtitle'>Type as many letters as you want </p>
        <div className='main__rows-wrapper'>
        {guesses.map((guess, index) => (
          <Row key={index} guess={guess} targetWord={targetWord} />
        ))}
        {emptyRows}
        </div>
        {gamePlayable && (
          <>
            <input
              className="main__input"
              onChange={handleInputChange}
              value={inputValue}
              maxLength={targetWord.length}
              placeholder="Enter your guess"
            />
            <button onClick={handleGuess} className="main__button">Guess</button>
          </>
        )}
        {/* winning message */}
        {isGameWon && (
          <>
          <Confetti
            width={width}
            height={height}
          />
          <p>Well played! 🤘 You guessed it!</p>
          </>
        )}
        {/* GAME OVER MESSAGE */}
        {isGameOver && !isGameWon && (
          <p>{`Game over 🫣 The word was: ${artist}`}</p>
        )}
      </>)}
      {/*Loading*/}
      {isLoading && !error && (<img src={loader} alt="loader" />)}
      {/* ERROR */}
      {error &&( <p>We are sorry, an error has occurred. It's not possible to play now 😔.</p>)}
    </div>
  );
};

export default App;
