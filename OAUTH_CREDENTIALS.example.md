# OAuth Credentials Configuration

## ⚠️ SECURITY WARNING
**NEVER commit real credentials to Git!**

Store actual credentials in environment variables or a `.env` file (which is already in `.gitignore`).

## LinkedIn OAuth

### Development
```
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/linkedin/callback
```

### Production
Set these as environment variables in your deployment platform.

## Google OAuth

### Development
```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Production
Set these as environment variables in your deployment platform.

## Setup Instructions

1. Copy this file to `OAUTH_CREDENTIALS.md` (git-ignored)
2. Replace placeholder values with your actual credentials
3. **NEVER** commit the file with real credentials
4. For production, use environment variables instead

## How to get credentials

### LinkedIn
1. Go to https://www.linkedin.com/developers/apps
2. Create or select your app
3. Copy Client ID and Client Secret

### Google
1. Go to https://console.cloud.google.com/apis/credentials
2. Create or select your OAuth 2.0 Client
3. Copy Client ID and Client Secret
