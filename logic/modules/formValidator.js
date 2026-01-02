import { showMessage, getErrorMessage } from "./formUtil.js";

// Handle postal code enable/disable
function handleCountryField(value) {
  const pCode = document.getElementById("p-code");
  if (pCode) {
    pCode.disabled = !value;
  }
}

function handleMessage(field) {
  if (field.id == "p-code") {
    const value = field.value;
    const [char, numbers] = value.split('-');

    if (!char || !numbers) {
      return "Postal Code must contain a dash separating character and digits."
    }

    if (!/^[a-zA-Z]$/.test(char)) {
      return "Postal Code must have a single letter before '-'.";
    }
    
    if (!/^\d$/.test(numbers)) {
      return "Postal Code must have exactly 4 digits after '-'.";
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