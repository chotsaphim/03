let salaryInput;
let periodDropdown;
let calculateButton;
let resultDiv;

function setup() {
  noCanvas();

  let container = createDiv();
  container.style('max-width', '300px');
  container.style('margin', '20px auto');
  container.style('padding', '20px');
  container.style('border-radius', '10px');
  container.style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.1)');
  container.style('background-color', 'white');

  let header = createElement('h2', 'เครื่องคิดเลขเงินเดือน');
  header.style('font-family', 'Arial, sans-serif');
  header.style('text-align', 'center');
  header.style('color', '#333');
  header.style('margin-bottom', '20px');
  container.child(header);

  let inputDiv = createDiv();
  inputDiv.style('display', 'flex');
  inputDiv.style('flex-direction', 'column');
  inputDiv.style('margin-bottom', '20px');
  container.child(inputDiv);

  let salaryLabel = createElement('label', 'ป้อนเงินเดือนของคุณ:');
  salaryLabel.style('margin-bottom', '5px');
  inputDiv.child(salaryLabel);

  salaryInput = createInput('');
  salaryInput.style('padding', '10px');
  salaryInput.style('border-radius', '5px');
  salaryInput.style('border', '1px solid #ccc');
  salaryInput.style('margin-bottom', '20px');
  inputDiv.child(salaryInput);

  let periodLabel = createElement('label', 'เลือกระยะเวลา:');
  periodLabel.style('margin-bottom', '5px');
  inputDiv.child(periodLabel);

  periodDropdown = createSelect();
  periodDropdown.option('รายวัน');
  periodDropdown.option('รายสัปดาห์');
  periodDropdown.option('รายเดือน');
  periodDropdown.option('รายปี');
  periodDropdown.style('padding', '10px');
  periodDropdown.style('border-radius', '5px');
  periodDropdown.style('border', '1px solid #ccc');
  periodDropdown.style('margin-bottom', '20px');
  inputDiv.child(periodDropdown);

  calculateButton = createButton('คำนวณ');
  calculateButton.style('padding', '10px');
  calculateButton.style('width', '100%');
  calculateButton.style('border', 'none');
  calculateButton.style('border-radius', '5px');
  calculateButton.style('background-color', '#4CAF50');
  calculateButton.style('color', 'white');
  calculateButton.style('cursor', 'pointer');
  calculateButton.style('font-size', '16px');
  calculateButton.mousePressed(calculateSalaries);
  container.child(calculateButton);

  resultDiv = createDiv('');
  resultDiv.style('padding', '10px');
  resultDiv.style('border-radius', '5px');
  resultDiv.style('background-color', '#f9f9f9');
  resultDiv.style('margin-top', '20px');
  resultDiv.style('text-align', 'center');
  container.child(resultDiv);

  calculateButton.mouseOver(() => {
    calculateButton.style('background-color', '#45a047');
  });

  calculateButton.mouseOut(() => {
    calculateButton.style('background-color', '#4CAF50');
  });
}

function calculateSalaries() {
  let salary = parseFloat(salaryInput.value());
  let period = periodDropdown.value();

  if (!isNaN(salary) && salary > 0) {
    let dailySalary, weeklySalary, monthlySalary, yearlySalary;

    if (period === 'รายวัน') {
      dailySalary = salary;
      weeklySalary = dailySalary * 7;
      monthlySalary = weeklySalary * 4;
      yearlySalary = monthlySalary * 12;
    } else if (period === 'รายสัปดาห์') {
      weeklySalary = salary;
      dailySalary = weeklySalary / 7;
      monthlySalary = weeklySalary * 4;
      yearlySalary = monthlySalary * 12;
    } else if (period === 'รายเดือน') {
      monthlySalary = salary;
      weeklySalary = monthlySalary / 4;
      dailySalary = weeklySalary / 7;
      yearlySalary = monthlySalary * 12;
    } else {
      yearlySalary = salary;
      monthlySalary = yearlySalary / 12;
      weeklySalary = monthlySalary / 4;
      dailySalary = weeklySalary / 7;
    }

    resultDiv.html(`
      <p>เงินเดือนรายวัน: ฿${dailySalary.toFixed(2)}</p>
      <p>เงินเดือนรายสัปดาห์: ฿${weeklySalary.toFixed(2)}</p>
      <p>เงินเดือนรายเดือน: ฿${monthlySalary.toFixed(2)}</p>
      <p>เงินเดือนรายปี: ฿${yearlySalary.toFixed(2)}</p>
    `);
  } else {
    resultDiv.html('<p style="color: red;">ข้อมูลไม่ถูกต้อง โปรดป้อนหมายเลขที่ถูกต้อง</p>');
  }
}
