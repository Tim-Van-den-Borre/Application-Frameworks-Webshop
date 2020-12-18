import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
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

  // Handle the authentication.
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

  // Set items in storage to check later if the user is logged in or not (local login).
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

  // Log the user out.
  logout = () => {
    // Remove the storage items (local logout).
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;

    // Sign out at auth0 server and redirect to the homepage.
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000",
    });
  };

  // Get the access token from the local storage and throw an error if the token is not found.
  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  // Get the user profile.
  getProfile = (callback) => {
    // If the user profile exists then it will be returned.
    if (this.userProfile) return callback(this.userProfile);

    // If there is no profile the 'userInfo' endpoint at auth0 will be called and pass the access token.
    this.auth0.client.userInfo(this.getAccessToken(), (error, profile) => {
      // If auth0 returns a profile it will be displayed.
      if (profile) this.userProfile = profile;
      callback(profile, error);
    });
  };
}
