import React from 'react';
import { useState } from 'react';
import { registerAPI } from './api-calls';

const Login = () => {
  const [email, setEmail] = useState<string>();

  const handleSendEmail = (addr: string | undefined) => {
    registerAPI(addr);
    console.log(email);
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <form className="email-form">
          <label className="login-label" htmlFor="email">
            Enter Your Email
          </label>
          <input
            className="login-input"
            type="email"
            placeholder="e.g. leah@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="button"
            className="button-on-light"
            value="Send Email"
            onClick={() => handleSendEmail(email)}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
