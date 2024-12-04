document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Formular validieren
    if (validateForm()) {
      // Daten im Local Storage speichern
      saveToLocalStorage();

      // Daten an den Server senden
      sendDataToServer();

      // Bestätigung anzeigen
      document.getElementById("confirmationMessage").style.display = "block";

      // Felder zurücksetzen
      document.getElementById("contactForm").reset();

      // Local Storage löschen
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("message");
    }
  });
});

// Funktion zur Speicherung im Local Storage
function saveToLocalStorage() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Speichere die Werte im Local Storage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("message", message);
}

// Funktion zur Validierung des Formulars
function validateForm() {
  let isValid = true;

  // Name validieren
  const name = document.getElementById("name").value.trim();
  if (name === "") {
    document.getElementById("nameError").textContent =
      "Bitte geben Sie Ihren Namen ein.";
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("nameError").style.display = "none";
  }

  // E-Mail validieren
  const email = document.getElementById("email").value.trim();
  if (email === "") {
    document.getElementById("emailError").textContent =
      "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // Nachricht validieren
  const message = document.getElementById("message").value.trim();
  if (message === "") {
    document.getElementById("messageError").textContent =
      "Bitte geben Sie eine Nachricht ein.";
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  } else {
    document.getElementById("messageError").style.display = "none";
  }

  return isValid;
}

// Funktion zum Senden der Daten an den Server
function sendDataToServer() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const data = {
    name: name,
    email: email,
    message: message,
  };

  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Erfolgreich gesendet:", data);
    })
    .catch((error) => {
      console.error("Fehler beim Senden:", error);
    });
}
