const GridRow = ({ word, rowNum }) => {
  const letters = [];
  let i = 0;
  for (i = 0; i < word.length; i++) {
    letters.push(word[i]);
  }
  while (i < 5) {
    letters.push(" ");
    ++i;
  }
  return (
    <div id={"Row" + rowNum} className="flex justify-between">
      {letters.map((letter, i) => (
        <div
          key={i}
          id={rowNum + " " + i}
          className="h-12 w-12 md:h-[4.5rem] md:w-[4.5rem] border-4 border-neutral-800 m-1 flex items-center justify-center"
        >
          <span className="text-2xl md:text-4xl font-medium md:font-semibold">
            {letter.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

//6x5 Grid
const Grid = ({ grid }) => {
  return (
    <div className="flex text-[#ffffffee] justify-center items-center py-7">
      <div className="flex flex-col items-center">
        {grid.map((word, i) => (
          <GridRow key={i} word={word} rowNum={i} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
