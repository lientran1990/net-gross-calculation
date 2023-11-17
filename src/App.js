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

function luongdongbaohiem(grossSalary, checked, inputUserEnter) {
  var luongcoso = 1800000;
  var luongtoithieuvung = 4680000;

  // radio gruop ==> selected value == "other"
  if (checked == true) {
    return inputUserEnter;
  }

  if (grossSalary >= luongtoithieuvung && grossSalary <= 20 * luongcoso) {
    return grossSalary;
  } else if (grossSalary < luongtoithieuvung) {
    return 0;
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
  const [tienbaohiem, setTienbaohiem] = useState("");
  const [soluongNPT, setSoluongNPT] = useState("");
  const [inputUserEnter, setInputUserEnter] = useState("");
  const [checked, setChecked] = useState(false);
  const [otherInfo, setOtherInfo] = useState("");

  const handleClick = (event) => {
    const gtgc = 11000000;
    var nguoiPhuThuoc = 4400000 * soluongNPT;
    var tienbaohiemXHYT =
      (luongdongbaohiem(grossSalary, checked, inputUserEnter) * 9.5) / 100;

    var tienbaohiemTN = 0;
    if (checked == true) {
      tienbaohiemTN = inputUserEnter / 100;
    } else {
      tienbaohiemTN = grossSalary / 100;
    }

    var tienbaohiem = tienbaohiemTN + tienbaohiemXHYT;
    var TNTT = grossSalary - tienbaohiem;
    var TNCT = grossSalary - tienbaohiem - gtgc - nguoiPhuThuoc;
    var tienThue = thueTNCN(TNCT);

    setResult((TNTT - tienThue).toLocaleString("en-US"));
    setTienbaohiem(tienbaohiem.toLocaleString("en-US"));
    setTax(tienThue.toLocaleString("en-US"));
    setSoluongNPT(soluongNPT);
    setInputUserEnter(inputUserEnter);
  };

  return (
    <div className="App">
      <h1>Simple Calculator Salary</h1>
      {/* <h2>Apply from 01/07/2023 (Latest) </h2> */}
      <div>
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

        <NumericFormat
          style={{ margin: 1 + "rem" }}
          id="standard-basic"
          label="Number of dependents"
          variant="standard"
          thousandSeparator
          customInput={TextField}
          value={soluongNPT}
          onChange={(e) => setSoluongNPT(e.target.value)}
        />
      </div>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Insurance salary:
        </FormLabel>
        <br />
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="luongChinhThuc"
            control={
              <Radio
                checked={!checked} // da chon luong khac
                onClick={() => setChecked(!checked)}
              />
            }
            label="Gross Salary"
          />
          <FormControlLabel
            control={
              <Radio checked={checked} onClick={() => setChecked(!checked)} />
            }
            label="Other"
            value="other"
          />

          <NumericFormat
            disabled={!checked}
            thousandSeparator
            onChange={(e) =>
              setInputUserEnter(e.target.value.replaceAll(",", ""))
            }
            onKeyDown={(e) => setOtherInfo(e.target.value)}
          />
        </RadioGroup>
      </FormControl>

      <br />
      <Button variant="contained" onClick={handleClick}>
        Gross to Net
      </Button>
      <p>NET:{result}</p>
      <p></p>
      <p>Personal income tax (PIT) : {tax} </p>
      <p>Tiền bảo hiểm : {tienbaohiem}</p>
      <p>So luong NPT: {soluongNPT}</p>
    </div>
  );
}

export default App;
