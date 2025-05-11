import "./Row.scss";

type RowProps = {
  guess?: string,
  targetWord: string
}

const Row = ({ guess, targetWord }: RowProps) => {
  if (!targetWord) return null;

  const targetArray = targetWord.split("");
  const guessArray = guess ? guess.split("") : [];

  const getLetterStatus = (index: number) => {
    const letter = targetArray[index];
    const guessedLetter = guessArray[index];

    if (letter === ' ') return "space";
    if (!guessedLetter) return "absent";

    if (guessedLetter === letter) return "correct";
    if (targetArray.includes(guessedLetter)) return "present";
    return "absent";
  };

  return (
    <div className="word-row">
      {targetArray.map((letter, index) => (
        <span
          className={`word-row__letter ${getLetterStatus(index)}`}
          key={index}
        >
          {letter === ' ' ? ' ' : (guessArray[index] || '')}
        </span>
      ))}
    </div>
  );
};

export default Row;
