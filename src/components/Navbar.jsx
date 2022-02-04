import React, { useState } from "react";
import { useCookies } from "react-cookie";
import handleNewGame from "../utils/handleNewGame";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["wins", "total"]);

  const winPercent = `${(
    ((isNaN(cookies.wins) ? 0 : cookies.wins) * 100.0) /
    cookies.total
  ).toFixed(1)}`;
  return (
    <div className="flex justify-evenly items-center py-2 wrap border-b-2 border-neutral-800">
      <div className="hidden sm:block py-1 px-3 rounded-sm bg-green-800 text-center text-lg text-[#ddd] select-none hover:scale-105">
        WINS{" "}
        <div className="inline w-full border-[1px] border-green-900 mx-2"></div>{" "}
        {isNaN(winPercent) ? "-" : winPercent + "%"}
      </div>
      <div className="flex items-center justify-center text-center font-bold tracking-[0.2rem] md:tracking-[0.25rem] text-3xl md:text-4xl text-[#ddd] w-1/2 select-none">
        {[..."WORDLE"].map(item => (<div key={item} className={`${Math.random() < 0.5 ? "hover:bg-green-800" : "hover:bg-yellow-600"} hover:scale-125 md:hover:w-10 md:hover:h-10 flex text-center justify-center items-center`}><div className="text-center">{item}</div></div>))}
      </div>
      <div
        className="text-center text-md md:text-lg border-2 py-1 px-2 md:px-5 border-green-800 text-[#ddd] hover:bg-green-800 hover:scale-105 select-none cursor-pointer"
        onClick={handleNewGame}
      >
        NEW WORDLE
      </div>
    </div>
  );
};

export default Navbar;
