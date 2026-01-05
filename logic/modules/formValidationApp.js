import { getFormFields } from "./formUtil.js";
import { validateField } from "./formValidator.js";

// Attach listeners to fields
function addFieldListeners(fieldsObject) {
  fieldsObject.forEach(({id, element}) => {
    const eventType = (id === "country") ? "change" : "input";
    element.addEventListener(eventType, validateField);
  });
}

// Validate Form on submit
function handleSubmit(event, fields) {
  // Only validate enabled fields
  const enabledFields = fields.filter(({ element }) => !element.disabled);

  // Form is valid if every enabled field passes validation
  const isFormValid = enabledFields.every(({ element }) => !validateField(element));

  if (!isFormValid) {
    event.preventDefault();
  }
}

// Main initializer
function initializeForm() {
  const form = document.querySelector("form");
  if (!form) {
    console.warn("No form found on the page.");
    return;
  }

  const fieldsObject = getFormFields(form);
  addFieldListeners(fieldsObject);

  form.addEventListener("submit", (e) => handleSubmit(e, fieldsObject));
}

export { initializeForm };