// Utility: Get all form fields with a name attribute
function getFormFields(form) {
  return Array.from(
    form.querySelectorAll("[name]"),
    field => ({ id: field.id, element: field })
  );
}

// Utility: Display error messages
function showMessage(message) {
  console.log(message);
}

// Validation: Check a single field's validity
function validateField(event) {
  const { target = event } = event;
  const { validity } = target;

  let errorMessage = "";

  if (validity.valueMissing) {
    errorMessage = "This field is required.";
  } else if (validity.patternMismatch) {
    errorMessage = "Invalid format.";
  }

  showMessage(errorMessage);
}

// Attach listeners to fields
function addFieldListeners(fields) {
  fields.forEach(({id, element}) => {
    const eventType = (id === "country") ? "change" : "input";
    element.addEventListener(eventType, validateField);
  });
}

// Main initializer
function FormValidation() {
  const form = document.querySelector("form");
  if (!form) {
    console.warn("No form found on the page.");
    return;
  }

  const fields = getFormFields(form);
  addFieldListeners(fields);
}

// Initialize
FormValidation();