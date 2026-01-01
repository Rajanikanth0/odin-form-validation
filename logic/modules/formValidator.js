import { showMessage, getErrorMessage } from "./formUtil.js";

// Handle postal code enable/disable
function handleCountryField(value) {
  const pCode = document.getElementById("p-code");
  if (pCode) {
    pCode.disabled = !value;
  }
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const { validity, id, value } = target;

  if (id === "country") {
    handleCountryField(value);
  }
  
  const errorMessage = getErrorMessage(validity);
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