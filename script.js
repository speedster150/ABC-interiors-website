const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
setTimeout(() => popup.classList.remove("hidden"), 7000);
closePopup.addEventListener("click", () => popup.classList.add("hidden"));
popup.addEventListener("click", e => { if(e.target === popup) popup.classList.add("hidden"); });

document.getElementById("popupForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("popupStatus").textContent =
    "Demo captured. Connect this form to Mailchimp before production.";
});

document.getElementById("leadForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formStatus").textContent =
    "Demo captured. Connect this form to your Supabase endpoint before production.";
});
