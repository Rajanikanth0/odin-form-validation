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

function getErrorMessage(field) {
  return fieldValidators[field.id]?.(field.value) ?? null;
}

// Enable/disable the field
function toggleField(id, isDisabled) {
  const field = document.getElementById(id);
  if (field) field.disabled = isDisabled;
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const errorMessage = getErrorMessage(target) || "";

  const dependentField = fieldDependencies[target.id];
  if (dependentField) toggleField(dependentField, errorMessage);

  showMessage(target, errorMessage);
}

export { validateField };