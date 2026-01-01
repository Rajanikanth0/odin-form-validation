import { showMessage } from "./formUtil.js";

// Check a single field's validity
function validateField(event) {
  const { target = event } = event;
  const { validity } = target;

  let errorMessage = "";

  if (validity.valueMissing) {
    errorMessage = "This field is required.";
  } else if (validity.patternMismatch) {
    errorMessage = "Invalid format.";
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