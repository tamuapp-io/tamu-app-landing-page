(function () {
  'use strict';

  function encodeFormData(form) {
    return new URLSearchParams(new FormData(form)).toString();
  }

  function setFormStatus(form, message, type) {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[name="email"]');

    if (!status) return;

    status.textContent = message;
    status.hidden = false;
    status.className = 'form-status is-' + type;

    if (type === 'success') {
      form.classList.add('is-success');
      if (button) button.disabled = true;
      if (input) input.disabled = true;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const trialForm = document.querySelector('.cta-band .form');
    if (!trialForm) return;

    trialForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const button = trialForm.querySelector('button[type="submit"]');
      const originalLabel = button ? button.textContent : '';

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(trialForm),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Submission failed');
          }

          setFormStatus(
            trialForm,
            'Thanks — we\'ll reach out within 24 hours to set up your booking page.',
            'success'
          );
          trialForm.reset();
        })
        .catch(function () {
          if (button) {
            button.disabled = false;
            button.textContent = originalLabel;
          }

          setFormStatus(
            trialForm,
            'Something went wrong. Please try again or email us at alex@tamucreative.co.',
            'error'
          );
        });
    });
  });
})();
