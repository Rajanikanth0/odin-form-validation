import { getFormFields } from "./formUtil.js";
import { validateField } from "./formValidator.js";

// Attach listeners to fields
function addFieldListeners(fields) {
  fields.forEach(field => {
    const eventType = (field.id === "country") ? "change" : "input";
    field.addEventListener(eventType, validateField);
  });
}

// Validate Form on submit
function handleSubmit(event, fields) {
  // Only validate enabled fields
  const enabledFields = fields.filter(field => !field.disabled);
  const invalidFields = enabledFields.filter(field => validateField(field));

  // Form is valid if every enabled field passes validation
  if (invalidFields.length !== 0) {
    event.preventDefault();
  }
}

function addRequiredIndicator() {
  const requiredFields = document.querySelectorAll("input[required]");
  requiredFields.forEach( field => {
    const label = field.previousElementSibling;
    label.textContent += ' *';
  });
}

// Main initializer
function initializeForm() {
  addRequiredIndicator();

  const form = document.querySelector("form");
  if (!form) {
    console.warn("No form found on the page.");
    return;
  }

  const fields = getFormFields(form);
  addFieldListeners(fields);

  form.addEventListener("submit", (e) => handleSubmit(e, fields));
}

export { initializeForm };