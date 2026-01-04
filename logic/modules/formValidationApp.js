import { getFormFields } from "./formUtil.js";
import { validateField } from "./formValidator.js";

// Attach listeners to fields
function addFieldListeners(fields) {
  fields.forEach(({id, element}) => {
    const eventType = (id === "country") ? "change" : "input";
    element.addEventListener(eventType, validateField);
  });
}

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