// DOM Elements
const metricRadio = document.getElementById("metric");
const imperialRadio = document.getElementById("imperial");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const heightUnit = document.getElementById("height-unit");
const weightUnit = document.getElementById("weight-unit");
const resultContainer = document.getElementById("result-container");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");
const idealWeightRange = document.getElementById("ideal-weight-range");

// Add event listeners
metricRadio.addEventListener("change", updateUnits);
imperialRadio.addEventListener("change", updateUnits);
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

// Initialize with some default values
heightInput.value = "180";
weightInput.value = "70";
calculateBMI();

// Function to update units based on selection
function updateUnits() {
  if (metricRadio.checked) {
    heightUnit.textContent = "cm";
    weightUnit.textContent = "kg";

    // Convert from imperial to metric if values exist
    if (heightInput.value && imperialRadio.checked) {
      // Convert inches to cm
      heightInput.value = Math.round(heightInput.value * 2.54);
    }

    if (weightInput.value && imperialRadio.checked) {
      // Convert pounds to kg
      weightInput.value = Math.round(weightInput.value / 2.205);
    }
  } else {
    heightUnit.textContent = "in";
    weightUnit.textContent = "lb";

    // Convert from metric to imperial if values exist
    if (heightInput.value && metricRadio.checked) {
      // Convert cm to inches
      heightInput.value = Math.round(heightInput.value / 2.54);
    }

    if (weightInput.value && metricRadio.checked) {
      // Convert kg to pounds
      weightInput.value = Math.round(weightInput.value * 2.205);
    }
  }

  calculateBMI();
}

// Function to calculate BMI
function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (height <= 0 || weight <= 0 || isNaN(height) || isNaN(weight)) {
    resultContainer.classList.remove("visible");
    return;
  }

  let bmi;
  let idealLowWeight, idealHighWeight;

  if (metricRadio.checked) {
    // Metric formula: weight (kg) / (height (m))²
    bmi = weight / Math.pow(height / 100, 2);

    // Calculate ideal weight range (BMI between 18.5 and 24.9)
    idealLowWeight = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
    idealHighWeight = (24.9 * Math.pow(height / 100, 2)).toFixed(1);
    idealWeightRange.textContent = `${idealLowWeight}kg - ${idealHighWeight}kg`;
  } else {
    // Imperial formula: (weight (lb) / (height (in))²) × 703
    bmi = (weight / Math.pow(height, 2)) * 703;

    // Calculate ideal weight range (BMI between 18.5 and 24.9)
    idealLowWeight = ((18.5 * Math.pow(height, 2)) / 703).toFixed(1);
    idealHighWeight = ((24.9 * Math.pow(height, 2)) / 703).toFixed(1);
    idealWeightRange.textContent = `${idealLowWeight}lb - ${idealHighWeight}lb`;
  }

  // Round BMI to 1 decimal place
  bmi = bmi.toFixed(1);

  // Set BMI value
  bmiValue.textContent = bmi;

  // Set BMI category
  if (bmi < 18.5) {
    bmiCategory.textContent = "underweight";
    resultContainer.style.background =
      "linear-gradient(to right, #3498db, #9b59b6)";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory.textContent = "healthy weight";
    resultContainer.style.background =
      "linear-gradient(to right, #2ecc71, #3498db)";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory.textContent = "overweight";
    resultContainer.style.background =
      "linear-gradient(to right, #f39c12, #e74c3c)";
  } else {
    bmiCategory.textContent = "obese";
    resultContainer.style.background =
      "linear-gradient(to right, #e74c3c, #c0392b)";
  }

  // Show result
  resultContainer.classList.add("visible");
}
