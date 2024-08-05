export const oktaConfig = {
  clientId: '1115VNYnMQk7qlHyGAI7v0a9TlYQCHUK',
  issuer: 'https://dev-l625782tnvb0qtsd.us.auth0.com/oauth2/default',
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
}