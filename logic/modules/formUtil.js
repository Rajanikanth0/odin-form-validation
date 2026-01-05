// Get all form fields with a name attribute
function getFormFields(form) {
  return Array.from( form.querySelectorAll("[name]") );
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
  postalCode(value, required) {
    if (!value) {
      return required ? "The field is required!" : null;
    }

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
  },

  email(value, required) {
    if (!value) {
      return required ? "The field is required!" : null;
    }

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
  },

  password(value, required) {
    // Validation rules
    const rules = [
      {
        id: "lower",
        test: (val) => /[a-z]/.test(val),
        message: "Password must contain at least one lowercase letter."
      },
      {
        id: "upper",
        test: (val) => /[A-Z]/.test(val),
        message: "Password must contain at least one uppercase letter."
      },
      {
        id: "digit",
        test: (val) => /\d/.test(val),
        message: "Password must contain at least one digit."
      },
      {
        id: "length",
        test: (val) => val.length >= 6 && val.length <= 12,
        message: "Password must be between 6 and 12 characters long."
      }
    ];

    const passwordChecks = document.querySelector(".passwordConstraints");

    if (!value) {
      rules.forEach(({id}) => {
        const checkbox = passwordChecks.querySelector(`#${id}`);
        if (checkbox) checkbox.checked = false;
      });

      return required ? "The field is required!": null;
    };

    const trimmed = value.trim();

    
    // No spaces allowed
    if (/\s/.test(trimmed)) {
      return "Password cannot contain spaces.";
    }

    // Run through rules
    for (const rule of rules) {
      const isValid = rule.test(trimmed);
      const checkbox = passwordChecks.querySelector(`#${rule.id}`);

      if (checkbox) checkbox.checked = isValid;
      if (!isValid) return rule.message;
    }

    return null; // valid
  },
  
  confirmPassword(value, required) {
    if (!value) {
      return required ? "The field is required!" : null;
    }
    
    // password field
    const password = document.getElementById("password").value;
    // match password 
    return value === password ? null: "Password didn't match.";
  }
};

export { getFormFields, showMessage, validators };