import { showMessage, getErrorMessage } from "./formUtil.js";

// Handle postal code enable/disable
function handleCountryField(value) {
  const pCode = document.getElementById("p-code");
  if (pCode) {
    pCode.disabled = !value;
  }
}

function handleMessage(field) {
  const value = field.value.trim();

  if (field.id === "p-code") {
    const [char, numbers] = value.split('-');

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
  }

  if (field.id === "email") {
    const [username, domainPart] = value.split('@');

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
  }

  if (field.id === "password") {
    // No spaces allowed
    if (!/^[^\s]+$/.test(value)) {
      return "Password cannot contain spaces.";
    }

    // Length check
    if (value.length < 6 || value.length > 12) {
      return "Password must be between 6 and 12 characters long.";
    }

    // at least one lowercase letter check
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }

    // at least one uppercase letter check
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }

    // at least one digit check
    if (!/\d/.test(value)) {
      return "Password must contain at least one digit.";
    }
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