import { solutions } from "../data/solutions";

const getWord = () => {
  const n = solutions.length;
  let newWord = "steak";
  const index = Math.floor(Math.random() * (n + 1));
  newWord = solutions[index];
  localStorage.setItem("answer", newWord);
  return newWord;
};

export default getWord;
