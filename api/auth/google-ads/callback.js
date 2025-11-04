// api/auth/google-ads/callback.js
export default function handler(req, res) {
  // Hier komt straks de token exchange + opslag in Base44
  res.status(200).send("Callback reached. ✅ We'll store tokens next.");
}
