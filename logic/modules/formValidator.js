import { showMessage, validators } from "./formUtil.js";

const messengers = {
  "p-code": validators.postalCode,
  "email": validators.email,
  "password": validators.password
};

// Enable/disable postal code based on country
function togglePostalCodeField(isEnabled) {
  const postalCode = document.getElementById("p-code");
  if (postalCode) postalCode.disabled = !isEnabled;
}

function getErrorMessage(field) {
  const validator = messengers[field.id];
  return validator ? validator(field.value) : null;
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;

  if (target.id === "country") {
    togglePostalCodeField( Boolean(target.value) );
  }
  
  const errorMessage = getErrorMessage(target) || "";
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