import "./App.css";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import VNSocialInsurance from "./VNSocialInsurance";

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
  const [baoHiemFromComponent, setBaoHiemFromComponent] = useState({
    BHYT: 0,
    BHTN: 0,
    BHXH: 0,
  });

  // setBaoHiemFromComponent(
  //   {
  //     BHYT: 10,
  //     BHTN: 10,
  //     BHXH: 100,
  //   }
  // )

  const handleClick = (event) => {
    const gtgc = 11000000;
    var nguoiPhuThuoc = 4400000 * soluongNPT;

    var BHYT = baoHiemFromComponent.BHYT;
    var BHTN = baoHiemFromComponent.BHTN;
    var BHXH = baoHiemFromComponent.BHXH;

    var tienbaohiem = BHYT + BHTN + BHXH;
    var TNTT = grossSalary - tienbaohiem;
    var TNCT = grossSalary - tienbaohiem - gtgc - nguoiPhuThuoc;
    var tienThue = thueTNCN(TNCT);

    setResult((TNTT - tienThue).toLocaleString("en-US"));
    setTienbaohiem(tienbaohiem.toLocaleString("en-US"));
    setTax(tienThue.toLocaleString("en-US"));
    setSoluongNPT(soluongNPT);
  };

  return (
    <div className="App">
      <h1>Simple Calculator Salary</h1>

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
          label="Number of dependants"
          variant="standard"
          thousandSeparator
          customInput={TextField}
          value={soluongNPT}
          onChange={(e) => setSoluongNPT(e.target.value)}
        />
      </div>

      <br />

      <VNSocialInsurance
        grossSalaryInput={grossSalary}
        sendDataToParent={setBaoHiemFromComponent}
      />

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
