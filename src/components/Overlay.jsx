import React from "react";
import { useCookies } from "react-cookie";

const Overlay = () => {
  const [cookies, setCookie] = useCookies(["total", "gameOver"]);
  const gameOverCheck =
    isNaN(cookies.gameOver) || parseInt(cookies.gameOver) === 0;
  const handleNewGame = () => {
    if (gameOverCheck) {
      const t = isNaN(cookies.total) ? 0 : parseInt(cookies.total);
      setCookie("total", t + 1, { path: "/" });
    }
    setCookie("gameOver", 0, { path: "/" });
    localStorage.removeItem("grid");
    localStorage.removeItem("curWord");
    localStorage.removeItem("answer");
    window.location.reload();
  };

  return (
    <div
      id="overlay"
      className="hidden bg-[#00000055] z-50 fixed top-0 right-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center"
    >
      <div className="bg-[#222] pb-4 px-10 min-w-[60%] lg:min-w-[30%] flex flex-col items-center justify-center text-white rounded-md">
        <div className="text-xl mt-5 mb-4 text-center">
          Are you sure?
          <div className="text-sm text-[#aaa] mt-2">
            <p>This will count as a loss in your statistics</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div
            className="p-2 w-1/4 bg-green-800 mx-3 text-center rounded-sm cursor-pointer hover:scale-110"
            onClick={handleNewGame}
          >
            YES
          </div>
          <div
            className="p-2 w-1/4 bg-red-700 mx-3 text-center rounded-sm cursor-pointer hover:scale-110"
            onClick={() => {
              document.getElementById("overlay").classList.add("hidden");
            }}
          >
            NO
          </div>
        </div>
        <p className="text-sm text-[#aaa] mt-4">(Finish the wordle to view answer)</p>
      </div>
    </div>
  );
};

export default Overlay;
