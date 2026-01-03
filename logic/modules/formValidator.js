import { showMessage, getErrorMessage } from "./formUtil.js";

// Handle postal code enable/disable
function handleCountryField(value) {
  const pCode = document.getElementById("p-code");
  if (pCode) {
    pCode.disabled = !value;
  }
}

function handleMessage(field) {
  const value = field.value;

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
    const usernameRegex = /^[a-zA-Z0-9._%+\-]+$/;
    if (!usernameRegex.test(username)) {
      return "Username (before @) can only contain letters, numbers, (_, %, +, -).";
    }

    // Validate domain structure
    if (!domainPart.includes(".")) {
      return "Email must contain a dot separating domain and top-level domain.";
    }

    const parts = domainPart.split(".");
    const tld = parts.pop();
    const domain = parts.join(".");

    // Validate domain and TLD
    if (!tld) {
      return "Email must contain a top-level domain after the final dot.";
    }

    const domainRegex = /^[a-zA-Z0-9.\-]+$/;
    if (!domainRegex.test(domain)) {
      return "Domain (before final dot) can only have letters, numbers, (., -).";
    }

    const tldRegex = /^[a-zA-Z]{2,}$/;
    if (!tldRegex.test(tld)) {
      return "Top-level domain (after final dot) must be at least 2 letters.";
    }
  }

  if (field.id === "password") {
    // No spaces allowed
    const noSpaceRegex = /^[^\s]+$/;
    if (!noSpaceRegex.test(value)) {
      return "Password cannot contain spaces.";
    }

    // Length check
    if (value.length < 6 || value.length > 12) {
      return "Password must be between 6 and 12  characters long.";
    }

    // at least one lowercase letter check
    const lowerCaseRegex = /[a-z]/;
    if (!lowerCaseRegex.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }

    // at least one uppercase letter check
    const upperCaseRegex = /[A-Z]/;
    if (!upperCaseRegex.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }

    // at least one digit check
    const digitRegex = /\d/;
    if (!digitRegex.test(value)) {
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