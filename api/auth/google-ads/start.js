export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({
      error: "Missing environment variables (GOOGLE_CLIENT_ID or REDIRECT_URI)"
    });
  }

  // Maak de Google OAuth URL aan
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'https://www.googleapis.com/auth/adwords openid email profile');
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');

  // Stuur tenantId en returnTo mee als JSON in de state
  const state = JSON.stringify({
    tenantId: req.query.tenantId || null,
    returnTo: req.query.returnTo || '/'
  });
  url.searchParams.set('state', state);

  // Redirect naar Google
  return res.redirect(url.toString());
}


