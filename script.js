document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  console.log("Script loaded. Ready for future enhancements!");

  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const bookingData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        service: document.getElementById("service").value,
        notes: document.getElementById("notes").value
      };

      const submitButton = bookingForm.querySelector("button[type='submit']");
      submitButton.disabled = true;
      submitButton.innerText = `Processing... Please wait (5s)`;

      let countdown = 5;
      const interval = setInterval(() => {
        countdown--;
        submitButton.innerText = `Processing... Please wait (${countdown}s)`;
      }, 1000);

      const scriptURL = "https://script.google.com/macros/s/AKfycbxCq285hvvjvOVlvDHRAeRCQosshKFjnJYYUCfANhcbt5Ft5C_DkyFruXFoLsYc9jjK/exec";

      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: { "Content-Type": "application/json" },
        mode: "no-cors"
      })
      .then(() => {
        clearInterval(interval);
        showSuccessPopup(bookingData, bookingForm, submitButton);
      })
      .catch(error => {
        clearInterval(interval);
        console.error("Booking error:", error);
        alert("Error! Please try again.");
        submitButton.disabled = false;
        submitButton.innerText = "Submit Booking";
      });
    });
  }
    // ✅ 📅 Block past dates
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  
    // ✅ 📞 Force only 10 digits for phone
    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  
    // // ✅ 📧 Light email check (just @ and .com)
    // const emailInput = document.getElementById("email");
    // emailInput.addEventListener("blur", function () {
    //   const emailVal = this.value.trim();
    //   if (emailVal && (!emailVal.includes("@") || !emailVal.includes(".com"))) {
    //     alert("Please enter a valid email containing '@' and '.com'");
    //     this.focus();
    //   }
    // });
  function showSuccessPopup(data, bookingForm, submitButton) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("booking-success-message");
    successMessage.innerHTML = `
      <div style="text-align: center; font-family: 'Poppins', sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h3 style="color: #2e7d32;"><i class="fas fa-check-circle"></i> Booking Submitted!</h3>
        <p style="font-size: 16px; margin: 10px 0;">Would you like to confirm your booking via <strong>WhatsApp</strong>?</p>
        <div style="margin-top: 15px;">
          <button id="confirmYes" style="background-color: #25D366; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin-right: 10px;">Yes</button>
          <button id="confirmNo" style="background-color: #ccc; color: black; border: none; padding: 10px 20px; border-radius: 5px;">No</button>
        </div>
      </div>
    `;
    bookingForm.parentElement.appendChild(successMessage);
    submitButton.style.display = "none";

    document.getElementById("confirmYes").onclick = function () {
      sendWhatsAppMessage(data);
      resetForm();
    };

    document.getElementById("confirmNo").onclick = function () {
      successMessage.innerHTML = `
        <div style="text-align: center; font-family: 'Poppins', sans-serif; padding: 20px;">
          <p style="color: #333;">Thank you! We’ll contact you shortly.</p>
        </div>
      `;
      resetForm();
    };

    function resetForm() {
      bookingForm.reset();
      submitButton.disabled = false;
      submitButton.innerText = "Submit Booking";
      submitButton.style.display = "block";
    }
  }

  function sendWhatsAppMessage(data) {
    const message = `Hello Henna by Swetha,%0A%0A*New Booking Details*%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email}%0ADate: ${data.date}%0ATime: ${data.time}%0AService: ${data.service}%0ANotes: ${data.notes}`;
    const number = "918072311407";
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  }

  // Mobile menu toggle placeholder
  function toggleMobileMenu() {
    alert("Mobile menu toggle clicked!");
  }
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
});
  // FAQ toggle
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const answer = btn.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
  });