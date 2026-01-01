import { getFormFields } from "./formUtil.js";
import { validateField, addFieldListeners } from "./formValidator.js";

// Validate Form on submit
function handleSubmit(event, fields) {
  const form = event.target;

  if ( !form.checkValidity() ) {
    fields.forEach(({ element }) => {
      validateField(element);
    });
    event.preventDefault();
  }
}

// Main initializer
function initializeForm() {
  const form = document.querySelector("form");
  if (!form) {
    console.warn("No form found on the page.");
    return;
  }

  const fields = getFormFields(form);
  addFieldListeners(fields);

  form.addEventListener("submit", (e) => handleSubmit(e, fields));
}

export { initializeForm };