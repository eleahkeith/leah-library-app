import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerAPI, loginAPI } from './api-calls';
import Modal from 'react-modal';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
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
      const tokenRes = await loginAPI(email, authCode);
      localStorage.setItem('Authorization', `Bearer ${tokenRes.jwt}`);
      onLogin();
      setIsOpen(false);
    } else {
      toast.error('Something went wrong! Please try again');
    }
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-box">
          <span className="login-title">
            <span className="title-1">biblio</span>
            <span className="title-2">file</span>
          </span>

          <form className="email-form">
            <input
              className="modal-input"
              type="email"
              placeholder="e.g. leah@domain.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="edit-label" htmlFor="email">
              Email
            </label>
            <input
              type="button"
              className="button-on-light"
              id="login-button"
              value="Send Email"
              onClick={() => checkEmail(email)}
            />
          </form>
          <div className="login-text">
            <ol>
              <li className="list-item">Enter your email address</li>
              <li className="list-item">
                Provide the authorization code we send to you
              </li>
              <li className="list-item">Start your own biblio file!</li>
            </ol>
          </div>
        </div>
      </div>
      <Modal className="Modal-Login" isOpen={modalIsOpen}>
        <div className="auth-box">
          {' '}
          <div className="auth-text">
            An email with your authorization code has been sent to {email}
          </div>
          <form className="auth-form">
            <input
              className="modal-input"
              onChange={(e) => setAuth(e.target.value)}
              placeholder="Enter code..."
            ></input>
            <label className="edit-label" htmlFor="authCode">
              Enter your code here
            </label>

            <input
              type="button"
              className="button-on-light"
              id="login-button"
              value="Login"
              onClick={() => checkCode(auth)}
            />
          </form>
          <span className="auth-text">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Didn't receive your code?{' '}
            <span onClick={() => console.log('resent')} className="resend-text">
              Click here to resend!
            </span>{' '}
          </span>
          <span className="auth-text" id="spam-text">
            Note: check your spam folder
          </span>
        </div>
      </Modal>
    </>
  );
};

export default Login;
