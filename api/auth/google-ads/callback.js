export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  const code = req.query.code;
  const state = req.query.state ? JSON.parse(req.query.state) : {};
  const tenantId = state.tenantId;
  const returnTo = state.returnTo || '/';

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // Vraag access token aan bij Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Token exchange error:', tokenData);
      return res.status(400).json({ error: 'Failed to exchange token', details: tokenData });
    }

    // (Optioneel) log om te zien wat je terugkrijgt
    console.log('Google OAuth tokens:', tokenData);

    // Hier kun je de tokens opslaan in je database, als je dat wilt
    // Voor nu: stuur gebruiker terug naar je app
    const redirectUrl = `${returnTo}?tenantId=${tenantId || ''}&connected=true`;

    return res.redirect(redirectUrl);

  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
