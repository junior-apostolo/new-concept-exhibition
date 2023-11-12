(function () {
  "use strict";

  const fields = document.querySelectorAll("[required]");
  const fieldFile = document.querySelector('input[name="imagesEvent"]');

  let imageContainer = document.getElementById("images");
  let numOfFiles = document.getElementById("num-of-files");
  let language = "en-US";

  const budget = document.querySelector("#budget");

  document.querySelectorAll(".dropdown ul li a").forEach((item) => {
    item.addEventListener("click", (event) => {
      const valueSelected = event.target.textContent.trim();

      language = valueSelected;
    });
  });

  budget.addEventListener("input", (e) => {
    let value = e.target.value;
    value = value.replace(/[\D\s\._\-]+/g, "");
    value = value ? parseInt(value, 10) : 0;
    e.target.value = (function (value) {
      return value === 0
        ? ""
        : new Intl.NumberFormat(language, {
            style: "currency",
            currency: language == "en-US" ? "USD" : "BRL",
          }).format(value / 100);
    })(value);
  });

  function preview() {
    let MAX_IMAGES = 5;

    if (fieldFile.files.length > 5) {
      showToast(`You can upload up to ${MAX_IMAGES} files.`);
      fieldFile.value = "";
      return;
    }

    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fieldFile.files.length} Files Selected`;

    for (const i of fieldFile.files) {
      let reader = new FileReader();
      let figure = document.createElement("figure");
      let figCap = document.createElement("figcaption");

      figCap.innerText = i.name;
      figure.appendChild(figCap);
      reader.onload = () => {
        let img = document.createElement("img");
        img.setAttribute("src", reader.result);
        figure.insertBefore(img, figCap);
      };
      imageContainer.appendChild(figure);
      reader.readAsDataURL(i);
    }
  }

  function showToast(message, isValid) {
    var toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.innerText = message;
    if (isValid) {
      toast.style.backgroundColor = "#18d26e";
      toast.style.color = "#000";
    }
    setTimeout(function () {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  function limparCampoDeArquivo() {
    var input = document.getElementById("imagesEvent");

    input.value = ""; // Define o valor como uma string vazia
  }

  function validateField(field, language) {
    console.log("VALIDATE FIELD", field, language);
    function verifyErrors() {
      let foundError = false;

      for (let error in field.validity) {
        if (field.validity[error] && !field.validity.valid) {
          foundError = error;
        }
      }

      return foundError;
    }

    function customMessage(typeError) {
      const messages = {
        "en-US": {
          text: {
            valueMissing: "Please fill out this field",
          },
          email: {
            valueMissing: "Email is required",
            typeMismatch: "Please enter a valid email",
          },
          date: {
            valueMissing: "Please enter the event date",
          },
        },

        "pt-BR": {
          text: {
            valueMissing: "Por favor, preencha este campo",
          },
          email: {
            valueMissing: "Email é obrigatório",
            typeMismatch: "Por favor, preencha um email válido",
          },
          date: {
            valueMissing: "Por favor, Insira a data do Evento",
          },
        },
      };

      return messages[language][field.type][typeError];
    }

    function setCustomMessage(message) {
      const spanError = field.parentNode.querySelector("span.input-error");

      if (message) {
        spanError.classList.add("active");
        spanError.innerHTML = message;
      } else {
        spanError.classList.remove("active");
        spanError.innerHTML = "";
      }
    }

    return function () {
      const error = verifyErrors();

      if (error) {
        const message = customMessage(error);

        field.style.borderColor = "red";
        setCustomMessage(message);
      } else {
        field.style.borderColor = "green";
        setCustomMessage();
      }
    };
  }

  function customValidation(event) {
    const field = event.target;

    const validation = validateField(field, language);

    validation();

    // const error = validateField(field);
  }

  function uploadTypeFile() {
    const MAX_IMAGES = 5;
    let imagesBase64 = [];

    if (fieldFile.files.length > 0) {
      let validFiles = Array.from(fieldFile.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (validFiles.length !== fieldFile.files.length) {
        showToast("Please select images only.");
        limparCampoDeArquivo();
        return false;
      }

      if (validFiles.length > MAX_IMAGES) {
        showToast(`You can upload up to ${MAX_IMAGES} files.`);
        fieldFile.value = "";
        return false;
      }

      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          imagesBase64.push({
            name: file.name,
            base64: reader.result,
          });
        };
        reader.readAsDataURL(file);
      });
    } else {
      showToast("Please select images.");
      return false;
    }

    const inputValues = Array.from(document.querySelectorAll("input")).reduce(
      (acc, input) => {
        acc[input.name] = input.value;
        return acc;
      },
      {}
    );
    const selectValues = Array.from(document.querySelectorAll("select")).reduce(
      (acc, select) => {
        acc[select.name] = select.value;
        return acc;
      },
      {}
    );
    
    inputValues.budget = inputValues.budget.replace(/[^\d.-]/g, '')

    const request = {
      telephone: inputValues.telephone,
      eventName: inputValues.event,
      eventDate: inputValues.dateEvent,
      email: inputValues.email,
      eventPlace: inputValues.place,
      standSize: inputValues.size,
      budget: parseFloat(inputValues.budget),
      quantityCounter: parseInt(inputValues.quantityCounter),
      tableQuantity: parseInt(inputValues.tableQuantity),
      quantityChair: parseInt(inputValues.quantityChair),
      typeFloor: parseInt(selectValues.typeFloor),
      quantityTv: parseInt(inputValues.quantityTv),
      isNeededGraph: Boolean(selectValues.isNeededGraph),
      images: imagesBase64,
    };

    console.log("REQUEST", request);


    fetch("https://new-cncept-exhibition-2ed472269eb6.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: request,
    }).then((response) => {
      if (response.ok) {
        return console.log("Formulario enviado");
      }
      console.error("Erro no Envio do formulario");
    });

    return true;
  }

  for (let field of fields) {
    field.addEventListener("invalid", (event) => {
      //eliminar o bubble
      event.preventDefault();
      customValidation(event);
    });
    field.addEventListener("blur", customValidation);
  }

  fieldFile.addEventListener("change", preview);

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    if (uploadTypeFile()) {
      showToast("Dados Enviados", true);
      event.target.reset();
    } else {
      showToast("Preencha os campos");
    }
  });

  // function php_email_form_submit(thisForm, action, formData) {
  //   fetch(action, {
  //     method: "POST",
  //     body: formData,
  //     headers: { "X-Requested-With": "XMLHttpRequest" },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.text();
  //       } else {
  //         throw new Error(
  //           `${response.status} ${response.statusText} ${response.url}`
  //         );
  //       }
  //     })
  //     .then((data) => {
  //       thisForm.querySelector(".loading").classList.remove("d-block");
  //       if (data.trim() == "OK") {
  //         thisForm.querySelector(".sent-message").classList.add("d-block");
  //         thisForm.reset();
  //       } else {
  //         throw new Error(
  //           data
  //             ? data
  //             : "Form submission failed and no error message returned from: " +
  //               action
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       displayError(thisForm, error);
  //     });
  // }

  // function displayError(thisForm, error) {
  //   thisForm.querySelector(".loading").classList.remove("d-block");
  //   thisForm.querySelector(".error-message").innerHTML = error;
  //   thisForm.querySelector(".error-message").classList.add("d-block");
  // }
})();
