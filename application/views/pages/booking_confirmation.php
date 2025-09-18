<?php extend('layouts/message_layout'); ?>

<?php section('content'); ?>

<div class="mb-5" style="background: var(--bs-body-bg, #2f3438); padding: 2rem 1rem; border-radius: 8px;">
    <h4 class="mb-4" style="font-size: 16px; font-weight: 400; text-transform: none; letter-spacing: normal;">
        <?= lang('appointment_registered') ?>
    </h4>

    <p>
        <?= lang('appointment_details_was_sent_to_you') ?>
    </p>

    <p class="mb-5 text-muted">
        <small>
            <?= lang('check_spam_folder') ?>
        </small>
    </p>

    <a href="<?= vars('add_to_google_url') ?>" id="add-to-google-calendar" class="btn btn-primary" target="_blank" style="text-transform: none; font-weight: 400;">
        <i class="fas fa-plus me-2"></i>
        <?= lang('add_to_google_calendar') ?>
    </a>
</div>

<?php end_section('content'); ?>

<?php section('scripts'); ?>

<?php component('google_analytics_script', ['google_analytics_code' => vars('google_analytics_code')]); ?>
<?php component('matomo_analytics_script', [
    'matomo_analytics_url' => vars('matomo_analytics_url'),
    'matomo_analytics_site_id' => vars('matomo_analytics_site_id'),
]); ?>

<?php end_section('scripts'); ?>
