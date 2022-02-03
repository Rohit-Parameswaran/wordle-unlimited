const addTileClasses = async (word, userWord, curWord) => {
  let targetLetters = [...word];
  for (let i = 0; i < userWord.length; i++) {
    const reqTile = document.getElementById(`${curWord} ${i}`);
    const reqTile2 = document.getElementById(`${userWord[i].toLowerCase()}`);
    if (userWord[i] === word[i]) {
      reqTile.classList.remove("border-4");
      reqTile.classList.add("bg-green-800", "flip-2-hor-top-1");
      reqTile2.classList.remove("bg-yellow-600");
      reqTile2.classList.remove("bg-[#222]");
      reqTile2.classList.add("bg-green-800", "flip-2-hor-top-1");
      targetLetters[i] = "";
    } else if (!word.includes(userWord[i])) {
      reqTile.classList.remove("border-4");
      reqTile.classList.add("bg-[#222]", "flip-2-hor-top-1");
      reqTile2.classList.remove("bg-[#222]", "border-[1px]");
      reqTile2.classList.add("bg-black", "text-[#555]", "flip-2-hor-top-1");
    }
  }
  for (let i = 0; i < userWord.length; i++) {
    const reqTile = document.getElementById(`${curWord} ${i}`);
    const reqTile2 = document.getElementById(`${userWord[i].toLowerCase()}`);
    const tindex = targetLetters.indexOf(userWord[i]);
    if (tindex !== -1) {
      reqTile.classList.remove("border-4");
      reqTile.classList.add("bg-yellow-600", "flip-2-hor-top-1");
      reqTile2.classList.remove("bg-[#222]");
      if (reqTile2.classList.contains("bg-green-800") === false)
        reqTile2.classList.add("bg-yellow-600", "flip-2-hor-top-1");
      targetLetters[tindex] = "";
    } else if (word[i] !== userWord[i]) {
      reqTile.classList.remove("border-4");
      reqTile.classList.add("bg-[#222]", "flip-2-hor-top-1");
      reqTile2.classList.remove("bg-[#222]", "border-[1px]");
      reqTile2.classList.add("bg-black", "text-[#555]", "hover:border-gray-400", "flip-2-hor-top-1");
    }
  }
};

export default addTileClasses;
