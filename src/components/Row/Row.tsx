import "./Row.scss";

type RowProps = {
  guess: string,
  targetWord: string
}

const Row = ({ guess, targetWord }:RowProps) => {
  const getLetterStatus = (letter: string, index: number) => {
    if (letter === targetWord[index]) {
      return "correct";
    } else if (targetWord.includes(letter)) {
      return "present";
    } else return "absent";
  }

  const guessArray = guess.split("");

  return (
    <div className="word-row">
      {guessArray.map((letter, index) => (
        <span
          className={`word-row__letter ${getLetterStatus(letter, index)}`}
          key={index}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Row;
