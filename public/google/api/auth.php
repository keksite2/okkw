<?php
session_start();

// Google OAuth configuration
$client_id = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID
$client_secret = 'YOUR_GOOGLE_CLIENT_SECRET'; // Replace with your actual Google Client Secret
$redirect_uri = 'https://esencemedia.info/google/api/callback.php';

// Check if this is the initial auth request
if (!isset($_GET['code'])) {
    // Generate state parameter for security
    $_SESSION['oauth_state'] = bin2hex(random_bytes(16));
    
    // Build Google OAuth URL
    $auth_url = 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query([
        'client_id' => $client_id,
        'redirect_uri' => $redirect_uri,
        'scope' => 'email profile',
        'response_type' => 'code',
        'state' => $_SESSION['oauth_state'],
        'access_type' => 'offline'
    ]);
    
    // Redirect to Google
    header('Location: ' . $auth_url);
    exit;
}
?>