import auth0 from 'auth0-js';

const tokens = {
  idToken: false;
  accessToken = false;
}

export const isBrowser = typeof window !== 'undefined';

// Only instantiate Auth0 if we’re in the browser.
const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email'
    })
  : {};

  export const login = () => {
    auth.authorize()
  }


  export const setSession = ( err, authResult) => {
    if (err){
      throw new Error(err);
    }  

    if (authResult && authResult.accessToken && authResult.idToken){
      tokens.idToken = authResult.idToken;
      tokens.accessToken = authResult.accessToken;
  }
 
  } //setsession

  export const checkSession= () => {
    auth.checkSession({}, setSession)

  }


  export const handlAuthentication = () => {
    auth.parseHash(setSession); 
  }

  
  
  
  //https://www.gatsbyjs.org/blog/2019-03-21-add-auth0-to-gatsby-livestream/
  // 35:27
  