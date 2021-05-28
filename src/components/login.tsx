import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerAPI, loginAPI } from './api-calls';
import Modal from 'react-modal';

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [auth, setAuth] = useState<string>();

  const checkEmail = (email: string | undefined) => {
    if (email) {
      handleSendEmail(email);
    } else {
      toast.error('Please enter an email address');
    }
  };

  const handleSendEmail = (addr: string) => {
    registerAPI(addr);
    setIsOpen(true);
  };

  const checkCode = (authCode: string | undefined) => {
    if (authCode) {
      handleLogin(authCode);
    } else {
      toast.error('Please enter a code');
    }
  };

  const handleLogin = async (authCode: string) => {
    if (email) {
      loginAPI(email, authCode);
    } else {
      toast.error('Something went wrong! Please try again');
    }
  };

  return (
    <>
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
              onClick={() => checkEmail(email)}
            />
          </form>
        </div>
      </div>
      <Modal className="Modal" isOpen={modalIsOpen}>
        <div>
          An email with your authorization code has been sent to {email}
        </div>
        <form>
          <label htmlFor="authCode">Enter your code here</label>
          <input
            onChange={(e) => setAuth(e.target.value)}
            placeholder="Enter code..."
          ></input>
          <input
            type="button"
            className="button-on-light"
            value="Login"
            onClick={() => checkCode(auth)}
          />
        </form>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <span>Didn't receive your code? Click here to resend! </span>
        <span>Note: check your spam folder</span>
      </Modal>
    </>
  );
};

export default Login;
