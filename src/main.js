
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    const nameInput = document.getElementById('name');
    nameInput.focus({ preventScroll: true }); 
  });

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerHTML = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

const overlay = document.querySelector(".form-overlay");

  function showOverlay() {
    overlay.classList.add("visible");
    document.body.style.overflow = "hidden";
}

  function hideOverlay() {
    overlay.classList.remove("visible");
    document.body.style.overflow = "";
  }

const helpForm = document.querySelector(".help-form-grid");

const validationMessages = {
  user_name: "Введіть своє ім’я, будь ласка",
  user_email: "Введіть коректний email, наприклад: name@example.com, будь ласка",
  user_tel: "Введіть коректний номер телефону, будь ласка",
  user_message: "Напишіть Ваше повідомлення, будь ласка",
};

const fields = helpForm.querySelectorAll("input, textarea");

fields.forEach((field) => {
  field.addEventListener("invalid", () => {
    const message = validationMessages[field.name] || "Заповніть це поле, будь ласка";
    field.setCustomValidity(message); 
    field.classList.remove("show-errors");
    void field.offsetWidth;
    field.classList.add("show-errors");
});

  field.addEventListener("input", () => {
    field.setCustomValidity("");
    field.classList.remove("show-errors");
  });
});

helpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  showOverlay();
  //emailjs.sendForm("service_j7qrtug", "template_suxpbsw", this);
  new Promise((resolve) => {
  setTimeout(resolve, 1000); 
})
      .then(() => {
      helpForm.reset();
      fields[0].focus();
      showToast(
        "✅ Повідомлення надіслано!<br>Ми вiдповiмо Вам найближчим часом 😉");
    })
    .catch((error) => {
      showToast("⚠️ Сталася помилка. Спробуйте ще раз, будь ласка");
      console.error("EmailJS error:", error);
    })
    .finally(() => {
      hideOverlay();
    });
});
