import React, { Component } from "react";

class Profile extends Component {
  // Save profile data to the state.
  state = {
    profile: null,
    error: "",
  };

  // Load user profile data.
  componentDidMount = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    );
  };

  render() {
    const { profile } = this.state;
    if (!profile) return null;
    return (
      <>
        <div class="media">
          <img
            style={{ maxHeight: 60, minHeight: 60 }}
            src={profile.picture}
            class="mr-3"
            alt="profile pic"
          />
          <div class="media-body">
            <h5 class="mt-0">Welcome {profile.nickname}</h5>
            <p>Email address: {profile.email}</p>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
