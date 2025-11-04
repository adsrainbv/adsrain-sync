// api/index.js
export default function handler(req, res) {
  res.writeHead(302, {
    Location: '/api/auth/google-ads/start?tenantId=demo&returnTo=%2Fsettings'
  });
  res.end();
}
