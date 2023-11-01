import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";

function App() {
  // const inputRef = useRef(null);
  // const resultRef = useRef(null);
  // const [result, setResult] = useState(0);

  const handleClick = (event) => {};

  return (
    <div className="App">
      <h>Simple Calculator Salary</h>
      <p>Apply from 01/07/2023 (Latest) </p>
      <form>
        <label>
          Income:
          <input type="number" placeholder="USD" />
        </label>
      </form>

      <form>
        <label>Number of dependents: </label>
        <input type="number" placeholder="person" />
      </form>

      <div>
        <form>
          <button type="button" onClick={handleClick}>
            Gross to Net
          </button>
          {/* <p ref={resultRef}>Net: {result}</p> */}
        </form>
      </div>
    </div>
  );
}

export default App;
