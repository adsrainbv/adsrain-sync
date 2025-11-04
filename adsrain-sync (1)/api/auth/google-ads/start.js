// api/auth/google-ads/start.js
export default function handler(req, res) {
  const { tenantId = "demo", returnTo = "/settings" } = req.query;

  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const redirect_uri = `${proto}://${host}/api/auth/google-ads/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
    redirect_uri,
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
