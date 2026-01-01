import { showMessage } from "./formUtil.js";

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const { validity, id, value } = target;

  // Enable/disable postal code based on country selection
  if (id == "country") {
    const pCode = document.getElementById("p-code");
    if (pCode) {
      pCode.disabled = !value;
    }
  }
  
  // Determine error message
  let errorMessage = "";
  switch (true) {
    case validity.valueMissing:
      errorMessage = "This field is required.";
      break;
    case validity.patternMismatch:
      errorMessage = "Invalid format.";
      break;
  }

  showMessage(target, errorMessage);
}

// Attach listeners to fields
function addFieldListeners(fields) {
  fields.forEach(({id, element}) => {
    const eventType = (id === "country") ? "change" : "input";
    element.addEventListener(eventType, validateField);
  });
}

export { validateField, addFieldListeners };