export default function handler(req, res) {
  const { tenantId = "demo", returnTo = "/settings" } = req.query;
  const origin = `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
    redirect_uri: `${origin}/api/auth/google-ads/callback`,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/adwords openid email profile",
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "select_account",
    state: JSON.stringify({ tenantId, returnTo })
  });

  res.writeHead(302, {
    Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  });
  res.end();
}
