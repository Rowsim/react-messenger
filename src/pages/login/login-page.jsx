import React from "react";
import GoogleLogin from "react-google-login";
import "./login-page.scss";

const clientId =
  "317143211460-nt9t4cirb5qb2uhmrr3rc34uqu18cpth.apps.googleusercontent.com";

class LoginPage extends React.Component {
  responseGoogleFail = response => {
    console.log("Google sign in failed: ", response);
  };

  responseGoogleSuccess = res => {
    const googleProfile = res.profileObj;
    console.log("Google sign in success: ", googleProfile);
    this.props.history.push({
      pathname: "/chat",
      state: { googleProfile: googleProfile }
    });
  };

  loginAsTestUser = () => {
    const testGoogleProfile = {
      googleId: "test-0"
    };

    this.props.history.push({
      pathname: "/chat",
      state: { googleProfile: testGoogleProfile }
    });
  }

  componentDidMount() {
    this.effect = window.VANTA.BIRDS({
      el: "#vanta-bg",
      backgroundColor: 0x202020,
      color1: 0xff8700,
      color2: 0x6900ff,
      wingSpan: 35.0,
      speedLimit: 6.0,
      separation: 60.0,
      alignment: 30.0,
      quantity: 3.0
    });
  }
  componentWillUnmount() {
    if (this.effect) this.effect.destroy();
  }

  render() {
    return (
      <div>
        <div id="vanta-bg" />
        <div className="login-page-title-links">
          <h1 className="login-page-title">
            react messenger <img src="/favicon.png" />
          </h1>
          <h3>using:</h3>
          <a
            href="https://www.npmjs.com/package/create-react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ react
          </a>
          <a
            href="https://www.npmjs.com/package/node-sass"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ node-sass
          </a>
          <a
            href="https://www.npmjs.com/package/@pusher/chatkit-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ pusher/chatkit-client
          </a>
          <a
            href="https://www.npmjs.com/package/react-google-login"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ react-google-login
          </a>
          <a
            href="https://www.npmjs.com/package/react-loader-spinner"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ react-loader-spinner
          </a>
        </div>
        <div className="login-page">
          <div className="login-page__google">
            <p>Sign in with Google.</p>
            <GoogleLogin
              clientId={clientId}
              buttonText=""
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
            <button className="rc-button" onClick={this.loginAsTestUser}>
              Sign in as a test user
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
