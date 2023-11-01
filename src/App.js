import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { width } from "@mui/system";
import { useState } from "react";

function luongdongbaohiem(grossSalary) {
  var luongcoso = 1800000;
  var luongtoithieuvung = 4680000;
  const gtgc = 11000000;
  if (grossSalary >= luongtoithieuvung && grossSalary <= 20 * luongcoso) {
    return grossSalary;
  } else if (grossSalary < luongtoithieuvung) {
    return luongtoithieuvung;
  } else {
    return luongcoso * 20;
  }
}

function App() {
  const [grossSalary, setGrossSalary] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (event) => {
    var tienbaohiem = (luongdongbaohiem(grossSalary) * 10.5) / 100;

    setResult(grossSalary - tienbaohiem);
  };

  return (
    <div className="App">
      <h>Simple Calculator Salary</h>
      <p>Apply from 01/07/2023 (Latest) </p>
      <TextField
        style={{ margin: 1 + "rem" }}
        id="gross-salary"
        value={grossSalary}
        onChange={(e) => setGrossSalary(e.target.value)}
        type="number"
        label="Gross Salary"
        variant="standard"
      />
      <br />
      <TextField
        style={{ margin: 1 + "rem" }}
        id="standard-basic"
        label="Number of dependents"
        variant="standard"
      />
      <br />
      <Button variant="contained" onClick={handleClick}>
        Gross to Net
      </Button>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;
