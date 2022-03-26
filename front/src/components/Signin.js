import React from 'react';
import { Link } from 'react-router-dom';
import '../css/signup.css';

export default function Signin() {
  return (
<section className="sign-in">
  <div className="signin-content">
    <div className="signin-image">
      <figure><img src={require('../img/signin-image.jpg')} alt="sing up image" /></figure>
          <Link to="/signup" className="signup-image-link">Create an account</Link>
    </div>
    <div className="signin-form">
      <h2 className="form-title">Sign in</h2>
      <form method="POST" className="register-form" id="login-form">
        <div className="form-group">
          <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
          <input type="tel" name="Phone" id="phone" placeholder="Mobile number" />
        </div>
        <div className="form-group">
          <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
          <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
         
        </div>
        <div className="form-group form-button">
          <input type="submit" name="signin" id="signin" className="form-submit" defaultValue="Log in" />
        </div>
      </form>
    </div>
  </div>
</section>

)
}
