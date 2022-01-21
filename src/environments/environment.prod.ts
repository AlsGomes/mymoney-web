export const environment = {
  production: true,
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  tokenAllowedDomains: [ /api.mymoney.net.br/ ],
  apiUrl: 'https://api.mymoney.net.br',
  oauthCallbackUrl: 'http://app.mymoney.net.br/authorized',
  logoutReturnToUrl:'https://github.com/AlsGomes',
  // apiUrl: 'http://localhost:8080',
  // tokenAllowedDomains: [ /localhost:8080/ ],
};
