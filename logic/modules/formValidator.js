import { showMessage, getErrorMessage } from "./formUtil.js";

// Handle postal code enable/disable
function handleCountryField(value) {
  const pCode = document.getElementById("p-code");
  if (pCode) {
    pCode.disabled = !value;
  }
}

function validatePostalCode(value) {
  const trimmed = value.trim();
  const [char, numbers] = trimmed.split('-');

  // Validate presence of char and numbers
  if (!char || !numbers) {
    return "Postal Code must contain a single dash separating character and digits."
  }

  // Validate char structure
  if (!/^[a-zA-Z]$/.test(char)) {
    return "Postal Code must have a single letter before '-'.";
  }
  
  // Validate number characters
  if (!/^\d{4}$/.test(numbers)) {
    return "Postal Code must have exactly 4 digits after '-'.";
  }

  return null; // valid
}

function validateEmail(value) {
  const trimmed = value.trim();
  const [username, domainPart] = trimmed.split('@');

  // Validate presence of username and domain
  if (!username || !domainPart) {
    return "Email must contain a single '@' separating username and domain.";
  }

  // Validate username characters
  if (!/^[a-zA-Z0-9._%+\-]+$/.test(username)) {
    return "Username (before @) can only contain letters, numbers, (_, %, +, -).";
  }

  // Validate domain structure
  const parts = domainPart.split(".");
  if (parts.length < 2) {
    return "Email must contain a dot separating domain and top-level domain.";
  }

  const tld = parts.pop();
  const domain = parts.join(".");

  // Validate domain and TLD

  if (!/^[a-zA-Z0-9.\-]+$/.test(domain)) {
    return "Domain (before final dot) can only have letters, numbers, (., -).";
  }

  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return "Top-level domain (after final dot) must be at least 2 letters.";
  }

  return null; // valid
}

function validatePassword(value) {
  const trimmed = value.trim();

  // No spaces allowed
  if (!/^[^\s]+$/.test(trimmed)) {
    return "Password cannot contain spaces.";
  }

  // Length check
  if (trimmed.length < 6 || trimmed.length > 12) {
    return "Password must be between 6 and 12 characters long.";
  }

  // at least one lowercase letter check
  if (!/[a-z]/.test(trimmed)) {
    return "Password must contain at least one lowercase letter.";
  }

  // at least one uppercase letter check
  if (!/[A-Z]/.test(trimmed)) {
    return "Password must contain at least one uppercase letter.";
  }

  // at least one digit check
  if (!/\d/.test(trimmed)) {
    return "Password must contain at least one digit.";
  }

  return null; // valid
}

function handleMessage(field) {
  const value = field.value;

  switch (field.id) {
    case "p-code":
      return validatePostalCode(value);
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    default:
      return null;
  }
}

// Validate a single field
function validateField(event) {
  const target = event.target || event;
  const { validity, id, value } = target;

  if (id === "country") {
    handleCountryField(value);
  }

  console.log( handleMessage(target) );
  
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