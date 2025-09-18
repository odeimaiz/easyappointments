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
});
