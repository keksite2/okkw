<?php
session_start();

// Verify state parameter to prevent CSRF attacks
if (!isset($_GET['state']) || $_GET['state'] !== $_SESSION['oauth_state']) {
    die('Invalid state parameter');
}

// Google OAuth configuration (should match auth.php)
$client_id = 'YOUR_GOOGLE_CLIENT_ID';
$client_secret = 'YOUR_GOOGLE_CLIENT_SECRET';
$redirect_uri = 'https://esencemedia.info/google/api/callback.php';

if (isset($_GET['code'])) {
    // Exchange authorization code for access token
    $token_url = 'https://oauth2.googleapis.com/token';
    
    $post_data = [
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'redirect_uri' => $redirect_uri,
        'grant_type' => 'authorization_code',
        'code' => $_GET['code']
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $token_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200) {
        $token_data = json_decode($response, true);
        
        if (isset($token_data['access_token'])) {
            // Get user info from Google
            $user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' . $token_data['access_token'];
            
            $user_response = file_get_contents($user_info_url);
            $user_data = json_decode($user_response, true);
            
            // Store user data in session
            $_SESSION['user_data'] = $user_data;
            $_SESSION['access_token'] = $token_data['access_token'];
            
            // Redirect to success page or back to calendar with booking confirmation
            header('Location: /booking-success.html?email=' . urlencode($user_data['email']) . '&name=' . urlencode($user_data['name']));
            exit;
        }
    }
}

// If we get here, something went wrong
header('Location: /?error=auth_failed');
exit;
?>