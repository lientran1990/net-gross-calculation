import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { width } from "@mui/system";

function App() {
  // const inputRef = useRef(null);
  // const resultRef = useRef(null);
  // const [result, setResult] = useState(0);

  const handleClick = (event) => {};

  return (
    <div className="App">
      <h>Simple Calculator Salary</h>
      <p>Apply from 01/07/2023 (Latest) </p>
      <TextField
        style={{ margin: 1 + "rem" }}
        id="standard-basic"
        type="number"
        label="Income"
        variant="standard"
      />

      <br />
      <TextField
        style={{ margin: 1 + "rem" }}
        id="standard-basic"
        label="Number of dependents"
        variant="standard"
      />
      <div>
        <Button variant="contained" onClick={handleClick}>
          Gross to Net
        </Button>
      </div>
    </div>
  );
}

export default App;
