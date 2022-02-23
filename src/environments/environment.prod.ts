export const environment = {
  production: true,
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  tokenAllowedDomains: [ /api.mymoney.net.br/ ],
  apiUrl: 'https://api.mymoney.net.br',
  oauthCallbackUrl: 'https://app.mymoney.net.br/authorized',
  logoutReturnToUrl:'https://github.com/AlsGomes',
  // tokenAllowedDomains: [/localhost:8080/],
  // tokenDisallowedRoutes: [/\/oauth2\/token/],
  // apiUrl: 'http://localhost:8080',
  // oauthCallbackUrl: 'http://local.mymoney.net.br:4200/authorized',
  // logoutReturnToUrl:'https://github.com/AlsGomes'
};
