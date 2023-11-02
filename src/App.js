import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { width } from "@mui/system";
import { useState } from "react";

function luongdongbaohiem(grossSalary) {
  var luongcoso = 1800000;
  var luongtoithieuvung = 4680000;

  if (grossSalary >= luongtoithieuvung && grossSalary <= 20 * luongcoso) {
    return grossSalary;
  } else if (grossSalary < luongtoithieuvung) {
    return luongtoithieuvung;
  } else {
    return luongcoso * 20;
  }
}

function thueTNCN(TNCT) {
  if (TNCT <= 5000000) {
    return TNCT * 0.05;
  } else if (TNCT > 5000000 && TNCT <= 10000000) {
    return 250000 + (TNCT - 5000000) * 0.1;
  } else if (TNCT > 10000000 && TNCT <= 18000000) {
    return 750000 + (TNCT - 10000000) * 0.15;
  } else if (TNCT > 18000000 && TNCT <= 32000000) {
    return 1950000 + (TNCT - 18000000) * 0.2;
  } else if (TNCT > 32000000 && TNCT <= 52000000) {
    return 4750000 + (TNCT - 32000000) * 0.25;
  } else if (TNCT < 52000000 && TNCT <= 80000000) {
    return 9750000 + (TNCT - 52000000) * 0.3;
  } else {
    return 18150000 + (TNCT - 80000000) * 0.35;
  }
}

function App() {
  const [grossSalary, setGrossSalary] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (event) => {
    const gtgc = 11000000;
    var tienbaohiemXHYT = (luongdongbaohiem(grossSalary) * 9.5) / 100;
    var tienbaohiemTN = grossSalary / 100;
    var tienbaohiem = tienbaohiemTN + tienbaohiemXHYT;
    var TNTT = grossSalary - tienbaohiem;

    var TNCT = grossSalary - tienbaohiem - gtgc;
    var tienThue = thueTNCN(TNCT);

    setResult(TNTT - tienThue);
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
      <p>Thu nhap sau thue: {result}</p>
      <p>Tien thue TNCN phai dong: </p>
    </div>
  );
}

export default App;
