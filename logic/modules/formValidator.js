import { showMessage, validators } from "./formUtil.js";

const messengers = {
  "p-code": validators.postalCode,
  "email": validators.email,
  "password": validators.password,
  "c-password": validators.confirmPassword
};

function getErrorMessage(field) {
  return messengers[field.id]?.(field.value) ?? null;
}

// Enable/disable the field
function toggleField(id, isDisabled) {
  const field = document.getElementById(id);
  if (field) field.disabled = isDisabled;
}

const fieldDependencies = {
  country: "p-code",
  password: "c-password"
};

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const errorMessage = getErrorMessage(target) || "";

  const dependentField = fieldDependencies[target.id];
  if (dependentField) toggleField(dependentField, errorMessage);

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