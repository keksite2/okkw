<?php
session_start();

// Google OAuth configuration
$client_id = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID
$client_secret = 'YOUR_GOOGLE_CLIENT_SECRET'; // Replace with your actual Google Client Secret
$redirect_uri = 'https://esencemedia.info/google/api/callback.php';

// Check if this is the initial auth request
    // Generate state parameter for security
        'access_type' => 'offline'
}
?>