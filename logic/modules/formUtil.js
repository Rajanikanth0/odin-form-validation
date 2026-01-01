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

export { getFormFields, showMessage };