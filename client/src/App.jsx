import { Navbar, Game, Overlay } from "./components";
import "./App.css";

function App() {
  return (
    <div className="h-full">
      <Overlay />
      <Navbar />
      <Game />
    </div>
  );
}

export default App;
