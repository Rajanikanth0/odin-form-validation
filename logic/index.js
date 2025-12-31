function FormValidation() {
  const form = document.querySelector("form");

  const getFormFields = (form) => {
    return Array.from(
      form.querySelectorAll("[name]"),
      field => ({ id: field.id, element: field })
    );
  }

  const validateField = (e) => {
    console.log(e);
  }

  const addFieldListeners = (fields) => {
    fields.forEach(({id, element}) => {
      if (id == "country") {
        element.addEventListener("change", validateField);
      } else {
        element.addEventListener("input", validateField);
      }
    });
  };
  
  const fields = getFormFields(form);
  addFieldListeners(fields);
}

FormValidation();