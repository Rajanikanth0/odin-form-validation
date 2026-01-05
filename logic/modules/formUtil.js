// Get all form fields with a name attribute
function getFormFields(form) {
  return Array.from(
    form.querySelectorAll("[name]"),
    field => ({ id: field.id, element: field })
  );
}

// Display error messages
function showMessage(field, message) {
  const parentField = field.parentElement;

  let span = parentField.querySelector(".errorMessage");
  if (!span) {
    span = document.createElement("span");
    span.className = "errorMessage";
    parentField.appendChild(span);
  }

  span.textContent = message;
}

const validators = {
  postalCode(value) {
    const trimmed = value.trim();
    if (!value) return;

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
  },

  email(value) {
    const trimmed = value.trim();
    if (!value) return;

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
  },

  password(value) {
    const trimmed = value.trim();
    if (!value) return;

    // No spaces allowed
    if (/\s/.test(trimmed)) {
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
  },

  confirmPassword(value) {
    if (!value) return;

    // password field
    const password = document.getElementById("password").value;
    // match password 
    return value === password ? null: "Password didn't match.";
  }
};

export { getFormFields, showMessage, validators };