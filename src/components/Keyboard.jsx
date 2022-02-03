import React from "react";

const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const Submit = ({ handleSubmit }) => {
  return (
    <div
      className="h-7 w-10 mx-1 bg-blue-500 hover:scale-105 rounded-sm text-white m-[0.1rem] lg:m-1 shrink flex items-center justify-center md:h-12 md:w-20 cursor-pointer hover:bg-blue-600"
      onClick={handleSubmit}
    >
      <img src="check.png" className="object-contain h-5 w-5" />
    </div>
  );
};

const Delete = ({ backspace }) => {
  return (
    <div
      className="h-7 w-10 mx-1 bg-red-500 hover:scale-105 rounded-sm text-white m-[0.1rem] lg:m-1 shrink flex items-center justify-center md:h-12 md:w-20 cursor-pointer hover:bg-red-600"
      onClick={backspace}
    >
      <img src="back.png" className="object-contain h-6 w-6 mr-1" />
    </div>
  );
};

const KeyboardKey = ({ keyValue, addLetter }) => {
  return (
    <div
      className="h-8 w-8 bg-[#222] hover:scale-105 rounded-sm text-white m-[0.1rem] lg:m-1 flex items-center justify-center md:h-[3.25rem] md:w-[3.25rem] cursor-pointer border-[1px] border-[#222222ee] hover:border-neutral-700"
      id={keyValue}
      onClick={() => {
        addLetter(keyValue);
      }}
    >
      <span className="text-lg md:text-xl">{keyValue.toUpperCase()}</span>
    </div>
  );
};

const Keyboard = ({ handleSubmit, backspace, addLetter }) => {
  return (
    <div className="flex flex-col justify-center items-center sm:p-7">
      {keys.map((keyRow) => (
        <div
          key={keyRow}
          className="flex flex-row w-full flex-nowrap justify-center items-center"
        >
          {keyRow.startsWith("zxcv") && <Submit handleSubmit={handleSubmit} />}
          {[...keyRow].map((keyValue, i) => (
            <KeyboardKey
              key={i + keyValue}
              keyValue={keyValue}
              addLetter={addLetter}
            />
          ))}
          {keyRow.startsWith("zxcv") && <Delete backspace={backspace} />}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
