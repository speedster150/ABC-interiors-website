/* ==========================================================================
   ABC INTERIORS — LIVE SUPABASE DATABASE CONNECTION
   Location: Tirupati, Andhra Pradesh
   Target Table: "ABC-interiors"
   ========================================================================== */

// --------------------------------------------------------------------------
// LIVE SUPABASE CREDENTIALS & ENDPOINT CONFIGURATION
// --------------------------------------------------------------------------
const SUPABASE_CONFIG = {
  url: "https://yagmmewzrumakihxljfw.supabase.co",
  anonKey: "sb_publishable_yhc4GuYy7lwf9DHr4diTVQ_n_9FLHNN",
  tableName: "ABC-interiors"
};

/**
 * Inserts a lead row directly into Supabase via the PostgREST REST API.
 * Uses "Prefer": "return=minimal" for safe, write-only submissions.
 */
async function insertLeadToSupabase(payload) {
  const { url, anonKey, tableName } = SUPABASE_CONFIG;
  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(tableName)}`;

  console.group("📡 [Supabase Lead Submission]");
  console.log("Endpoint URL:", endpoint);
  console.log("Payload:", payload);

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
  } catch (netErr) {
    console.error("❌ Network / Fetch Exception:", netErr);
    console.groupEnd();
    throw new Error(`Network error: ${netErr.message || "Failed to reach Supabase"}`);
  }

  console.log(`HTTP Response: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    let errorDetail = `Supabase request failed (HTTP ${response.status})`;
    try {
      const errorJson = await response.json();
      console.error("❌ Supabase API Error Body:", errorJson);
      if (errorJson.message) {
        errorDetail = errorJson.message;
      }
      if (errorJson.hint) {
        errorDetail += ` (Hint: ${errorJson.hint})`;
      }
      if (errorJson.code === "42501") {
        errorDetail += " — RLS policy violation. Verify 'Allow public lead inserts' policy is active in Supabase.";
      }
      if (errorJson.code === "23502") {
        errorDetail += " — Required database column constraint missing.";
      }
    } catch (e) {
      // response wasn't JSON
    }
    console.groupEnd();
    throw new Error(errorDetail);
  }

  console.log("✅ Lead successfully inserted into Supabase!");
  console.groupEnd();
  return { success: true };
}

/**
 * Applies the centralized BUSINESS_CONFIG values to all matching DOM elements across the page.
 */
