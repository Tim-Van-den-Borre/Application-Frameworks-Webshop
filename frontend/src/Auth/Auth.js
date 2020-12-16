import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: "token id_token", //Access token to make api calls.
      scope: "openid profile email",
    });
  }

  // Redirect browser to login page from auth0.
  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    // Parse the hash from the url.
    this.auth0.parseHash((err, authResult) => {
      // Get all the data from the url.
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Write the data to the session.
        this.setSession(authResult);

        // Redirect the application back to our homepage.
        this.history.push("/");
      } else if (err) {
        // Redirect the application back to the homepage if there is an error.
        this.history.push("/");
        alert(`Error: ${err.error}. Please check the console logs.`);
        console.log(`Error: ${err.message}`);
      }
    });
  };

  setSession = (authResult) => {
    // Set the time that the access token will be available.
    // Will be saved to the session.
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // Set the items in the local storage.
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  // Check if you are still authenticated.
  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };
}
