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

// Enable/disable a field
function toggleField(id, disabled) {
  const field = document.getElementById(id);
  if (field) {
    field.disabled = disabled;
  }
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const { id, value, required } = target;

  const errorMessage = runValidator(id, value, required);

  updateFieldState(target, errorMessage);
  handleDependencies(id, value, errorMessage);

  showMessage(target, errorMessage);
  return errorMessage;
}

function runValidator(id, value, required) {
  return fieldValidators[id]?.(value, required) || "";
}

function updateFieldState(target, errorMessage) {
  target.classList.toggle("invalid", Boolean(errorMessage));
}

function handleDependencies(id, value, errorMessage) {
  const dependentField = fieldDependencies[id];
  if (dependentField && value) {
    toggleField(dependentField, errorMessage);
  }
}

export { validateField };