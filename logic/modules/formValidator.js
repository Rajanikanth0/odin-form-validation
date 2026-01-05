import { showMessage, validators } from "./formUtil.js";

const fieldValidators = {
  "p-code": validators.postalCode,
  "email": validators.email,
  "password": validators.password,
  "c-password": validators.confirmPassword
};

const fieldDependencies = {
  "country": "p-code",
  "password": "c-password"
};

function getErrorMessage({ id, value, required }) {
  return fieldValidators[id]?.(value, required) || null;
}

// Enable/disable a field
function toggleField(id, value, disabled) {
  if (!value) return;

  const field = document.getElementById(id);
  if (field) field.disabled = disabled;
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const errorMessage = getErrorMessage(target) || "";

  const dependentField = fieldDependencies[target.id];
  if (dependentField) toggleField(dependentField, target.value, errorMessage);

  showMessage(target, errorMessage);
  return errorMessage;
}

export { validateField };