document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("submit-btn");
  const errorMessage = document.getElementById("error-message");
  const passwordContainer = document.getElementById("password-container");
  const contentContainer = document.getElementById("content-container");

  submitBtn.addEventListener("click", () => {
    const password = passwordInput.value;
    if (password === "123456") {
      passwordContainer.classList.add("hidden");
      contentContainer.classList.remove("hidden");
    } else {
      errorMessage.textContent = "Incorrect password, please try again!";
      passwordInput.value = "";
    }
  });

  // triggered by enter
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitBtn.click();
    }
  });
});
