import React,{ useState, useEffect } from 'react'
import "./App.scss";
import loader from './assets/loader.svg'
import Row from "./components/Row/Row"

type Data = {
  artist: string
}

const App = () => {
  const maxAttempts = 6;
  const [error, setError] = useState<boolean>(false)
  const [artist, setArtist] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const targetWord: string | null = artist ? artist.toLocaleUpperCase() : null;

  const gamePlayable = !targetWord || error

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  const fetchArtist = async() => {
    try{
      const response = await fetch(`${apiUrl}/randomArtist`)
      if(!response.ok) throw new Error()
      const data:Data = await response.json()
      setArtist(data.artist)
      setIsLoading(false)
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if(gamePlayable) return 
    const updatedGuesses:string[] = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if (currentGuess === targetWord || updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }
  };

  const empltyRows = [];
  for (let i = 0; i < 6 - guesses.length; i++) {
    if(!targetWord) continue
    empltyRows.push(<Row key={i}  targetWord={targetWord} />);
  }

  useEffect(() =>{
    fetchArtist()
  }, [])

  return (
    <div className="main">
      { gamePlayable || targetWord && ( 
      <>
        <h1 className='main__title'>WODLE</h1>
        <p className='main__description'>Guess the artist or band 🎵</p>
        <p className='main__subtitle'>Type as many letters as you want </p>
        <div className='main__rows-wrapper'>
        {guesses.map((guess, index) => (
          <Row key={index} guess={guess} targetWord={targetWord} />
        ))}
        {empltyRows}
        </div>
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
        {/* GAME OVER MESSAGE */}
        {isGameOver && currentGuess !== targetWord && (
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
