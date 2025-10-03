<?php
session_start();

// Check if Google OAuth credentials are configured
if (!defined('GOOGLE_CLIENT_ID') || !defined('GOOGLE_CLIENT_SECRET')) {
    // For now, redirect back to main site if credentials aren't configured
    header('Location: /?error=oauth_not_configured');
    exit;
}

// Google OAuth configuration
$client_id = GOOGLE_CLIENT_ID;
$client_secret = GOOGLE_CLIENT_SECRET;
$redirect_uri = 'https://esencemedia.info/google/api/callback.php';

// Generate state parameter for security
$state = bin2hex(random_bytes(32));
$_SESSION['oauth_state'] = $state;

// Build Google OAuth URL
$auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query([
    'client_id' => $client_id,
    'redirect_uri' => $redirect_uri,
    'response_type' => 'code',
    'scope' => 'openid email profile',
    'state' => $state,
    'access_type' => 'offline'
]);

// Redirect to Google OAuth
header('Location: ' . $auth_url);
exit;
?>