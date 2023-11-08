import "./App.css";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { blue } from "@mui/material/colors";

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
  if (TNCT > 0 && TNCT <= 5000000) {
    return TNCT * 0.05;
  } else if (TNCT > 5000000 && TNCT <= 10000000) {
    return 250000 + (TNCT - 5000000) * 0.1;
  } else if (TNCT > 10000000 && TNCT <= 18000000) {
    return 750000 + (TNCT - 10000000) * 0.15;
  } else if (TNCT > 18000000 && TNCT <= 32000000) {
    return 1950000 + (TNCT - 18000000) * 0.2;
  } else if (TNCT > 32000000 && TNCT <= 52000000) {
    return 4750000 + (TNCT - 32000000) * 0.25;
  } else if (TNCT > 52000000 && TNCT <= 80000000) {
    return 9750000 + (TNCT - 52000000) * 0.3;
  } else if (TNCT > 80000000) {
    return 18150000 + (TNCT - 80000000) * 0.35;
  } else {
    return 0;
  }
}

function App() {
  const [grossSalary, setGrossSalary] = useState("");
  const [result, setResult] = useState("");
  const [tax, setTax] = useState("");

  const handleClick = (event) => {
    const gtgc = 11000000;
    var tienbaohiemXHYT = (luongdongbaohiem(grossSalary) * 9.5) / 100;
    var tienbaohiemTN = grossSalary / 100;
    var tienbaohiem = tienbaohiemTN + tienbaohiemXHYT;
    var TNTT = grossSalary - tienbaohiem;
    var TNCT = grossSalary - tienbaohiem - gtgc;
    var tienThue = thueTNCN(TNCT);

    // const formatter = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "VND",
    //   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    // });

    setResult((TNTT - tienThue).toLocaleString("en-US"));
    setTax(tienThue.toLocaleString("en-US"));
  };

  return (
    <div className="App" style={{ backgroundColor: "graylight" }}>
      <h>Simple Calculator Salary</h>
      <p>Apply from 01/07/2023 (Latest) </p>
      <NumericFormat
        displayType="input"
        style={{ margin: 1 + "rem" }}
        thousandSeparator
        id="gross-salary"
        value={grossSalary}
        onChange={(e) => setGrossSalary(e.target.value.replaceAll(",", ""))}
        // type="text"
        label="Gross Salary"
        variant="standard"
        customInput={TextField}
      />
      <br />
      <NumericFormat
        style={{ margin: 1 + "rem" }}
        id="standard-basic"
        label="Number of dependents"
        variant="standard"
        thousandSeparator
        customInput={TextField}
      />
      <br />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Insurance salary:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="luongChinhThuc"
            control={<Radio />}
            label="Gross Salary"
          />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <NumericFormat
            thousandSeparator
            customInput={TextField}
            variant="standard"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <Button variant="contained" onClick={handleClick}>
        Gross to Net
      </Button>
      <p>NET: {result} </p>
      <p></p>
      <p>Personal income tax (PIT) : {tax} </p>
    </div>
  );
}

export default App;
