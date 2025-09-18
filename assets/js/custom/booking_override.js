// Custom booking override for Sim4Life fork
// Ensures: skips service step if only one service, preselects 'Any Provider'

document.addEventListener('DOMContentLoaded', function() {
    var availableServices = window.vars && window.vars('available_services') ? window.vars('available_services') : [];
    if (availableServices.length === 1) {
        // Wait for booking.js to initialize the selects
        setTimeout(function() {
            var $selectService = window.jQuery && window.jQuery('#select-service');
            var $selectProvider = window.jQuery && window.jQuery('#select-provider');
            if ($selectService && $selectProvider) {
                $selectService.val(availableServices[0].id).trigger('change');
                if ($selectProvider.find('option[value="any-provider"]').length > 0) {
                    $selectProvider.val('any-provider').trigger('change');
                }
                // Move to next step if possible
                if (typeof window.goToWizardStep === 'function') {
                    window.goToWizardStep(2);
                }
            }
        }, 300);
    }

    // Prefill customer info from query params
    function getQueryParam(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name) || '';
    }
    function prefillField(selector, param) {
        var value = getQueryParam(param);
        if (value) {
            var el = document.querySelector(selector);
            if (el) el.value = value;
        }
    }
    prefillField('#first-name', 'first_name');
    prefillField('#last-name', 'last_name');
    prefillField('#email', 'email');

    // Hide the booking header (logo/title bar)
    var header = document.querySelector('.booking-header, .header, #header, .navbar, .main-header');
    if (header) header.style.display = 'none';

    // Hide the entire footer options bar
    var footerOptions = document.querySelector('.footer-options, .footer .footer-options, #footer-options');
    if (footerOptions) footerOptions.style.display = 'none';

    // Hide the customer info step and programmatically skip it by triggering the next button on step 3
    (function() {
        // Wait for the DOM and booking wizard to be ready
        function skipCustomerStep() {
            var customerStep = document.querySelector('#wizard-frame-3');
            if (customerStep) customerStep.style.display = 'none';
            var next2 = document.querySelector('#button-next-2');
            if (next2) {
                next2.addEventListener('click', function(e) {
                    // Prevent default navigation to step 3
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Hide all steps
                    var allSteps = document.querySelectorAll('.wizard-frame');
                    allSteps.forEach(function(step) { step.style.display = 'none'; });
                    // Show confirmation step
                    var confirmStep = document.querySelector('#wizard-frame-4');
                    if (confirmStep) confirmStep.style.display = '';
                    // Update step indicator if present
                    var stepIndicator = document.querySelector('.active-step');
                    if (stepIndicator) stepIndicator.classList.remove('active-step');
                    var step4Indicator = document.querySelector('#step-4');
                    if (step4Indicator) step4Indicator.classList.add('active-step');
                }, true);
            } else {
                // Try again if not yet available
                setTimeout(skipCustomerStep, 200);
            }
        }
        skipCustomerStep();
    })();

    // Also skip step 3 if user goes back from step 4
    (function skipBackFromStep4() {
        function attachBackHandler() {
            var back4 = document.querySelector('#button-back-4');
            if (back4) {
                back4.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Hide all steps
                    var allSteps = document.querySelectorAll('.wizard-frame');
                    allSteps.forEach(function(step) { step.style.display = 'none'; });
                    // Hide step 3 explicitly
                    var customerStep = document.querySelector('#wizard-frame-3');
                    if (customerStep) customerStep.style.display = 'none';
                    // Show step 2
                    var step2 = document.querySelector('#wizard-frame-2');
                    if (step2) step2.style.display = '';
                    // Update step indicator
                    var stepIndicator = document.querySelector('.active-step');
                    if (stepIndicator) stepIndicator.classList.remove('active-step');
                    var step2Indicator = document.querySelector('#step-2');
                    if (step2Indicator) step2Indicator.classList.add('active-step');
                }, true);
            } else {
                setTimeout(attachBackHandler, 200);
            }
        }
        attachBackHandler();
    })();

    // osparc: Listen for theme messages from parent and apply CSS variables
    window.addEventListener('message', function(event) {
      // Optionally check event.origin for security
      if (event.data && event.data.type === 'osparc-theme' && event.data.theme) {
        for (const [key, value] of Object.entries(event.data.theme)) {
          document.documentElement.style.setProperty(key, value);
        }
      }
    });
});
