// Form Utilities

const FormUtils = (() => {
  // Get all form fields with a name attribute
  function getFormFields(form) {
    return Array.from(
      form.querySelectorAll("[name]"),
      field => ({ id: field.id, element: field })
    );
  }

  // Display error messages
  function showMessage(field, message) {
    const label = document.querySelector(`[for="${field.id}"]`);
    if (!label) return;

    let span = label.querySelector(".errorBubble");
    if (!span) {
      span = document.createElement("span");
      span.className = "errorBubble";
      label.appendChild(span);
    }

    span.textContent = message;
  }

  return {
    getFormFields,
    showMessage
  }
})();

// Validation Module

const FormValidator = (() => {
  // Check a single field's validity
  function validateField(event) {
    const { target = event } = event;
    const { validity } = target;

    let errorMessage = "";

    if (validity.valueMissing) {
      errorMessage = "This field is required.";
    } else if (validity.patternMismatch) {
      errorMessage = "Invalid format.";
    }

    FormUtils.showMessage(target, errorMessage);
  }

  // Attach listeners to fields
  function addFieldListeners(fields) {
    fields.forEach(({id, element}) => {
      const eventType = (id === "country") ? "change" : "input";
      element.addEventListener(eventType, validateField);
    });
  }

  return {
    validateField,
    addFieldListeners
  }
})();

// Main Form Validation Initializer

const FormValidationApp = (() => {
  // Main initializer
  function init() {
    const form = document.querySelector("form");
    if (!form) {
      console.warn("No form found on the page.");
      return;
    }

    const fields = FormUtils.getFormFields(form);
    FormValidator.addFieldListeners(fields);

    form.addEventListener("submit", (e) => {
      const form = e.target;

      if (form.checkValidity()) {

      } else {
        for (const {id, element} of fields) {
          FormValidator.validateField(element);
        }

        // form.reportValidity();
        e.preventDefault();
      }
    });
  }

  return { init };
})();

// Initialize

document.addEventListener("DOMContentLoaded", () => {
  FormValidationApp.init();
});