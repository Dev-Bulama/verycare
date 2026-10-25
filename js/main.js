/*
 * VeryCare — site behaviour (vanilla JavaScript, no dependencies)
 *  1. Accessible mobile navigation
 *  2. Current year in the footer
 *  3. Consultation form: validation and honest submission handling
 */
(function () {
  "use strict";

  /* 1. Mobile navigation ---------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close the menu after following an in-page link.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Reset when the viewport grows past the mobile breakpoint.
    var desktop = window.matchMedia("(min-width: 1024px)");
    var onChange = function (mq) { if (mq.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Photos: hide any photo that fails to load instead of showing it broken */
  document.querySelectorAll("[data-photo-frame] img[data-photo]").forEach(function (img) {
    var hide = function () { img.closest("[data-photo-frame]").hidden = true; };
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) hide();
    else img.addEventListener("error", hide);
  });

  /* Hero slideshow: cross-fading photos behind the hero text ---------- */
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    var dots = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-dot]"));
    var controls = hero.querySelector("[data-hero-controls]");
    var toggleBtn = hero.querySelector("[data-hero-toggle]");
    var current = 0;
    var timer = null;
    var userPaused = reduceMotion; // never auto-advance when reduced motion is requested
    var hovered = false;
    var DELAY = 6000;

    var render = function () {
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle("is-active", active);
        if (active) slide.removeAttribute("aria-hidden");
        else slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("aria-label", (i + 1) + " of " + slides.length);
      });
      dots.forEach(function (dot, i) {
        if (i === current) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
        dot.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
      });
    };

    var go = function (index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      render();
    };

    var stop = function () { clearInterval(timer); timer = null; };
    var start = function () {
      stop();
      if (!userPaused && !hovered && slides.length > 1 && !document.hidden) {
        timer = setInterval(function () { go(current + 1); }, DELAY);
      }
    };

    var updateToggle = function () {
      toggleBtn.setAttribute("data-paused", String(userPaused));
      toggleBtn.setAttribute("aria-label", userPaused ? "Play slideshow" : "Pause slideshow");
    };

    // Drop slides whose photo fails to load, together with their dot.
    var removeSlide = function (slide) {
      var i = slides.indexOf(slide);
      if (i === -1) return;
      slides.splice(i, 1);
      slide.remove();
      var dot = dots.splice(i, 1)[0];
      if (dot) dot.remove();
      dots.forEach(function (d, n) { d.setAttribute("data-hero-dot", String(n)); });
      if (current >= slides.length) current = 0;
      if (controls) controls.hidden = slides.length < 2;
      render();
      start();
    };
    slides.slice().forEach(function (slide) {
      var img = slide.querySelector("img");
      if (!img) return;
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) removeSlide(slide);
      else img.addEventListener("error", function () { removeSlide(slide); });
    });

    if (controls && slides.length > 1) {
      controls.hidden = false;
      hero.querySelector("[data-hero-prev]").addEventListener("click", function () { go(current - 1); start(); });
      hero.querySelector("[data-hero-next]").addEventListener("click", function () { go(current + 1); start(); });
      controls.addEventListener("click", function (event) {
        var dot = event.target.closest("[data-hero-dot]");
        if (dot) { go(Number(dot.getAttribute("data-hero-dot"))); start(); }
      });
      toggleBtn.addEventListener("click", function () {
        userPaused = !userPaused;
        updateToggle();
        start();
      });
      // Pause while the visitor is pointing at or keyboard-focused in the hero.
      hero.addEventListener("mouseenter", function () { hovered = true; stop(); });
      hero.addEventListener("mouseleave", function () { hovered = false; start(); });
      hero.addEventListener("focusin", function () { hovered = true; stop(); });
      hero.addEventListener("focusout", function (event) {
        if (!hero.contains(event.relatedTarget)) { hovered = false; start(); }
      });
      document.addEventListener("visibilitychange", start);
      updateToggle();
      start();
    }
  }

  /* 2. Footer year ---------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* 3. Consultation form ---------------------------------------------- */
  var PHONE = "+1-905-519-3423";
  var EMAIL = "info@verycare.ca";

  var messages = {
    fullName: "Please enter your full name.",
    email: "Please enter a valid email address, for example name@example.com.",
    phone: "Please enter a phone number we can reach you on (at least 10 digits).",
    date: "Please choose today or a future date."
  };

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function validateField(field) {
    var value = field.value.trim();
    var error = "";

    if (field.name === "fullName" && value.length < 2) error = messages.fullName;
    if (field.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) error = messages.email;
    if (field.name === "phone" && value.replace(/\D/g, "").length < 10) error = messages.phone;
    if (field.name === "date" && value && value < todayISO()) error = messages.date;

    var errorEl = document.getElementById(field.id + "-error");
    if (errorEl) errorEl.textContent = error;
    if (error) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    return !error;
  }

  function setStatus(statusEl, tone, html) {
    statusEl.setAttribute("data-tone", tone);
    statusEl.innerHTML = html;
  }

  var contactHtml =
    'Please call <a href="tel:+19055193423">' + PHONE + "</a> or email " +
    '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>.";

  document.querySelectorAll("form[data-consultation-form]").forEach(function (form) {
    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var statusEl = form.querySelector("[data-form-status]");
    var notice = form.querySelector("[data-offline-notice]");
    var submit = form.querySelector('button[type="submit"]');
    var fields = form.querySelectorAll("[data-validate]");

    // Only show the "not connected" notice while no endpoint is configured.
    if (notice) notice.hidden = Boolean(endpoint);

    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = todayISO();

    fields.forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field.value.trim() || field.hasAttribute("aria-invalid")) validateField(field);
      });
      field.addEventListener("input", function () {
        if (field.hasAttribute("aria-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        setStatus(statusEl, "error", "Please correct the highlighted fields and try again.");
        firstInvalid.focus();
        return;
      }

      if (!endpoint) {
        // No submission service is configured: say so plainly. Nothing is
        // sent, stored, or placed in the URL.
        setStatus(
          statusEl,
          "info",
          "<strong>Your request has not been sent.</strong> Online submission is not connected yet, " +
            "so this form cannot send requests or book appointments. " + contactHtml
        );
        statusEl.focus();
        return;
      }

      submit.disabled = true;
      submit.setAttribute("aria-busy", "true");
      setStatus(statusEl, "info", "Sending your request…");

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("HTTP " + response.status);
          form.reset();
          setStatus(
            statusEl,
            "success",
            "<strong>Thank you — your request was sent.</strong> A request is not a confirmed appointment; " +
              "VeryCare will need to confirm the details with you."
          );
        })
        .catch(function () {
          setStatus(
            statusEl,
            "error",
            "<strong>Sorry, your request could not be sent.</strong> " + contactHtml
          );
        })
        .then(function () {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
          statusEl.focus();
        });
    });
  });
})();
