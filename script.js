(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const trialForm = document.querySelector('.cta-band .form');
    if (trialForm) {
      trialForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Demo form');
      });
    }
  });
})();
