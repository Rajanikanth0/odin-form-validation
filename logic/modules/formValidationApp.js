import { getFormFields } from "./formUtil.js";
import { validateField } from "./formValidator.js";

// Attach listeners to fields
function addFieldListeners(fieldsObject) {
  fieldsObject.forEach(({id, element}) => {
    const eventType = (id === "country") ? "change" : "input";
    element.addEventListener(eventType, validateField);
  });
}

// Validate Form on submit
function handleSubmit(event, fields) {
  const form = event.target;
  // ignore disabled field validation
  const enabledFields = fields.filter(({element}) => !element.disabled);

  if ( !form.checkValidity() ) {
    enabledFields.forEach(({ element }) => {
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

  const fieldsObject = getFormFields(form);
  addFieldListeners(fieldsObject);

  form.addEventListener("submit", (e) => handleSubmit(e, fieldsObject));
}

export { initializeForm };