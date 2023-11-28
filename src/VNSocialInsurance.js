import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

function luongdongbaohiem(grossSalary, checked, inputUserEnter) {
  var luongcoso = 1800000;
  var luongtoithieuvung = 4680000;

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

export default function VNSocialInsurance({
  grossSalaryInput,
  sendDataToParent,
}) {
  const [tienbaohiem, setTienbaohiem] = useState("");
  const [inputUserEnter, setInputUserEnter] = useState("");
  const [checked, setChecked] = useState(false);
  const [otherInfo, setOtherInfo] = useState("");

  const onDataChanged = (checked, inputUserEnter) => {
    var luongDongBaoHiem = luongdongbaohiem(
      grossSalaryInput,
      checked,
      inputUserEnter
    );

    var bhyt = (luongDongBaoHiem * 1.5) / 100;
    var bhxh = (luongDongBaoHiem * 8) / 100;
    var bhtn = 0;
    if (checked) bhtn = inputUserEnter / 100;
    else bhtn = grossSalaryInput / 100;

    sendDataToParent({
      BHYT: bhyt,
      BHTN: bhtn,
      BHXH: bhxh,
    });
  };

  // onDataChanged();

  return (
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
          control={
            <Radio
              checked={!checked} // da chon luong khac
              onClick={() => {
                onDataChanged(!checked, inputUserEnter);
                setChecked(!checked);
              }}
            />
          }
          label="Gross Salary"
        />
        <FormControlLabel
          control={
            <Radio
              checked={checked}
              onClick={() => {
                onDataChanged(!checked, inputUserEnter);
                setChecked(!checked);
              }}
            />
          }
          label="Other"
          value="other"
        />

        <NumericFormat
          style={{ margin: 1 + "rem" }}
          variant="standard"
          customInput={TextField}
          disabled={!checked}
          thousandSeparator
          onChange={(e) => {
            onDataChanged(checked, e.target.value.replaceAll(",", ""));
            setInputUserEnter(e.target.value.replaceAll(",", ""));
          }}
          onKeyDown={(e) => setOtherInfo(e.target.value)}
        />
      </RadioGroup>
    </FormControl>
  );
}
