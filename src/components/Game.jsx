import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "./Grid";
import Keyboard from "./Keyboard";
import addTileClasses from "../utils/addTileClasses";
import getWord from "../utils/getWord";
import { validGuesses } from "../data/validGuesses";
import { solutions } from "../data/solutions";

const Game = () => {
  const [answer, setAnswer] = useState(localStorage.getItem("answer"));
  answer === null && setAnswer(getWord());

  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem("grid")));
  grid === null && setGrid(["", "", "", "", "", ""]);
  const [curWord, setCurWord] = useState(
    JSON.parse(localStorage.getItem("curWord"))
  );
  curWord === null && setCurWord(0);

  const [cookies, setCookie] = useCookies(["wins", "total", "gameOver"]);

  const _setGrid = (newGrid) => {
    setGrid(newGrid);
    localStorage.setItem("grid", JSON.stringify(newGrid));
  };

  const handlePuzzleComplete = (winBool) => {
    setCookie("gameOver", winBool ? 1 : -1, { path: "/" });
    addTileClasses(answer, grid[curWord], curWord);
    const w = isNaN(cookies.wins) ? 0 : parseInt(cookies.wins);
    const t = isNaN(cookies.total) ? 0 : parseInt(cookies.total);
    if (winBool) setCookie("wins", w + 1, { path: "/" });
    setCookie("total", t + 1, { path: "/" });
    if (winBool)
      toast.success("Amazing!", {
        theme: "dark",
        closeButton: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    else
      toast.error(`Hard Luck. The word was ${answer.toUpperCase()}`, {
        theme: "dark",
        closeButton: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    localStorage.setItem("curWord", 6);
    setCurWord(6);
  };

  const handleSubmit = () => {
    if (grid[curWord] === answer) handlePuzzleComplete(true);
    else if (grid[curWord].length !== 5) wrongWordHandler(0);
    else if (curWord === 5) handlePuzzleComplete(false);
    else if (
      solutions.includes(grid[curWord]) ||
      validGuesses.includes(grid[curWord])
    ) {
      const userWord = grid[curWord];
      addTileClasses(answer, userWord, curWord);
      localStorage.setItem("curWord", JSON.stringify(curWord + 1));
      setCurWord(curWord + 1);
    } else wrongWordHandler(1);
  };

  const backspace = () => {
    if (curWord <= 5 && grid[curWord]) {
      let newGrid = [...grid];
      newGrid[curWord] = newGrid[curWord].slice(0, grid[curWord].length - 1);
      _setGrid(newGrid);
    }
  };

  const addLetter = (l) => {
    if (curWord > 5 || grid[curWord].length === 5) return;
    let newGrid = [...grid];
    newGrid[curWord] = newGrid[curWord] + l;
    _setGrid(newGrid);
  };

  const wrongWordHandler = (msgFlag) => {
    const reqRow = document.getElementById(`Row${curWord}`);
    reqRow.classList.remove("vibrate-1");
    void reqRow.offsetWidth;
    reqRow.classList.add("vibrate-1");

    toast.error(msgFlag === 0 ? "Incomplete word" : "Word not in dictionary", {
      theme: "dark",
      closeButton: false,
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const keyDownHandle = (e) => {
    if (/[a-zA-Z]/.test(e.key) && e.key.length === 1) {
      addLetter(e.key.toLowerCase());
    } else if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Backspace") {
      backspace();
    }
  };

  const kdhRef = useRef(keyDownHandle);
  useEffect(() => {
    kdhRef.current = keyDownHandle;
  });

  useEffect(() => {
    const cb = (e) => kdhRef.current(e);
    document.addEventListener("keydown", cb);

    for (let i = 0; i < curWord; ++i) {
      addTileClasses(answer, grid[i], i);
    }

    return () => {
      document.removeEventListener("keydown", cb);
    };
  }, []);

  return (
    <div className="mx-4 flex flex-row flex-wrap justify-center lg:justify-evenly items-center select-none">
      <Grid grid={grid} />
      <Keyboard
        handleSubmit={handleSubmit}
        backspace={backspace}
        addLetter={addLetter}
      />
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        style={{ opacity: 0.99 }}
      />
    </div>
  );
};

export default Game;
