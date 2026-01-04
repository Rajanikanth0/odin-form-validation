import { showMessage, FieldErrorMessage } from "./formUtil.js";

const messengers = {
  "p-code": FieldErrorMessage.postalCode,
  "email": FieldErrorMessage.email,
  "password": FieldErrorMessage.password
};

function togglePostalCodeField(isEnabled) {
  const postalCode = document.getElementById("p-code");
  if (postalCode) {
    postalCode.disabled = !isEnabled;
  }
}

function getErrorMessage(field) {
  const messenger = messengers[field.id];
  return messenger ? messenger(field.value) : null;
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const { id, value } = target;

  if (id === "country") {
    togglePostalCodeField( Boolean(value) );
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