function applyBusinessConfig() {
  const cfg = window.BUSINESS_CONFIG;
  if (!cfg) return;

  console.log("🏢 [ABC Interiors] Applying centralized business configuration...", cfg);

  // 1. Brand Titles & Subtitles
  document.querySelectorAll('[data-business="brandTitle"]').forEach((el) => {
    if (cfg.brandTitleHtml) el.innerHTML = cfg.brandTitleHtml;
  });
  document.querySelectorAll('[data-business="brandSub"]').forEach((el) => {
    if (cfg.locationSubtitle) el.textContent = cfg.locationSubtitle;
  });

  // 2. Hero Section
  document.querySelectorAll('[data-business="heroLocation"]').forEach((el) => {
    if (cfg.heroEyebrow) {
      el.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${cfg.heroEyebrow}`;
    }
  });
  document.querySelectorAll('[data-business="heroStatBadge"]').forEach((el) => {
    if (cfg.stats?.heroStatBadge) el.textContent = cfg.stats.heroStatBadge;
  });

  // 3. Contact Info (Phone, WhatsApp, Email, Address, Hours)
  document.querySelectorAll('[data-business="addressFull"]').forEach((el) => {
    if (cfg.address?.full) el.textContent = cfg.address.full;
  });
  document.querySelectorAll('[data-business="addressLine1"]').forEach((el) => {
    if (cfg.address?.line1) el.textContent = cfg.address.line1;
  });
  document.querySelectorAll('[data-business="addressCityZip"]').forEach((el) => {
    if (cfg.address?.cityStateZip) el.textContent = cfg.address.cityStateZip;
  });
  document.querySelectorAll('[data-business="regionShort"]').forEach((el) => {
    if (cfg.address?.region) el.textContent = cfg.address.region;
  });
  document.querySelectorAll('[data-business="workingHours"]').forEach((el) => {
    if (cfg.workingHours) el.textContent = cfg.workingHours;
  });
  document.querySelectorAll('[data-business="phoneText"]').forEach((el) => {
    if (cfg.phone) el.textContent = cfg.phone;
  });
  document.querySelectorAll('[data-business="phoneLink"]').forEach((el) => {
    if (cfg.phoneRaw) el.setAttribute("href", `tel:${cfg.phoneRaw}`);
  });
  document.querySelectorAll('[data-business="whatsappLink"]').forEach((el) => {
    if (cfg.socialLinks?.whatsappChat) el.setAttribute("href", cfg.socialLinks.whatsappChat);
  });
  document.querySelectorAll('[data-business="emailText"]').forEach((el) => {
    if (cfg.email) el.textContent = cfg.email;
  });
  document.querySelectorAll('[data-business="emailLink"]').forEach((el) => {
    if (cfg.email) el.setAttribute("href", `mailto:${cfg.email}`);
  });

  // 4. Footer & Copyright
  document.querySelectorAll('[data-business="footerTagline"]').forEach((el) => {
    if (cfg.tagline) el.textContent = cfg.tagline;
  });
  document.querySelectorAll('[data-business="copyrightText"]').forEach((el) => {
    if (cfg.copyrightText) el.textContent = cfg.copyrightText;
  });
}

// --------------------------------------------------------------------------
// APPLICATION INITIALIZATION (Supports DOMContentLoaded & Immediate execution)
// --------------------------------------------------------------------------
function initApp() {
  console.log("🚀 [ABC Interiors] Initializing Website & Form Handlers...");

  // Apply centralized business configuration
  applyBusinessConfig();

  // 1. Popup Elements & Handlers
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  const popupForm = document.getElementById("popupForm");
  const popupStatus = document.getElementById("popupStatus");

  let popupDismissed = false;
  if (popup && closePopup) {
    setTimeout(() => {
      if (!popupDismissed) {
        popup.classList.remove("hidden");
      }
    }, 7000);

    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
      popupDismissed = true;
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.add("hidden");
        popupDismissed = true;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !popup.classList.contains("hidden")) {
        popup.classList.add("hidden");
        popupDismissed = true;
      }
    });
  }

  // Popup Form Submission
  if (popupForm && popupStatus) {
    const popupSubmitBtn = popupForm.querySelector('button[type="submit"]');

    popupForm.onsubmit = async (e) => {
      e.preventDefault();
      
      const name = popupForm.elements["name"]?.value?.trim() || popupForm.querySelector('[name="name"]')?.value?.trim();
      const email = popupForm.elements["email"]?.value?.trim() || popupForm.querySelector('[name="email"]')?.value?.trim();
      const phone = popupForm.elements["phone"]?.value?.trim() || popupForm.querySelector('[name="phone"]')?.value?.trim();

      if (!name || !email || !phone) {
        popupStatus.textContent = "Please fill in all fields.";
        popupStatus.className = "status error";
        return;
      }

      const popupPayload = {
        name,
        email,
        phone,
        location: "Tirupati (Lookbook)",
        property_type: "Lookbook Guide",
        budget_range: "Guide Request",
        requirement: "FREE Interior Design Guide",
        message: "Requested Lookbook & Cost Checklist from popup",
        created_at: new Date().toISOString()
      };

      const originalPopupBtnHtml = popupSubmitBtn ? popupSubmitBtn.innerHTML : "Send";
      if (popupSubmitBtn) {
        popupSubmitBtn.disabled = true;
        popupSubmitBtn.innerHTML = "<span>Sending Guide...</span>";
      }
      popupStatus.textContent = "Saving your request...";
      popupStatus.className = "status";

      try {
        await insertLeadToSupabase(popupPayload);
        popupStatus.textContent = "✓ Thank you! The Interior Design Guide has been sent to your email.";
        popupStatus.className = "status success";
        popupForm.reset();
        setTimeout(() => {
          popup.classList.add("hidden");
          popupDismissed = true;
        }, 2500);
      } catch (err) {
        console.error("❌ [Popup Submission Failed]:", err);
        popupStatus.textContent = `✕ Submission error: ${err.message}`;
        popupStatus.className = "status error";
      } finally {
        if (popupSubmitBtn) {
          popupSubmitBtn.disabled = false;
          popupSubmitBtn.innerHTML = originalPopupBtnHtml;
        }
      }
    };
  }

  // 2. Main Lead Enquiry Form Submission (Direct to Supabase "ABC-interiors" table)
  const leadForm = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");

  if (leadForm && formStatus) {
    const submitBtn = leadForm.querySelector('button[type="submit"]');

    console.log("✅ [ABC Interiors] leadForm found and submit handler attached.");

    leadForm.onsubmit = async (e) => {
      e.preventDefault();
      console.log("📝 [Form Submit Event Triggered]");

      // Extract form fields
      const name = leadForm.elements["name"]?.value?.trim() || leadForm.querySelector('[name="name"]')?.value?.trim();
      const phone = leadForm.elements["phone"]?.value?.trim() || leadForm.querySelector('[name="phone"]')?.value?.trim();
      const email = leadForm.elements["email"]?.value?.trim() || leadForm.querySelector('[name="email"]')?.value?.trim();
      const location = leadForm.elements["location"]?.value?.trim() || leadForm.querySelector('[name="location"]')?.value?.trim();
      const propertyType = leadForm.elements["property_type"]?.value || leadForm.querySelector('[name="property_type"]')?.value;
      const budget = leadForm.elements["budget"]?.value || leadForm.querySelector('[name="budget"]')?.value;
      const requirement = leadForm.elements["requirement"]?.value?.trim() || leadForm.querySelector('[name="requirement"]')?.value?.trim();
      const message = leadForm.elements["message"]?.value?.trim() || leadForm.querySelector('[name="message"]')?.value?.trim() || "";

      console.log("Form values collected:", { name, phone, email, location, propertyType, budget, requirement, message });

      if (!name || !phone || !email || !location || !propertyType || !budget || !requirement) {
        formStatus.textContent = "Please fill in all required fields to schedule your consultation.";
        formStatus.className = "status error";
        return;
      }

      // Payload matching exact columns of the 'ABC-interiors' table:
      const leadPayload = {
        name,
        phone,
        email,
        location,
        property_type: propertyType,
        budget_range: budget,
        requirement,
        message,
        created_at: new Date().toISOString()
      };

      // Loading UI State
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Send Enquiry";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "<span>Saving to Database...</span>";
      }
      formStatus.textContent = "Connecting to Supabase...";
      formStatus.className = "status";

      try {
        await insertLeadToSupabase(leadPayload);

        // Success Confirmation
        formStatus.textContent = `✓ Thank you, ${name}! Your consultation enquiry has been saved to our database. Our Tirupati studio team will contact you shortly.`;
        formStatus.className = "status success";
        leadForm.reset();
      } catch (err) {
        console.error("❌ [Form Submission Failed]:", err);
        formStatus.textContent = `✕ Database Insert Error: ${err.message}`;
        formStatus.className = "status error";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    };
  } else {
    console.error("❌ [ABC Interiors Error]: leadForm or formStatus element not found in DOM!");
  }

  // 3. Navigation Bar Scroll Effect & Mobile Menu
  const mainNav = document.getElementById("mainNav");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      mainNav?.classList.add("scrolled");
    } else {
      mainNav?.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("mobile-open");
      mobileToggle.textContent = navLinks.classList.contains("mobile-open") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        if (mobileToggle) mobileToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("mobile-open") && !navLinks.contains(e.target) && e.target !== mobileToggle) {
        navLinks.classList.remove("mobile-open");
        if (mobileToggle) mobileToggle.textContent = "☰";
      }
    });
  }

  // 4. Scroll Reveal Animations
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
  }

  // 5. Portfolio Filtering Logic
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioTiles = document.querySelectorAll(".portfolio-grid .tile");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioTiles.forEach((tile) => {
        const category = tile.getAttribute("data-category");
        const isMatch = filterValue === "all" || category === filterValue;
        if (isMatch) {
          tile.style.display = "";
          tile.style.opacity = "1";
          tile.style.transform = "scale(1)";
        } else {
          tile.style.display = "none";
          tile.style.opacity = "0";
          tile.style.transform = "scale(0.95)";
        }
      });
    });
  });

  // 6. Subtle Hero Card 3D Tilt Effect
  const heroCard = document.getElementById("heroCard");
  if (heroCard && !prefersReducedMotion && window.innerWidth > 900) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 8;
      const rotateY = (x / rect.width) * 8;

      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }
}

// Execute immediately if DOM is already ready (e.g. Live Server or async script), otherwise wait for DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
